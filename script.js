const plantList = document.getElementById("plant-list");
const searchInput = document.getElementById("search-input");

const modal = document.getElementById("plant-modal");
const modalTitle = document.getElementById("modal-title");
const modalDetails = document.getElementById("modal-details");
const closeModal = document.getElementById("close-modal");
let modalChart;

// Render plant cards
function renderPlants(filter = "") {
  plantList.innerHTML = "";
  plants
    .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach((plant, index) => {
      const card = document.createElement("div");
      card.className = "plant-card scroll-reveal";
      card.innerHTML = `
        <div class="img-container">
          <img src="${plant.img}" alt="${plant.name}">
        </div>
        <h3>${plant.name}</h3>
      `;
      card.addEventListener("click", () => showPlant(index));
      plantList.appendChild(card);
    });
  initScrollAnimation();
}

// Show plant in modal
function showPlant(index) {
  const plant = plants[index];
  modal.classList.remove("hidden");
  modalTitle.textContent = plant.name;
  modalDetails.innerHTML = `
    <p><b>Nhiệt độ:</b> ${plant.temp}°C</p>
    <p><b>Độ ẩm:</b> ${plant.humidity}%</p>
    <p><b>pH đất:</b> ${plant.pH}</p>
    <p><b>Số giờ chiếu sáng:</b> ${plant.light}h/ngày</p>
    <p><b>Nước:</b> ${plant.water}</p>
    <p><b>Nguồn gốc:</b> ${plant.origin}</p>
    <p><b>Lợi ích dinh dưỡng:</b> ${plant.nutrition}</p>
  `;
  const ctx = document.getElementById("modal-chart").getContext("2d");
  if (modalChart) modalChart.destroy();
  modalChart = new Chart(ctx, {
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

// Close modal
closeModal.addEventListener("click", () => modal.classList.add("hidden"));

// Scroll animation
function initScrollAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".scroll-reveal").forEach(card => {
    observer.observe(card);
  });
}

// Navigation highlight
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    const secTop = sec.offsetTop - 100;
    if (pageYOffset >= secTop) current = sec.getAttribute("id");
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Search
searchInput.addEventListener("input", e => {
  renderPlants(e.target.value);
});

// Dark mode
document.getElementById("dark-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Init
renderPlants();
