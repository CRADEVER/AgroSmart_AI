// Unsplash helper
function unsplashUrl(query,w=900,h=600){
  return `https://source.unsplash.com/${w}x${h}/?${encodeURIComponent(query)}`;
}

// Render plant cards
function createCard(p){
  const card=document.createElement("div");
  card.className="plant-card";
  const img=document.createElement("img");
  img.dataset.src=unsplashUrl(p.imgQuery);
  img.alt=p.name;
  img.loading="lazy";
  img.onerror=()=>img.src="https://via.placeholder.com/600x400?text=No+Image";
  card.appendChild(img);
  const body=document.createElement("div");
  body.innerHTML=`<h3>${p.name}</h3>`;
  card.appendChild(body);
  card.addEventListener("click",()=>openModal(p));
  return card;
}

function lazyLoadImages(){
  document.querySelectorAll("img[data-src]").forEach(img=>{
    if(!img.src){
      const tmp=new Image();
      tmp.onload=()=>img.src=tmp.src;
      tmp.onerror=()=>img.src="https://via.placeholder.com/600x400?text=No+Image";
      tmp.src=img.dataset.src;
      delete img.dataset.src;
    }
  });
}

function renderGrid(list){
  plantGrid.innerHTML="";
  list.forEach(p=>plantGrid.appendChild(createCard(p)));
  lazyLoadImages();
}

// Modal
function openModal(p){
  modal.classList.remove("hidden");
  document.body.style.overflow="hidden";
  document.getElementById("modalTitle").innerText=`${p.name} (${p.scientific})`;
  document.getElementById("plantImg").src=unsplashUrl(p.imgQuery,800,500);
  document.getElementById("plantDesc").innerText=p.origin;

  document.getElementById("plantExtra").innerHTML=`
    <table class="info-table">
      <tr><td>🌍 Vùng trồng</td><td>${(p.regions||[]).join(", ")}</td></tr>
      <tr><td>🌱 Thời vụ</td><td>${p.planting?.season||"Nhiều vụ"}</td></tr>
      <tr><td>⏳ Thu hoạch</td><td>${p.harvest||"n/a"}</td></tr>
      <tr><td>📊 Năng suất</td><td>${p.yieldAvg||"n/a"}</td></tr>
    </table>
  `;

  document.getElementById("plantSource").innerText=`Nguồn: ${(p.sources||[]).join(" • ")}`;

  const ctx=document.getElementById("plantChart").getContext("2d");
  if(window._chart) window._chart.destroy();
  window._chart=new Chart(ctx,{
    type:"bar",
    data:{
      labels:["Nhiệt độ (°C)","Độ ẩm (%)","Ánh sáng (h)","pH"],
      datasets:[{label:p.name,data:[p.chart.temp,p.chart.humidity,p.chart.light,p.chart.pH],
        backgroundColor:["#FFB74D","#81C784","#64B5F6","#E57373"]}]
    },
    options:{responsive:true,scales:{y:{beginAtZero:true}}}
  });

  document.getElementById("nutriBox").innerHTML=`
    <h4>Yêu cầu dinh dưỡng (kg/ha)</h4>
    <table class="info-table">
      <tr><td>N</td><td>${p.nutrition.N||0}</td></tr>
      <tr><td>P</td><td>${p.nutrition.P||0}</td></tr>
      <tr><td>K</td><td>${p.nutrition.K||0}</td></tr>
      ${p.nutrition.Ca?`<tr><td>Ca</td><td>${p.nutrition.Ca}</td></tr>`:""}
      ${p.nutrition.Mg?`<tr><td>Mg</td><td>${p.nutrition.Mg}</td></tr>`:""}
    </table>
  `;
}

function closeModal(){
  modal.classList.add("hidden");
  document.body.style.overflow="auto";
}

// Search
searchInput.addEventListener("input",e=>{
  const q=e.target.value.toLowerCase();
  const filtered=plants.filter(p=>p.name.toLowerCase().includes(q));
  renderGrid(filtered);
});

// Dark mode
document.getElementById("dark-toggle").onclick=()=>document.body.classList.toggle("dark");

// Init
renderGrid(plants);
