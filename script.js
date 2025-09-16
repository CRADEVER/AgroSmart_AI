const plantList = document.getElementById("plant-list");
const plantInfo = document.getElementById("plant-info");
const plantName = document.getElementById("plant-name");
const plantDetails = document.getElementById("plant-details");

let chart;

// Hiển thị danh sách cây
plants.forEach(plant => {
  const card = document.createElement("div");
  card.className = "plant-card";
  card.innerHTML = `
    <img src="${plant.img}" alt="${plant.name}">
    <h3>${plant.name}</h3>
  `;
  card.onclick = () => showInfo(plant);
  plantList.appendChild(card);
});

// Hiển thị thông tin chi tiết
function showInfo(plant) {
  plantInfo.classList.remove("hidden");
  plantName.innerText = plant.name;
  plantDetails.innerHTML = `<p>💧 Nước: ${plant.water}</p>`;

  // Vẽ biểu đồ Chart.js
  const ctx = document.getElementById("plant-chart").getContext("2d");
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Nhiệt độ (°C)", "Độ ẩm (%)", "pH đất", "Ánh sáng (h/ngày)"],
      datasets: [{
        label: "Điều kiện tối ưu",
        data: [plant.temp, plant.humidity, plant.pH, plant.light],
        backgroundColor: ["#ff9800", "#2196f3", "#4caf50", "#f44336"]
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  });
}
// Toggle Dark Mode
document.getElementById("dark-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const btn = document.getElementById("dark-toggle");
  if (document.body.classList.contains("dark")) {
    btn.textContent = "☀️ Light Mode";
  } else {
    btn.textContent = "🌙 Dark Mode";
  }
});
