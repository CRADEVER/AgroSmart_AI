// ==== HELPER: Unsplash URL ====
function unsplashUrl(query, w=900, h=600){
  return `https://source.unsplash.com/${w}x${h}/?${encodeURIComponent(query)}`;
}

// ==== CARD RENDER ====
function createCard(p){
  const card = document.createElement("div");
  card.className = "plant-card";
  card.tabIndex = 0;

  const img = document.createElement("img");
  img.dataset.src = unsplashUrl(p.imgQuery);
  img.alt = p.name;
  img.loading = "lazy";
  img.onerror = () => img.src = "https://via.placeholder.com/600x400?text=No+Image";
  card.appendChild(img);

  const body = document.createElement("div");
  body.className = "card-body";
  body.innerHTML = `
    <div class="plant-meta">
      <h3>${p.name}</h3>
      <span class="badge">${p.tags?.[0] || ""}</span>
    </div>
  `;
  card.appendChild(body);

  card.addEventListener("click", ()=> openModal(p));
  card.addEventListener("keydown", e=> { if(e.key==="Enter") openModal(p); });

  return card;
}

function lazyLoadImages(){
  document.querySelectorAll("img[data-src]").forEach(img=>{
    if(!img.src){
      const tmp = new Image();
      tmp.onload = ()=> img.src = tmp.src;
      tmp.onerror = ()=> img.src = "https://via.placeholder.com/600x400?text=No+Image";
      tmp.src = img.dataset.src;
      delete img.dataset.src;
    }
  });
}

function renderGrid(list){
  plantGrid.innerHTML = "";
  list.forEach(p=> plantGrid.appendChild(createCard(p)));
  lazyLoadImages();
}

// ==== MODAL ====
function openModal(p){
  document.getElementById("modalTitle").innerText = p.name;
  document.getElementById("plantImg").src = unsplashUrl(p.imgQuery, 800, 500);
  document.getElementById("plantDesc").innerText = p.origin || p.notes || "";

  // === Bảng thông tin ===
  const infoBox = `
    <table class="info-table">
      <tr><td><strong>🌍 Vùng trồng</strong></td><td>${(p.regions||[]).join(", ") || "Toàn tỉnh"}</td></tr>
      <tr><td><strong>🌱 Thời vụ</strong></td><td>${p.planting?.season || "Nhiều vụ"}</td></tr>
      <tr><td><strong>⏳ Thu hoạch</strong></td><td>${p.harvest || "Chưa rõ"}</td></tr>
      <tr><td><strong>📊 Năng suất</strong></td><td>${p.yieldAvg || "n/a"}</td></tr>
    </table>
  `;
  document.getElementById("plantExtra").innerHTML = infoBox;

  document.getElementById("plantSource").innerText = `Nguồn: ${(p.sources||[]).join(" • ") || "AgroSmart"}`;

  // === Chart điều kiện ===
  const ctx = document.getElementById("plantChart").getContext("2d");
  if(window._chart) window._chart.destroy();
  window._chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Nhiệt độ (°C)","Độ ẩm (%)","Ánh sáng (h)","pH"],
      datasets: [{
        label: p.name,
        data: [p.chart.temp, p.chart.humidity, p.chart.light, p.chart.pH],
        backgroundColor: ["#FFB74D","#81C784","#64B5F6","#E57373"]
      }]
    },
    options: {
      responsive:true,
      scales: { y: { beginAtZero:true } }
    }
  });

  // === Bảng dinh dưỡng ===
  const n = p.nutrition || {};
  const nutriBox = `
    <h4>Yêu cầu dinh dưỡng (kg/ha)</h4>
    <table class="info-table">
      <tr><td>N</td><td>${n.N||0}</td></tr>
      <tr><td>P</td><td>${n.P||0}</td></tr>
      <tr><td>K</td><td>${n.K||0}</td></tr>
      ${n.Ca ? `<tr><td>Ca</td><td>${n.Ca}</td></tr>`:""}
      ${n.Mg ? `<tr><td>Mg</td><td>${n.Mg}</td></tr>`:""}
    </table>
  `;
  document.getElementById("nutriBox").innerHTML = nutriBox;

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

// ==== SEARCH ====
searchInput.addEventListener("input", e=>{
  const q = e.target.value.toLowerCase();
  const filtered = plants.filter(p=>
    p.name.toLowerCase().includes(q) ||
    p.tags?.join(" ").toLowerCase().includes(q)
  );
  renderGrid(filtered);
});

// ==== INIT ====
renderGrid(plants);
