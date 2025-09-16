// Danh sách video nền
const videos = ["nen1.mp4", "nen2.mp4", "nen3.mp4", "nen4.mp4", "nen5.mp4"];
let videoIndex = 0;
const bgVideo = document.getElementById("bgVideo");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const exploreBtn = document.getElementById("exploreBtn");

// Hàm tải video theo index
function loadVideo(index) {
  bgVideo.src = videos[index];
  bgVideo.load();
  bgVideo.play();
}
loadVideo(videoIndex);

// Chuyển sang video trước
prevBtn.addEventListener("click", () => {
  videoIndex = (videoIndex - 1 + videos.length) % videos.length;
  loadVideo(videoIndex);
});
// Chuyển sang video sau
nextBtn.addEventListener("click", () => {
  videoIndex = (videoIndex + 1) % videos.length;
  loadVideo(videoIndex);
});
// Tự động chuyển khi video kết thúc
bgVideo.addEventListener("ended", () => {
  nextBtn.click();
});

// Nút "Khám phá ngay" cuộn đến thư viện cây trồng
exploreBtn.addEventListener("click", () => {
  document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
});

// Kết xuất các thẻ cây trồng từ plantData
const plantCards = document.getElementById("plantCards");
function renderPlants(plants) {
  plantCards.innerHTML = ""; // Xóa hết trước khi render lại
  plants.forEach(plant => {
    const card = document.createElement("div");
    card.className = "card";
    // Lấy ảnh đầu tiên làm ảnh đại diện
    const img = document.createElement("img");
    img.src = plant.images[0];
    img.alt = plant.name;
    const title = document.createElement("h3");
    title.textContent = plant.name;
    const origin = document.createElement("p");
    origin.textContent = plant.origin;
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(origin);
    // Sự kiện click mở modal chi tiết
    card.addEventListener("click", () => openModal(plant));
    plantCards.appendChild(card);
  });
}
// Ban đầu render tất cả cây
renderPlants(plantData);

// Tìm kiếm cây theo tên
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = plantData.filter(p => p.name.toLowerCase().includes(keyword));
  renderPlants(filtered);
});

// Modal chi tiết cây trồng
const modal = document.getElementById("plantModal");
const closeModal = document.getElementById("closeModal");
closeModal.onclick = () => { modal.style.display = "none"; };

// Hàm mở modal và điền dữ liệu cây
function openModal(plant) {
  document.getElementById("modalTitle").textContent = plant.name;
  document.getElementById("modalSciName").textContent = plant.scientificName;
  document.getElementById("modalOrigin").textContent = plant.origin;
  document.getElementById("modalConditions").textContent = 
    `Nhiệt độ ${plant.conditions[0]}°C, Độ ẩm ${plant.conditions[1]}%, pH đất ${plant.conditions[2]}, Ánh sáng ${plant.conditions[3]}.`;
  document.getElementById("modalNutrients").textContent = 
    `N=${plant.nutrients[0]}%, P=${plant.nutrients[1]}%, K=${plant.nutrients[2]}%.`;
  document.getElementById("modalSeason").textContent = plant.season;
  document.getElementById("modalYield").textContent = plant.yield;
  document.getElementById("modalUses").textContent = plant.uses;
  // Vẽ biểu đồ conditions
  const ctxC = document.getElementById("conditionsChart").getContext("2d");
  new Chart(ctxC, {
    type: 'bar',
    data: {
      labels: ["Nhiệt độ", "Độ ẩm", "pH đất", "Ánh sáng"],
      datasets: [{
        label: plant.name,
        data: plant.conditions,
        backgroundColor: ['rgba(255, 99, 132, 0.6)','rgba(54, 162, 235, 0.6)','rgba(255, 206, 86, 0.6)','rgba(75, 192, 192, 0.6)'],
        borderColor: ['rgb(255,99,132)','rgb(54,162,235)','rgb(255,206,86)','rgb(75,192,192)'],
        borderWidth: 1
      }]
    },
    options: { scales: { y: { beginAtZero: true } } }
  });
  // Vẽ biểu đồ nutrients
  const ctxN = document.getElementById("nutrientsChart").getContext("2d");
  new Chart(ctxN, {
    type: 'bar',
    data: {
      labels: ["Đạm (N)", "Lân (P)", "Kali (K)"],
      datasets: [{
        label: plant.name,
        data: plant.nutrients,
        backgroundColor: ['rgba(153, 102, 255, 0.6)','rgba(255, 159, 64, 0.6)','rgba(255, 205, 86, 0.6)'],
        borderColor: ['rgb(153,102,255)','rgb(255,159,64)','rgb(255,205,86)'],
        borderWidth: 1
      }]
    },
    options: { scales: { y: { beginAtZero: true } } }
  });
  modal.style.display = "block";
}

// Bật/tắt chế độ tối
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Điều khiển Chatbot (mở/đóng modal chat)
const chatToggle = document.getElementById("chatbotToggle");
const chatModal = document.getElementById("chatbotModal");
const closeChat = document.getElementById("closeChatbot");
chatToggle.onclick = () => { chatModal.style.display = "block"; };
closeChat.onclick = () => { chatModal.style.display = "none"; };
