// Load danh sách cây trồng
const plantList = document.getElementById("plant-list");
const plantInfo = document.getElementById("plant-info");
const plantName = document.getElementById("plant-name");
const plantDetails = document.getElementById("plant-details");
let plantChart;

// Hiển thị danh sách
plants.forEach((plant, index) => {
  const card = document.createElement("div");
  card.className = "plant-card";
  card.innerHTML = `
    <img src="${plant.img}" alt="${plant.name}">
    <h3>${plant.name}</h3>
  `;
  card.addEventListener("click", () => showPlant(index));
  plantList.appendChild(card);
});

// Hiển thị chi tiết cây trồng
function showPlant(index) {
  const plant = plants[index];
  plantInfo.classList.remove("hidden");
  plantName.textContent = plant.name;
  plantDetails.innerHTML = `
    <p><b>Nhiệt độ:</b> ${plant.temp}°C</p>
    <p><b>Độ ẩm:</b> ${plant.humidity}%</p>
    <p><b>pH đất:</b> ${plant.pH}</p>
    <p><b>Số giờ chiếu sáng:</b> ${plant.light}h/ngày</p>
    <p><b>Nước:</b> ${plant.water}</p>
  `;

  // Vẽ biểu đồ
  const ctx = document.getElementById("plant-chart").getContext("2d");
  if (plantChart) plantChart.destroy(); // Xoá biểu đồ cũ
  plantChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: ["Nhiệt độ", "Độ ẩm", "pH", "Ánh sáng"],
      datasets: [{
        label: plant.name,
        data: [plant.temp, plant.humidity, plant.pH * 10, plant.light * 5],
        backgroundColor: "rgba(46,125,50,0.2)",
        borderColor: "#2e7d32",
        pointBackgroundColor: "#2e7d32"
      }]
    },
    options: {
      scales: { r: { beginAtZero: true } }
    }
  });
}

// Dark Mode toggle
const toggleBtn = document.getElementById("dark-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
