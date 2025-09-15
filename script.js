document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const videos = [
    "videos/nen1.mp4",
    "videos/nen2.mp4",
    "videos/nen3.mp4",
    "videos/nen4.mp4",
    "videos/nen5.mp4"
  ];
  let currentVideo = 0;

  const videoElement = document.getElementById("bg-video");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const darkToggle = document.getElementById("dark-toggle");
  const logo = document.getElementById("logo");
  const ctaBtn = document.getElementById("ctaBtn");

  const plantGrid = document.getElementById("plantGrid");
  const searchInput = document.getElementById("searchInput");
  const info = document.getElementById("plantInfo");
  const plantName = document.getElementById("plantName");
  const plantImg = document.getElementById("plantImg");
  const plantDesc = document.getElementById("plantDesc");
  const plantSource = document.getElementById("plantSource");
  const plantChartCanvas = document.getElementById("plantChart");

  // Video controls
  function loadVideo(index) {
    currentVideo = (index + videos.length) % videos.length;
    if (videoElement) {
      // set src only if file path likely exists; browser will log error if not
      videoElement.src = videos[currentVideo];
      // play may return a promise in some browsers
      const p = videoElement.play();
      if (p && p.catch) p.catch(()=>{/* autoplay blocked, ignore */});
    }
  }
  function nextVideo(){ loadVideo(currentVideo + 1); }
  function prevVideo(){ loadVideo(currentVideo - 1); }

  if (nextBtn) nextBtn.addEventListener("click", nextVideo);
  if (prevBtn) prevBtn.addEventListener("click", prevVideo);
  if (videoElement) videoElement.addEventListener("ended", nextVideo);

  loadVideo(0);

  // Dark mode toggle
  if (darkToggle) darkToggle.addEventListener("click", ()=> document.body.classList.toggle("dark"));

  // Header logo click
  if (logo) logo.addEventListener("click", ()=> scrollToSection("home"));
  if (ctaBtn) ctaBtn.addEventListener("click", ()=> scrollToSection("plants"));

  // Smooth scroll helper
  function scrollToSection(id){
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:"smooth"});
  }

  // Create plant cards
  function buildPlantCards(){
    plantGrid.innerHTML = "";
    plants.forEach(p=>{
      const card = document.createElement("div");
      card.className = "plant-card";
      card.innerHTML = `
        <img src="${p.img}" alt="${p.name}" />
        <h3>${p.name}</h3>
      `;
      card.addEventListener("click", ()=> showPlantInfo(p));
      plantGrid.appendChild(card);
    });
  }
  buildPlantCards();

  // Show plant info (graceful with Chart.js)
  function showPlantInfo(plant){
    if(!plant) return;
    plantName.innerText = plant.name || "";
    plantImg.src = plant.img || "";
    plantImg.alt = plant.name || "Plant";
    plantDesc.innerText =
      `Nguồn gốc: ${plant.origin || "Không rõ"}. ` +
      `Nước tưới: ${plant.water || "Không rõ"}. ` +
      `Dinh dưỡng: ${plant.nutrition || "Không rõ"}.`;

    plantSource.innerText = "Nguồn: AgroSmart AI";

    // Hiện khung thông tin trước khi vẽ biểu đồ (tránh lỗi Chart làm block)
    info.classList.remove("hidden");

    // Vẽ biểu đồ nếu Chart có sẵn
    try {
      if (typeof Chart !== "undefined" && plantChartCanvas) {
        if (window.plantChart) window.plantChart.destroy();
        const ctx = plantChartCanvas.getContext("2d");
        window.plantChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Nhiệt độ", "Độ ẩm", "Ánh sáng", "pH"],
            datasets: [{
              label: plant.name,
              data: [
                Number(plant.temp) || 0,
                Number(plant.humidity) || 0,
                Number(plant.light) || 0,
                Number(plant.pH) || 0
              ],
              // Nếu Chart.js có theme, màu mặc định sẽ được dùng; dùng một màu an toàn
              backgroundColor: "#8BC34A"
            }]
          },
          options: { responsive: true, scales: { y: { beginAtZero: true } } }
        });
        plantChartCanvas.style.display = ""; // chắc chắn hiển thị
      } else {
        // Nếu Chart.js không load được => ẩn canvas
        if (plantChartCanvas) plantChartCanvas.style.display = "none";
        console.warn("Chart.js không được load; biểu đồ sẽ không hiển thị.");
      }
    } catch (err) {
      console.error("Lỗi khi vẽ biểu đồ:", err);
      if (plantChartCanvas) plantChartCanvas.style.display = "none";
    }
  }

  // Tìm kiếm
  if (searchInput) {
    searchInput.addEventListener("input", (e)=>{
      const kw = (e.target.value || "").toLowerCase();
      Array.from(plantGrid.children).forEach(card=>{
        const name = (card.querySelector("h3")?.innerText || "").toLowerCase();
        card.style.display = name.includes(kw) ? "block" : "none";
      });
    });
  }

  // Scroll animation (lướt xem card)
  window.addEventListener("scroll", () => {
    document.querySelectorAll(".plant-card").forEach(card=>{
      const pos = card.getBoundingClientRect().top;
      if (pos < window.innerHeight - 50) card.classList.add("show");
    });
  });

});
