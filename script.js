// ================= GLOBAL STATE =================
let currentTheme = localStorage.getItem('agrosmartai-ui-theme') || 'light';
let currentVideoIndex = 0;
let allPlants = [];
let filteredPlants = [];
let currentPlantModal = null;
let chartInstance = null;
let visiblePlantsCount = 8;
let currentViewMode = 'grid';
const videoFiles = [
    'images/nen1.mp4',
    'images/nen2.mp4',
    'images/nen3.mp4',
    'images/nen4.mp4',
    'images/nen5.mp4'
];

// ================= UTILITY FUNCTIONS =================
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

function showToast(title, description, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<div class="toast-title">${title}</div><div class="toast-description">${description}</div>`;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
}

function formatNumber(num) {
    return num >= 1000 ? Math.floor(num / 1000) + 'K+' : num + '+';
}

// ================= API FUNCTIONS =================
async function fetchFromAPI(endpoint, options = {}) {
    try {
        const response = await fetch(`/api${endpoint}`, {
            headers: { 'Content-Type': 'application/json', ...options.headers },
            ...options
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

async function uploadImageForDiagnosis(file) {
    const formData = new FormData();
    formData.append('image', file);
    try {
        const response = await fetch('/api/diagnose', { method: 'POST', body: formData });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Image upload failed:', error);
        throw error;
    }
}

// ================= THEME =================
function initializeTheme() {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (currentTheme === 'system') currentTheme = systemPrefersDark ? 'dark' : 'light';
    document.body.classList.toggle('dark', currentTheme === 'dark');
    updateThemeIcon();
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('agrosmartai-ui-theme', currentTheme);
    document.body.classList.toggle('dark', currentTheme === 'dark');
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.setAttribute('data-lucide', currentTheme === 'dark' ? 'sun' : 'moon');
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
}

// ================= VIDEO BACKGROUND =================
function initializeVideoBackground() {
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prev-video-btn');
    const nextBtn = document.getElementById('next-video-btn');
    
    function updateVideoIndicators() {
        indicators.forEach((ind, idx) => ind.classList.toggle('active', idx === currentVideoIndex));
        const videoEl = document.getElementById('bg-video');
        if (videoEl) videoEl.src = videoFiles[currentVideoIndex];
    }

    function nextVideo() {
        currentVideoIndex = (currentVideoIndex + 1) % videoFiles.length;
        updateVideoIndicators();
    }

    function prevVideo() {
        currentVideoIndex = (currentVideoIndex - 1 + videoFiles.length) % videoFiles.length;
        updateVideoIndicators();
    }
    
    if (prevBtn) prevBtn.addEventListener('click', prevVideo);
    if (nextBtn) nextBtn.addEventListener('click', nextVideo);
    
    setInterval(nextVideo, 10000);
    updateVideoIndicators();
}

// ================= NAVIGATION =================
function initializeNavigation() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const themeToggle = document.getElementById('theme-toggle');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => mobileMenu.classList.toggle('show'));
    }
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            scrollToSection(link.getAttribute('href').substring(1));
            if (mobileMenu) mobileMenu.classList.remove('show');
        });
    });

    window.scrollToSection = scrollToSection;
}

// ================= SEARCH =================
function initializeSearch() {
    const searchInputs = [
        document.getElementById('search-input'),
        document.getElementById('mobile-search-input'),
        document.getElementById('library-search')
    ];
    const debouncedSearch = debounce(query => filterPlants(query), 300);
    
    searchInputs.forEach(input => {
        if (!input) return;
        input.addEventListener('input', e => {
            const query = e.target.value;
            searchInputs.forEach(other => { if (other && other !== input) other.value = query; });
            debouncedSearch(query);
        });
    });
}

function filterPlants(searchQuery = '', category = 'all') {
    const query = searchQuery.toLowerCase();
    filteredPlants = allPlants.filter(p => {
        const matchesSearch = !query ||
            p.name.toLowerCase().includes(query) ||
            p.scientificName.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            (p.commonDiseases && p.commonDiseases.some(d => d.toLowerCase().includes(query)));
        const matchesCategory = category === 'all' || p.category.toLowerCase() === category;
        return matchesSearch && matchesCategory;
    });
    visiblePlantsCount = 8;
    renderPlants();
}

// ================= PLANTS =================
async function loadPlants() {
    const plantsGrid = document.getElementById('plants-grid');
    if (plantsGrid) plantsGrid.innerHTML = `<div class="loading-grid">${Array(8).fill('<div class="plant-card-skeleton"></div>').join('')}</div>`;
    try {
        allPlants = await fetchFromAPI('/plants');
        filteredPlants = [...allPlants];
        populateCategoryFilter();
        renderPlants();
    } catch (e) {
        console.error(e);
        showToast('Error', 'Failed to load plant library', 'error');
        if (plantsGrid) plantsGrid.innerHTML = `<div class="no-results"><i data-lucide="alert-circle"></i><p>Failed to load plants. Please try again.</p></div>`;
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
}

function populateCategoryFilter() {
    const catFilter = document.getElementById('category-filter');
    if (!catFilter) return;
    const categories = [...new Set(allPlants.map(p => p.category))];
    catFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat.toLowerCase();
        opt.textContent = cat;
        catFilter.appendChild(opt);
    });
}

function renderPlants() {
    const grid = document.getElementById('plants-grid');
    const loadMore = document.getElementById('load-more-container');
    const noRes = document.getElementById('no-plants-message');
    if (!grid) return;
    grid.innerHTML = '';
    grid.className = currentViewMode === 'grid' ? 'plants-grid' : 'plants-grid list-view';
    if (!filteredPlants.length) {
        if (noRes) noRes.classList.remove('hidden');
        if (loadMore) loadMore.classList.add('hidden');
        return;
    }
    if (noRes) noRes.classList.add('hidden');
    filteredPlants.slice(0, visiblePlantsCount).forEach(p => grid.appendChild(createPlantCard(p)));
    if (loadMore) visiblePlantsCount < filteredPlants.length ? loadMore.classList.remove('hidden') : loadMore.classList.add('hidden');
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function createPlantCard(p) {
    const card = document.createElement('div');
    card.className = 'plant-card';
    card.setAttribute('data-testid', `card-plant-${p.id}`);
    const categoryClass = getCategoryClass(p.category);
    card.innerHTML = `
        <img src="${p.imageUrl}" alt="${p.name}" loading="lazy">
        <div class="plant-card-content">
            <div class="plant-card-header">
                <h3 class="plant-card-title" data-testid="text-plant-name-${p.id}">${p.name}</h3>
                <span class="category-badge ${categoryClass}">${p.category}</span>
            </div>
            <p class="plant-scientific">${p.scientificName}</p>
            <p class="plant-description">${p.description}</p>
            <div class="plant-stats">
                <span class="plant-stat"><i data-lucide="thermometer"></i><span>${p.temperature}°C</span></span>
                <span class="plant-stat"><i data-lucide="droplets"></i><span>${p.humidity}%</span></span>
                <span class="plant-stat"><i data-lucide="sprout"></i><span>${p.growthPeriod}</span></span>
            </div>
        </div>`;
    card.addEventListener('click', () => openPlantModal(p));
    return card;
}

function getCategoryClass(cat) {
    switch(cat.toLowerCase()) {
        case 'grain': return 'grain';
        case 'vegetable': return 'vegetable';
        case 'fruit': return 'fruit';
        case 'legume': return 'legume';
        case 'industrial': return 'industrial';
        default: return '';
    }
}

// ================= MODAL =================
function openPlantModal(p) {
    currentPlantModal = p;
    const modal = document.getElementById('plant-modal');
    if (!modal) return;
    populateModalContent(p);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    createPlantChart(p);
}

function closeModal() {
    const modal = document.getElementById('plant-modal');
    if (modal) modal.classList.remove('show');
    document.body.style.overflow = '';
    if (chartInstance) { chartInstance.destroy(); chartInstance = null; }
    currentPlantModal = null;
}

function populateModalContent(p) {
    const setText = (id, text) => { const el = document.getElementById(id); if(el) el.textContent = text; };
    setText('modal-plant-name', p.name);
    setText('modal-plant-scientific', p.scientificName);
    const imgEl = document.getElementById('modal-plant-image'); if(imgEl){ imgEl.src = p.imageUrl; imgEl.alt = p.name; }
    setText('modal-scientific-name', p.scientificName);
    setText('modal-family', p.family);
    setText('modal-origin', p.origin);
    setText('modal-growth-period', p.growthPeriod);
    const modalCategory = document.getElementById('modal-category');
    if(modalCategory){ modalCategory.textContent = p.category; modalCategory.className = `category-badge ${getCategoryClass(p.category)}`; }
    setText('modal-nutrition', p.nutrition);
    setText('modal-care', p.care);
    const modalDiseases = document.getElementById('modal-diseases');
    if(modalDiseases){
        modalDiseases.innerHTML = '';
        p.commonDiseases?.forEach((d,i)=>{
            const div = document.createElement('div');
            div.className='disease-item';
            div.innerHTML=`<h4 data-testid="text-disease-${i}">${d}</h4>`;
            modalDiseases.appendChild(div);
        });
    }
}

function createPlantChart(p) {
    const canvas = document.getElementById('modal-chart'); if(!canvas) return;
    const ctx = canvas.getContext('2d');
    if(chartInstance) chartInstance.destroy();
    chartInstance = new Chart(ctx,{
        type:'bar',
        data:{ labels:['Temperature (°C)','Humidity (%)','pH','Light (hrs)'], datasets:[{ label:'Growth Requirements', data:[p.temperature,p.humidity,p.pH,p.light], backgroundColor:['hsl(122,39%,49%)','hsl(45,93%,47%)','hsl(0,84.2%,60.2%)','hsl(240,4.8%,95.9%)'], borderRadius:4 }]},
        options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{ y:{beginAtZero:true, grid:{color:getComputedStyle(document.documentElement).getPropertyValue('--border').trim()}, ticks:{color:getComputedStyle(document.documentElement).getPropertyValue('--muted-foreground').trim()}}, x:{grid:{display:false}, ticks:{color:getComputedStyle(document.documentElement).getPropertyValue('--muted-foreground').trim()}} } }
    });
}

// ================= PLANT LIBRARY CONTROLS =================
function initializePlantLibraryControls() {
    const catFilter = document.getElementById('category-filter');
    const gridBtn = document.getElementById('grid-view-btn');
    const listBtn = document.getElementById('list-view-btn');
    const loadMoreBtn = document.getElementById('load-more-btn');
    if(catFilter) catFilter.addEventListener('change', e=>{
        const q = document.getElementById('library-search')?.value || '';
        filterPlants(q, e.target.value);
    });
    if(gridBtn && listBtn){
        gridBtn.addEventListener('click', ()=>{
            currentViewMode='grid'; gridBtn.classList.add('active'); listBtn.classList.remove('active'); renderPlants();
        });
        listBtn.addEventListener('click', ()=>{
            currentViewMode='list'; listBtn.classList.add('active'); gridBtn.classList.remove('active'); renderPlants();
        });
    }
    if(loadMoreBtn) loadMoreBtn.addEventListener('click', ()=>{
        visiblePlantsCount+=8; renderPlants();
    });
}

// ================= AI DIAGNOSIS =================
function initializeAIDiagnosis() {
    const uploadZone = document.getElementById('upload-zone');
    const fileInput = document.getElementById('file-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const resetBtn = document.getElementById('reset-btn');
    const fileControls = document.getElementById('file-controls');
    let selectedFile = null;

    const handleFileSelect = file => {
        if(file.size>10*1024*1024){ showToast('File Too Large','Please select an image smaller than 10MB','error'); return; }
        selectedFile=file;
        const uploadText = uploadZone?.querySelector('.upload-text');
        if(uploadText) uploadText.textContent=file.name;
        if(fileControls) fileControls.classList.remove('hidden');
        hideResults();
    };

    const analyzeImage = async file => {
        showLoading();
        try{
            const result = await uploadImageForDiagnosis(file);
            showResults(result);
            showToast('Analysis Complete', `Detected: ${result.disease} with ${result.confidence}% confidence`);
        } catch(e){ console.error(e); showToast('Analysis Failed', e.message,'error'); hideLoading(); }
    };

    const resetDiagnosis = () => {
        selectedFile=null; if(fileInput) fileInput.value='';
        const uploadText = uploadZone?.querySelector('.upload-text'); if(uploadText) uploadText.textContent='Click to upload or drag and drop';
        if(fileControls) fileControls.classList.add('hidden'); hideResults();
    };

    const showLoading = () => { document.getElementById('results-placeholder')?.classList.add('hidden'); document.getElementById('results-loading')?.classList.remove('hidden'); document.getElementById('results-content')?.classList.add('hidden'); };
    const hideLoading = () => { document.getElementById('results-loading')?.classList.add('hidden'); document.getElementById('results-placeholder')?.classList.remove('hidden'); };
    const hideResults = () => { document.getElementById('results-placeholder')?.classList.remove('hidden'); document.getElementById('results-content')?.classList.add('hidden'); };

    const showResults = result => {
        document.getElementById('results-placeholder')?.classList.add('hidden');
        document.getElementById('results-loading')?.classList.add('hidden');
        document.getElementById('results-content')?.classList.remove('hidden');
        if(document.getElementById('disease-name')) document.getElementById('disease-name').textContent=result.disease;
        if(document.getElementById('confidence-progress')) document.getElementById('confidence-progress').style.width=`${result.confidence}%`;
        if(document.getElementById('confidence-value')) document.getElementById('confidence-value').textContent=`${result.confidence}%`;
        const descCard=document.getElementById('description-card');
        if(result.description && descCard){ document.getElementById('disease-description').textContent=result.description; descCard.classList.remove('hidden'); }
        else if(descCard) descCard.classList.add('hidden');
        const recList=document.getElementById('recommendations-list');
        if(recList && result.recommendations){ recList.innerHTML=''; result.recommendations.forEach(r=>{
            const li=document.createElement('li'); li.textContent=r; recList.appendChild(li); });
        }
    };

    if(uploadZone){
        uploadZone.addEventListener('click', ()=>fileInput?.click());
        uploadZone.addEventListener('dragover', e=>{ e.preventDefault(); uploadZone.classList.add('dragover'); });
        uploadZone.addEventListener('dragleave', e=>{ e.preventDefault(); uploadZone.classList.remove('dragover'); });
        uploadZone.addEventListener('drop', e=>{ e.preventDefault(); uploadZone.classList.remove('dragover'); if(e.dataTransfer.files[0]) handleFileSelect(e.dataTransfer.files[0]); });
    }
    if(fileInput) fileInput.addEventListener('change', e=>{ if(e.target.files[0]) handleFileSelect(e.target.files[0]); });
    if(analyzeBtn) analyzeBtn.addEventListener('click', ()=>{ if(selectedFile) analyzeImage(selectedFile); });
    if(resetBtn) resetBtn.addEventListener('click', resetDiagnosis);
}

// ================= INITIALIZE =================
document.addEventListener('DOMContentLoaded', ()=>{
    initializeTheme();
    initializeVideoBackground();
    initializeNavigation();
    initializeSearch();
    loadPlants();
    initializePlantLibraryControls();
    initializeAIDiagnosis();

    document.querySelectorAll('.modal-close, #plant-modal').forEach(el=>{
        el.addEventListener('click', e=>{ if(e.target.id==='plant-modal' || e.target.classList.contains('modal-close')) closeModal(); });
    });
    document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });
});
