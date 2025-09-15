// Danh sách video nền
const videos = [
  "videos/nen1.mp4",
  "videos/nen2.mp4",
  "videos/nen3.mp4"
];
let currentVideo = 0;
const videoElement = document.getElementById("bg-video");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function loadVideo(index) {
  currentVideo = (index + videos.length) % videos.length;
  videoElement.src = videos[currentVideo];
  videoElement.play();
}
function nextVideo() { loadVideo(currentVideo + 1); }
function prevVideo() { loadVideo(currentVideo - 1); }

prevBtn.addEventListener("click", prevVideo);
nextBtn.addEventListener("click", nextVideo);
videoElement.onended = () => nextVideo();
loadVideo(0);

// Dark mode
document.getElementById("dark-toggle").onclick = () => {
  document.body.classList.toggle("dark");
};

// Smooth scroll
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Render plant cards
const plantGrid = document.getElementById("plantGrid");
plants.forEach(p => {
  const card = document.createElement("div");
  card.className = "plant-card";
  card.innerHTML = `<img src="${p.img}" alt="${p.name}"><h3>${p.name}</h3>`;
  card.addEventListener("click", () => showPlantInfo(p));
  plantGrid.appendChild(card);
});

// Show plant info
function showPlantInfo(plant) {
  document.getElementById("plantName").innerText = plant.name;
  document.getElementById("plantImg").src = plant.img;

  document.getElementById("plantDesc").innerText =
    `Nguồn gốc: ${plant.origin}. 
Nước tưới: ${plant.water}.`;

  document.getElementById("plantExtra").innerHTML = `
    <li>Dinh dưỡng: ${plant.nutrition}</li>
    <li>Cách trồng: ${plant.planting}</li>
    <li>Thời gian thu hoạch: ${plant.harvest}</li>
  `;

  document.getElementById("plantSource").innerText = "Nguồn: AgroSmart AI";

  const ctx = document.getElementById("plantChart").getContext("2d");
  if (window.plantChart) window.plantChart.destroy();
  window.plantChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Nhiệt độ (°C)", "Độ ẩm (%)", "Ánh sáng (h)", "pH"],
      datasets: [{
        label: plant.name,
        data: [plant.temp, plant.humidity, plant.light, plant.pH],
        backgroundColor: "#8BC34A"
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });

  document.getElementById("plantInfo").classList.remove("hidden");
}

// Search
document.getElementById("searchInput").addEventListener("input", e => {
  const keyword = e.target.value.toLowerCase();
  Array.from(plantGrid.children).forEach(card => {
    const name = card.querySelector("h3").innerText.toLowerCase();
    card.style.display = name.includes(keyword) ? "block" : "none";
  });
});
