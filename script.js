const grid = document.getElementById("plant-grid");
const search = document.getElementById("search");
const info = document.getElementById("plant-info");
const nameEl = document.getElementById("plant-name");
const detailsEl = document.getElementById("plant-details");
let chart;

// Render card
function renderPlants(list) {
  grid.innerHTML = "";
  list.forEach((p) => {
    const card = document.createElement("div");
    card.className = "plant-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="card-info"><h3>${p.name}</h3></div>
    `;
    grid.appendChild(card);

    card.addEventListener("click", () => {
      info.classList.remove("hidden");
      nameEl.textContent = p.name;
      detailsEl.innerHTML = `
        <b>Nguồn gốc:</b> ${p.origin}<br>
        <b>Lợi ích dinh dưỡng:</b> ${p.nutrition}<br>
        <b>Điều kiện:</b> Nhiệt độ ${p.temp}°C, Ẩm ${p.humidity}%, pH ${p.pH}, 
        Ánh sáng ${p.light}h/ngày, Nước: ${p.water}
      `;
      if (chart) chart.destroy();
      const ctx = document.getElementById("plant-chart").getContext("2d");
      chart = new Chart(ctx, {
        type: "radar",
        data: {
          labels: ["Nhiệt độ", "Độ ẩm", "pH", "Ánh sáng"],
          datasets: [{
            label: p.name,
            data: [p.temp, p.humidity, p.pH * 10, p.light * 10],
            backgroundColor: "rgba(46,125,50,0.2)",
            borderColor: "#2e7d32"
          }]
        }
      });
      info.scrollIntoView({ behavior: "smooth" });
    });
  });
}

// Navbar highlight
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((s) => {
    if (scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach((l) => {
    l.classList.remove("active");
    if (l.getAttribute("href").includes(current)) l.classList.add("active");
  });
});

// Menu toggle
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.getElementById("navbar").classList.toggle("show");
});

// Render
renderPlants(plants);

// Tìm kiếm
search.addEventListener("input", () => {
  const val = search.value.toLowerCase();
  const filtered = plants.filter(p => p.name.toLowerCase().includes(val));
  renderPlants(filtered);
});
