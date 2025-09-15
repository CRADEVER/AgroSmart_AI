// Danh sách video nền
const videos = [
  "videos/nen1.mp4",
  "videos/nen2.mp4",
  "videos/nen3.mp4",
  "videos/nen4.mp4",
  "videos/nen5.mp4"
];
let currentVideo = 0;
const videoElement = document.getElementById("bg-video");

// Hàm load video
function loadVideo(index) {
  currentVideo = (index + videos.length) % videos.length;
  videoElement.src = videos[currentVideo];
  videoElement.play();
}
function nextVideo(){ loadVideo(currentVideo + 1); }
function prevVideo(){ loadVideo(currentVideo - 1); }
videoElement.onended = () => nextVideo();
loadVideo(0);

// Dark mode
document.getElementById("dark-toggle").onclick = () => {
  document.body.classList.toggle("dark");
};

// Scroll animation cho thẻ plant-card
window.addEventListener("scroll", () => {
  document.querySelectorAll(".plant-card").forEach(card=>{
    const pos = card.getBoundingClientRect().top;
    if(pos < window.innerHeight - 50) card.classList.add("show");
  });
});

// Smooth scroll
function scrollToSection(id){
  document.getElementById(id).scrollIntoView({behavior:"smooth"});
}

// Tạo danh sách cây trồng
const plantGrid = document.getElementById("plantGrid");
plants.forEach(p=>{
  const card = document.createElement("div");
  card.className = "plant-card";
  card.innerHTML = `
    <img src="${p.img}" alt="${p.name}">
    <h3>${p.name}</h3>
  `;
  card.onclick = ()=> showPlantInfo(p);
  plantGrid.appendChild(card);
});

// Hiển thị thông tin cây
function showPlantInfo(plant){
  const info = document.getElementById("plantInfo");
  document.getElementById("plantName").innerText = plant.name;
  document.getElementById("plantImg").src = plant.img;
  document.getElementById("plantDesc").innerText = 
    `Nguồn gốc: ${plant.origin}. 
Nước tưới: ${plant.water}. 
Dinh dưỡng: ${plant.nutrition}.`;
  document.getElementById("plantSource").innerText = "Nguồn: AgroSmart AI";

  // Biểu đồ
  const ctx = document.getElementById("plantChart").getContext("2d");
  if(window.plantChart) window.plantChart.destroy();
  window.plantChart = new Chart(ctx,{
    type:"bar",
    data:{
      labels:["Nhiệt độ","Độ ẩm","Ánh sáng","pH"],
      datasets:[{
        label: plant.name,
        data:[plant.temp, plant.humidity, plant.light, plant.pH],
        backgroundColor:"#8BC34A"
      }]
    },
    options:{
      responsive:true,
      scales:{y:{beginAtZero:true}}
    }
  });
  info.classList.remove("hidden");
}

// Tìm kiếm cây trồng
document.getElementById("searchInput").addEventListener("input", e=>{
  const keyword = e.target.value.toLowerCase();
  Array.from(plantGrid.children).forEach(card=>{
    const name = card.querySelector("h3").innerText.toLowerCase();
    card.style.display = name.includes(keyword) ? "block" : "none";
  });
});
