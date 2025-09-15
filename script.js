const grid = document.getElementById("plant-grid");
const search = document.getElementById("search");
const info = document.getElementById("plant-info");
const nameEl = document.getElementById("plant-name");
const detailsEl = document.getElementById("plant-details");
let chart;

// Hiển thị card
function renderPlants(list) {
  grid.innerHTML = "";
  list.forEach((p) => {
    const card = document.createElement("div");
    card.className = "plant-card";
    card.innerHTML = `<img src="${p.img}" alt="${p.name}">
                      <h3>${p.name}</h3>`;
    grid.appendChild(card);

    // Click card → show info dưới
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

  // Scroll animation
  const cards = document.querySelectorAll(".plant-card");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  }, { threshold: 0.2 });
  cards.forEach((c) => observer.observe(c));
}

// Tìm kiếm
search.addEventListener("input", () => {
  const val = search.value.toLowerCase();
  const filtered = plants.filter(p => p.name.toLowerCase().includes(val));
  renderPlants(filtered);
});

// Navbar highlight
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((s) => {
    const top = window.scrollY;
    if (top >= s.offsetTop - 100) current = s.getAttribute("id");
  });
  navLinks.forEach((l) => {
    l.classList.remove("active");
    if (l.getAttribute("href").includes(current)) l.classList.add("active");
  });
});

// Dark mode
document.getElementById("dark-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Render ban đầu
renderPlants(plants);
