// ==== DATA SAMPLE ====
// Dễ dàng thay đổi, thêm bớt cây trồng
const plants = [
  { id: 1, name: "Cây Xương Rồng", category: "Xương rồng", description: "Cây chịu hạn, thích nắng.", img: "images/cay1.jpg" },
  { id: 2, name: "Cây Sen Đá", category: "Sen đá", description: "Cây dễ chăm sóc, mọng nước.", img: "images/cay2.jpg" },
  { id: 3, name: "Cây Lan", category: "Hoa", description: "Hoa lan đẹp, cần ánh sáng gián tiếp.", img: "images/cay3.jpg" },
  { id: 4, name: "Cây Bàng", category: "Cây lá", description: "Cây bóng mát, cần không gian rộng.", img: "images/cay4.jpg" },
  { id: 5, name: "Cây Lưỡi Hổ", category: "Xương rồng", description: "Dễ trồng trong nhà, lọc không khí.", img: "images/cay5.jpg" },
  { id: 6, name: "Cây Hoa Hồng", category: "Hoa", description: "Hoa hồng thơm, cần nhiều nắng.", img: "images/cay6.jpg" },
];

// ==== DOM ELEMENTS ====
const plantsGrid = document.querySelector(".plants-grid");
const categorySelect = document.querySelector(".category-select");
const searchInput = document.querySelector(".search-input");
const viewBtns = document.querySelectorAll(".view-btn");
const modal = document.querySelector(".modal");
const modalTitle = modal.querySelector(".modal-title");
const modalImg = modal.querySelector(".modal-body img");
const modalDesc = modal.querySelector(".modal-body p");
const modalClose = modal.querySelector(".modal-btn");

// ==== RENDER FUNCTION ====
function renderPlants(list) {
  plantsGrid.innerHTML = ""; // Clear
  if (list.length === 0) {
    plantsGrid.innerHTML = "<p>Không tìm thấy cây nào.</p>";
    return;
  }
  list.forEach(plant => {
    const card = document.createElement("div");
    card.className = "plant-card";
    card.innerHTML = `
      <img src="${plant.img}" alt="${plant.name}">
      <div class="plant-card-body">
        <h3>${plant.name}</h3>
        <p>${plant.description}</p>
      </div>
    `;
    // Click mở modal
    card.addEventListener("click", () => openModal(plant));
    plantsGrid.appendChild(card);
  });
}

// ==== MODAL FUNCTIONS ====
function openModal(plant) {
  modal.style.display = "flex";
  modalTitle.textContent = plant.name;
  modalDesc.textContent = plant.description;
  modalImg.src = plant.img;
  modalImg.alt = plant.name;
}

function closeModal() {
  modal.style.display = "none";
}

// ==== FILTER & SEARCH ====
function filterPlants() {
  const category = categorySelect.value;
  const keyword = searchInput.value.toLowerCase();

  let filtered = plants;

  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }
  if (keyword) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(keyword));
  }

  renderPlants(filtered);
}

// ==== VIEW TOGGLE ====
viewBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    viewBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    if (btn.dataset.view === "grid") {
      plantsGrid.parentElement.classList.remove("list-view");
    } else {
      plantsGrid.parentElement.classList.add("list-view");
    }
  });
});

// ==== EVENT LISTENERS ====
categorySelect.addEventListener("change", filterPlants);
searchInput.addEventListener("input", filterPlants);
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });

// ==== INIT ====
renderPlants(plants);
