// ================= GLOBAL STATE ================= 
let currentTheme = localStorage.getItem('agrosmartai-ui-theme') || 'light';
let currentVideoIndex = 0;
let allPlants = [];
let filteredPlants = [];
let currentPlantModal = null;
let chartInstance = null;
let visiblePlantsCount = 8;
let currentViewMode = 'grid';

// ================= UTILITY =================
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
function showToast(title, description, type='success') {
    const toastContainer = document.getElementById('toast-container');
    if(!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<div class="toast-title">${title}</div><div class="toast-description">${description}</div>`;
    toastContainer.appendChild(toast);
    setTimeout(()=>toast.remove(),5000);
}
function scrollToSection(sectionId){
    const el = document.getElementById(sectionId);
    if(el) el.scrollIntoView({behavior:'smooth'});
}
function formatNumber(num){
    return num>=1000? Math.floor(num/1000)+'K+': num+'+';
}

// ================= THEME =================
function initializeTheme(){
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if(currentTheme==='system') currentTheme = systemDark?'dark':'light';
    document.body.classList.toggle('dark', currentTheme==='dark');
    updateThemeIcon();
}
function toggleTheme(){
    currentTheme = currentTheme==='dark'?'light':'dark';
    localStorage.setItem('agrosmartai-ui-theme', currentTheme);
    document.body.classList.toggle('dark', currentTheme==='dark');
    updateThemeIcon();
}
function updateThemeIcon(){
    const themeIcon = document.querySelector('.theme-icon');
    if(themeIcon){
        themeIcon.setAttribute('data-lucide', currentTheme==='dark'?'sun':'moon');
        if(typeof lucide!=='undefined') lucide.createIcons();
    }
}

// ================= VIDEO BACKGROUND =================
function initializeVideoBackground(){
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prev-video-btn');
    const nextBtn = document.getElementById('next-video-btn');
    function updateIndicators(){
        indicators.forEach((ind,i)=>ind.classList.toggle('active', i===currentVideoIndex));
    }
    function nextVideo(){currentVideoIndex=(currentVideoIndex+1)%5; updateIndicators();}
    function prevVideo(){currentVideoIndex=(currentVideoIndex-1+5)%5; updateIndicators();}
    if(prevBtn) prevBtn.addEventListener('click',prevVideo);
    if(nextBtn) nextBtn.addEventListener('click',nextVideo);
    setInterval(nextVideo,10000);
    updateIndicators();
}

// ================= NAVIGATION =================
function initializeNavigation(){
    const mobileToggle=document.getElementById('mobile-menu-toggle');
    const mobileMenu=document.getElementById('mobile-menu');
    const themeToggle=document.getElementById('theme-toggle');
    if(mobileToggle && mobileMenu) mobileToggle.addEventListener('click',()=>mobileMenu.classList.toggle('show'));
    if(themeToggle) themeToggle.addEventListener('click',toggleTheme);
    document.querySelectorAll('a[href^="#"]').forEach(link=>{
        link.addEventListener('click',(e)=>{
            e.preventDefault();
            scrollToSection(link.getAttribute('href').substring(1));
            if(mobileMenu) mobileMenu.classList.remove('show');
        });
    });
}

// ================= SEARCH =================
function initializeSearch(){
    const searchInputs = [
        document.getElementById('search-input'),
        document.getElementById('mobile-search-input'),
        document.getElementById('library-search')
    ];
    const debounced = debounce(query=>{
        filterPlants(query);
    },300);
    searchInputs.forEach(input=>{
        if(input){
            input.addEventListener('input',(e)=>{
                searchInputs.forEach(other=>{
                    if(other && other!==input) other.value=e.target.value;
                });
                debounced(e.target.value);
            });
        }
    });
}

// ================= STATS =================
function updateStats(){
    const cropsStat = document.getElementById('stat-crops');
    const diseasesStat = document.getElementById('stat-diseases');
    const accuracyStat = document.getElementById('stat-accuracy');
    const farmersStat = document.getElementById('stat-farmers');
    if(cropsStat) cropsStat.textContent=allPlants.length+'+';
    if(diseasesStat) diseasesStat.textContent=allPlants.reduce((acc,p)=>acc+p.commonDiseases.length,0)+'+';
    if(accuracyStat) accuracyStat.textContent='90%'; // tạm mock
    if(farmersStat) farmersStat.textContent=formatNumber(12000); // tạm mock
}

// ================= PLANT LIBRARY =================
async function loadPlantsFromWikipedia(){
    const plantNames = ["Tomato","Rice","Lettuce","Carrot","Apple","Banana","Potato","Soybean"];
    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&titles=${plantNames.join('|')}&prop=pageimages|extracts&piprop=original&exintro=1`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        allPlants = Object.values(data.query.pages).map(page=>({
            id:page.pageid,
            name:page.title,
            scientificName:'', // Wikipedia extract có thể parse thêm nếu muốn
            category:'Vegetable', // tạm gán
            imageUrl: page.original? page.original.source : 'images/placeholder.png',
            description: page.extract||'Không có mô tả',
            temperature: Math.floor(Math.random()*10+20),
            humidity: Math.floor(Math.random()*50+40),
            pH:6+Math.random(),
            light:6+Math.floor(Math.random()*4),
            growthPeriod:'60-90 ngày',
            family:'',
            origin:'',
            nutrition:'',
            care:'',
            commonDiseases:['Bệnh giả mốc','Bệnh thối rễ']
        }));
        filteredPlants=[...allPlants];
        renderPlants();
        updateStats();
        populateCategoryFilter();
    } catch(err){
        console.error('Không lấy được dữ liệu cây trồng',err);
        showToast('Error','Không lấy được dữ liệu cây trồng','error');
    }
}

function filterPlants(query='', category='all'){
    const q=query.toLowerCase();
    filteredPlants = allPlants.filter(plant=>{
        const matchesSearch = !q || plant.name.toLowerCase().includes(q)||plant.scientificName.toLowerCase().includes(q)||plant.description.toLowerCase().includes(q);
        const matchesCategory = category==='all'||plant.category.toLowerCase()===category;
        return matchesSearch && matchesCategory;
    });
    visiblePlantsCount=8;
    renderPlants();
}

function renderPlants(){
    const grid=document.getElementById('plants-grid');
    const loadMore=document.getElementById('load-more-container');
    const noResults=document.getElementById('no-plants-message');
    if(!grid) return;
    grid.innerHTML='';
    grid.className=currentViewMode==='grid'?'plants-grid':'plants-grid list-view';
    if(filteredPlants.length===0){
        if(noResults) noResults.classList.remove('hidden');
        if(loadMore) loadMore.classList.add('hidden');
        return;
    }
    if(noResults) noResults.classList.add('hidden');
    const plantsToShow = filteredPlants.slice(0, visiblePlantsCount);
    plantsToShow.forEach(p=>grid.appendChild(createPlantCard(p)));
    if(loadMore){
        if(visiblePlantsCount<filteredPlants.length) loadMore.classList.remove('hidden');
        else loadMore.classList.add('hidden');
    }
    if(typeof lucide!=='undefined') lucide.createIcons();
}

function createPlantCard(plant){
    const card=document.createElement('div');
    card.className='plant-card';
    card.setAttribute('data-testid',`card-plant-${plant.id}`);
    const categoryClass = getCategoryClass(plant.category);
    card.innerHTML=`
        <img src="${plant.imageUrl}" alt="${plant.name}" loading="lazy">
        <div class="plant-card-content">
            <div class="plant-card-header">
                <h3 class="plant-card-title">${plant.name}</h3>
                <span class="category-badge ${categoryClass}">${plant.category}</span>
            </div>
            <p class="plant-scientific">${plant.scientificName}</p>
            <p class="plant-description">${plant.description}</p>
        </div>
    `;
    card.addEventListener('click',()=>openPlantModal(plant));
    return card;
}
function getCategoryClass(category){
    switch(category.toLowerCase()){
        case 'grain': return 'grain';
        case 'vegetable': return 'vegetable';
        case 'fruit': return 'fruit';
        case 'legume': return 'legume';
        case 'industrial': return 'industrial';
        default: return '';
    }
}
function populateCategoryFilter(){
    const catFilter = document.getElementById('category-filter');
    if(!catFilter) return;
    const categories = [...new Set(allPlants.map(p=>p.category))];
    catFilter.innerHTML='<option value="all">All Categories</option>';
    categories.forEach(c=>{
        const opt=document.createElement('option');
        opt.value=c.toLowerCase();
        opt.textContent=c;
        catFilter.appendChild(opt);
    });
}

// ================= MODAL =================
function openPlantModal(plant){
    currentPlantModal=plant;
    const modal=document.getElementById('plant-modal');
    if(!modal) return;
    const nameEl = document.getElementById('modal-plant-name');
    const imgEl = document.getElementById('modal-plant-image');
    const descEl = document.getElementById('modal-scientific-name');
    if(nameEl) nameEl.textContent=plant.name;
    if(imgEl){ imgEl.src=plant.imageUrl; imgEl.alt=plant.name; }
    if(descEl) descEl.textContent=plant.scientificName;
    modal.classList.add('show');
    document.body.style.overflow='hidden';
}
function closeModal(){
    const modal=document.getElementById('plant-modal');
    if(modal){
        modal.classList.remove('show');
        document.body.style.overflow='';
    }
    currentPlantModal=null;
}

// ================= INITIALIZATION =================
document.addEventListener('DOMContentLoaded',()=>{
    initializeTheme();
    initializeVideoBackground();
    initializeNavigation();
    initializeSearch();
    loadPlantsFromWikipedia();
});
window.scrollToSection=scrollToSection;
window.closeModal=closeModal;
window.addEventListener('resize',debounce(()=>{if(chartInstance) chartInstance.resize();},250));
