const videos = ["videos/nen1.mp4","videos/nen2.mp4","videos/nen3.mp4","videos/nen4.mp4","videos/nen5.mp4"];
let currentVideo = 0;
const videoElement = document.getElementById("bg-video");

function loadVideo(index) {
  currentVideo = (index + videos.length) % videos.length;
  videoElement.src = videos[currentVideo];
  videoElement.play();
}
function nextVideo(){ loadVideo(currentVideo+1); }
function prevVideo(){ loadVideo(currentVideo-1); }
videoElement.onended = () => nextVideo();
loadVideo(0);

// Dark mode
document.getElementById("dark-toggle").onclick = () => {
  document.body.classList.toggle("dark");
};

// Scroll animation
const cards = document.querySelectorAll(".plant-card");
window.addEventListener("scroll", () => {
  cards.forEach(card=>{
    const pos = card.getBoundingClientRect().top;
    if(pos < window.innerHeight - 50) card.classList.add("show");
  });
});

// Smooth scroll
function scrollToSection(id){
  document.getElementById(id).scrollIntoView({behavior:"smooth"});
}

// Plant data from data.js
function showPlantInfo(plant){
  const info = document.getElementById("plantInfo");
  document.getElementById("plantName").innerText = plant.name;
  document.getElementById("plantImg").src = plant.image;
  document.getElementById("plantDesc").innerText = plant.details;
  document.getElementById("plantSource").innerText = "Nguồn: " + plant.source;

  const ctx = document.getElementById("plantChart").getContext("2d");
  if(window.plantChart) window.plantChart.destroy();
  window.plantChart = new Chart(ctx,{
    type:"bar",
    data:{
      labels:["Nhiệt độ","Độ ẩm","Ánh sáng","pH","Nước"],
      datasets:[{
        label: plant.name,
        data: plant.chart,
        backgroundColor:"#8BC34A"
      }]
    }
  });
  info.classList.remove("hidden");
}
