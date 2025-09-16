// Dark mode
const darkToggle = document.getElementById("dark-toggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Scroll to section
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Load plants
async function loadPlants() {
  const response = await fetch("plants.json");
  const plants = await response.json();

  const plantList = document.getElementById("plant-list");
  const search = document.getElementById("search");

  function render(filter = "") {
    plantList.innerHTML = "";
    plants
      .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
      .forEach(p => {
        const card = document.createElement("div");
        card.className = "plant-card";
        card.innerHTML = `<img src="${p.img}" alt="${p.name}"><h3>${p.name}</h3>`;
        card.onclick = () => openModal(p);
        plantList.appendChild(card);
      });
  }

  search.addEventListener("input", e => render(e.target.value));
  render();
}
loadPlants();

// Modal
function openModal(plant) {
  const modal = document.getElementById("plant-modal");
  modal.classList.remove("hidden");
  document.getElementById("modal-name").textContent = plant.name;
  document.getElementById("modal-img").src = plant.img;
  document.getElementById("plant-details").innerHTML = `
    <p><b>Nguồn gốc:</b> ${plant.origin}</p>
    <p><b>Lợi ích dinh dưỡng:</b> ${plant.nutrition}</p>
    <p><b>Cách chăm sóc:</b> ${plant.care}</p>
    <p><i>${plant.source}</i></p>
  `;
  const ctx = document.getElementById("plant-chart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Nhiệt độ (°C)", "Độ ẩm (%)", "pH đất", "Ánh sáng (giờ)"],
      datasets: [{
        label: "Yêu cầu sinh trưởng",
        data: [
          plant.conditions.temperature,
          plant.conditions.humidity,
          plant.conditions.ph,
          plant.conditions.light
        ],
        backgroundColor: ["#4caf50","#2196f3","#ff9800","#9c27b0"]
      }]
    },
    options: { responsive: true, scales: { y: { beginAtZero: true } } }
  });
}
function closeModal() {
  document.getElementById("plant-modal").classList.add("hidden");
}
