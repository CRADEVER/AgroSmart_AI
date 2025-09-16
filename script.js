// ================= VIDEO =================
const videos = [
  "videos/nen1.mp4",
  "videos/nen2.mp4",
  "videos/nen3.mp4",
  "videos/nen4.mp4",
  "videos/nen5.mp4"
];
let currentVideo = 0;
const bgVideo = document.getElementById("bg-video");

function loadVideo(index) {
  if (index < 0) index = videos.length - 1;
  if (index >= videos.length) index = 0;
  currentVideo = index;
  bgVideo.src = videos[currentVideo];
  bgVideo.play();
}
function nextVideo() { loadVideo(currentVideo + 1); }
function prevVideo() { loadVideo(currentVideo - 1); }
bgVideo.addEventListener("ended", nextVideo);
loadVideo(0);

// ================= PLANTS =================
const plantList = document.getElementById("plant-list");
const searchBox = document.getElementById("search-box");
const popup = document.getElementById("plant-popup");
const plantName = document.getElementById("plant-name");
const plantDetails = document.getElementById("plant-details");
const plantSource = document.getElementById("plant-source");
const ctx = document.getElementById("plant-chart").getContext("2d");
let chart;

const plants = ["lua","ngo","cam","cachua","mia","che","lac","khoai","chuoi","xoai"];

async function loadPlants() {
  plantList.innerHTML = "";
  for (let p of plants) {
    const data = await fetch(`plants/${p}.json`).then(r => r.json());
    const card = document.createElement("div");
    card.className = "plant-card";
    card.innerHTML = `<img src="${data.img}" alt="${data.name}"><h3>${data.name}</h3>`;
    card.onclick = () => showPlant(data);
    plantList.appendChild(card);
  }
}

function showPlant(data) {
  popup.classList.remove("hidden");
  plantName.textContent = data.name;
  plantDetails.innerHTML = `
    <p><b>Nguồn gốc:</b> ${data.origin}</p>
    <p><b>Lợi ích dinh dưỡng:</b> ${data.nutrition}</p>
    <p><b>Cách chăm sóc:</b> ${data.care}</p>
  `;
  plantSource.textContent = `Nguồn: ${data.source}`;

  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Nhiệt độ (°C)", "Độ ẩm (%)", "pH đất", "Ánh sáng (giờ)"],
      datasets: [{
        label: "Yêu cầu sinh trưởng",
        data: [data.temp, data.humidity, data.pH, data.light],
        backgroundColor: ["#66bb6a","#ffee58","#42a5f5","#ff7043"]
      }]
    }
  });
}
function closePopup() { popup.classList.add("hidden"); }

// ================= DARK MODE =================
document.getElementById("dark-toggle").onclick = () => {
  document.body.classList.toggle("dark");
};

// ================= SEARCH =================
searchBox.addEventListener("input", () => {
  const val = searchBox.value.toLowerCase();
  document.querySelectorAll(".plant-card").forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = name.includes(val) ? "block" : "none";
  });
});

// Gọi load
loadPlants();
