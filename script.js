const plantList = document.getElementById("plant-list");
const plantInfo = document.getElementById("plant-info");
const plantName = document.getElementById("plant-name");
const plantDetails = document.getElementById("plant-details");
const searchInput = document.getElementById("search-input");
let plantChart;

// Hiển thị danh sách
function renderPlants(filter = "") {
  plantList.innerHTML = "";
  plants
    .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach((plant, index) => {
      const card = document.createElement("div");
      card.className = "plant-card fade-in";
      card.innerHTML = `
        <div class="img-container">
          <img src="${plant.img}" alt="${plant.name}">
        </div>
        <h3>${plant.name}</h3>
      `;
      card.addEventListener("click", () => showPlant(index));
      plantList.appendChild(card);
    });
}

// Hiển thị chi tiết cây
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
    <p><b>Nguồn gốc:</b> ${plant.origin}</p>
    <p><b>Lợi ích dinh dưỡng:</b> ${plant.nutrition}</p>
  `;

  const ctx = document.getElementById("plant-chart").getContext("2d");
  if (plantChart) plantChart.destroy();
  plantChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: ["Nhiệt độ", "Độ ẩm", "pH*10", "Ánh sáng*5"],
      datasets: [{
        label: plant.name,
        data: [plant.temp, plant.humidity, plant.pH * 10, plant.light * 5],
        backgroundColor: "rgba(46,125,50,0.2)",
        borderColor: "#2e7d32",
        pointBackgroundColor: "#2e7d32"
      }]
    },
    options: { scales: { r: { beginAtZero: true } } }
  });
}

// Tìm kiếm
searchInput.addEventListener("input", e => {
  renderPlants(e.target.value);
});

// Dark mode toggle
document.getElementById("dark-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Render lần đầu
renderPlants();
