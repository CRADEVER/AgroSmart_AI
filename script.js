const PIXABAY_KEY = "35241709-xxxxxxxxxxxxxxxxxxxx"; // Thay bằng key của bạn từ Pixabay
const plantsContainer = document.getElementById("plants-container");
const loadMoreBtn = document.getElementById("load-more-btn");
const searchInput = document.getElementById("search-input");
const categorySelect = document.getElementById("category-select");
const listViewBtn = document.getElementById("list-view-btn");
const gridViewBtn = document.getElementById("grid-view-btn");

let plantsData = [];
let displayedCount = 0;
const ITEMS_PER_LOAD = 6;
const categories = ["grain", "vegetable", "fruit", "legume", "industrial"];

// Lấy hình từ Pixabay
async function fetchPlantImage(query) {
  try {
    const url = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&per_page=3`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.hits && data.hits.length > 0) return data.hits[0].webformatURL;
    return "https://via.placeholder.com/400x300?text=No+Image";
  } catch (err) {
    console.error(err);
    return "https://via.placeholder.com/400x300?text=No+Image";
  }
}

// Lấy dữ liệu Wikipedia + hình Pixabay
async function fetchPlantData(query) {
  try {
    const wikiUrl = `https://vi.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
    const wikiResp = await fetch(wikiUrl);
    const wikiData = await wikiResp.json();

    const image = await fetchPlantImage(query);

    return {
      name: wikiData.title,
      scientific: wikiData.title,
      description: wikiData.extract || "Chưa có mô tả",
      category: categories[Math.floor(Math.random() * categories.length)],
      image: image
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Khởi tạo danh sách cây
async function initPlants() {
  const plantNames = ["Lúa", "Cà chua", "Táo", "Đậu xanh", "Cây công nghiệp", "Cà phê", "Ngô", "Cà rốt"];
  const promises = plantNames.map(name => fetchPlantData(name));
  const results = await Promise.all(promises);
  plantsData = results.filter(p => p !== null);
  displayedCount = 0;
  renderPlants();
}

// Render danh sách cây
function renderPlants(reset = true) {
  if (reset) plantsContainer.innerHTML = "";

  const filtered = plantsData.filter(plant => {
    const searchMatch = plant.name.toLowerCase().includes(searchInput.value.toLowerCase());
    const categoryMatch = categorySelect.value === "all" || plant.category === categorySelect.value;
    return searchMatch && categoryMatch;
  });

  const toDisplay = filtered.slice(displayedCount, displayedCount + ITEMS_PER_LOAD);

  toDisplay.forEach(plant => {
    const card = document.createElement("div");
    card.className = "plant-card fade-in";
    card.innerHTML = `
      <img src="${plant.image}" alt="${plant.name}">
      <div class="plant-card-content">
        <div class="plant-card-header">
          <h3 class="plant-card-title">${plant.name}</h3>
          <span class="category-badge ${plant.category}">${plant.category}</span>
        </div>
        <p class="plant-scientific">${plant.scientific}</p>
        <p class="plant-description">${plant.description}</p>
      </div>
    `;
    plantsContainer.appendChild(card);
  });

  displayedCount += toDisplay.length;

  loadMoreBtn.style.display = displayedCount < filtered.length ? "inline-block" : "none";
}

// EVENT LISTENERS
searchInput.addEventListener("input", () => renderPlants());
categorySelect.addEventListener("change", () => renderPlants());
loadMoreBtn.addEventListener("click", () => renderPlants(false));
listViewBtn.addEventListener("click", () => plantsContainer.classList.add("list-view"));
gridViewBtn.addEventListener("click", () => plantsContainer.classList.remove("list-view"));

// INIT
initPlants();
