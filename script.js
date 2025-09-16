const plantList = document.getElementById("plant-list");
const searchBox = document.getElementById("search-box");
const popup = document.getElementById("plant-popup");
const plantName = document.getElementById("plant-name");
const plantDetails = document.getElementById("plant-details");
const plantSource = document.getElementById("plant-source");
const ctx = document.getElementById("plant-chart").getContext("2d");

let chart;

// Danh sách JSON các cây
const plants = [
  "lua", "ngo", "cam", "cachua", "mia", "che", "lac", "khoai", "chuoi", "xoai"
];

// Load danh sách cây
async function loadPlants() {
  plantList.innerHTML = "";
  for (let p of plants) {
    const data = await fetch(`plants/${p}.json`).then(r => r.json());
    const card = document.createElement("div");
    card.className = "plant-card";
    card.innerHTML = `
      <img src="${data.img}" alt="${data.name}">
      <h3>${data.name}</h3>
    `;
    card.onclick = () => showPlant(data);
    plantList.appendChild(card);
  }
}

// Hiển thị chi tiết trong popup
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
        backgroundColor: ["#66bb6a", "#ffee58", "#42a5f5", "#ff7043"]
      }]
    }
  });
}

function closePopup() {
  popup.classList.add("hidden");
}

// Dark mode
document.getElementById("dark-toggle").onclick = () => {
  document.body.classList.toggle("dark");
};

// Search
searchBox.addEventListener("input", () => {
  const val = searchBox.value.toLowerCase();
  document.querySelectorAll(".plant-card").forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    card.style.display = name.includes(val) ? "block" : "none";
  });
});

// Gọi load
loadPlants();
