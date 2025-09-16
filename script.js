const videos = [
  'videos/nen1.mp4',
  'videos/nen2.mp4',
  'videos/nen3.mp4',
  'videos/nen4.mp4',
  'videos/nen5.mp4'
];

let currentVideoIndex = 0;
const bgVideo = document.getElementById('bgVideo');
const prevVideoBtn = document.getElementById('prevVideo');
const nextVideoBtn = document.getElementById('nextVideo');

function loadVideo(index) {
  bgVideo.src = videos[index];
  bgVideo.play();
}

loadVideo(currentVideoIndex);

prevVideoBtn.addEventListener('click', () => {
  currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
  loadVideo(currentVideoIndex);
});

nextVideoBtn.addEventListener('click', () => {
  currentVideoIndex = (currentVideoIndex + 1) % videos.length;
  loadVideo(currentVideoIndex);
});

bgVideo.addEventListener('ended', () => {
  currentVideoIndex = (currentVideoIndex + 1) % videos.length;
  loadVideo(currentVideoIndex);
});

// Explore button scroll
document.getElementById('exploreBtn').addEventListener('click', () => {
  document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
});

// Dark mode toggle
const darkToggle = document.getElementById('darkModeToggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
});

// Render plant cards
const plantGrid = document.getElementById('plantGrid');
plantData.forEach((plant, idx) => {
  const card = document.createElement('div');
  card.className = 'plant-card glass';
  card.innerHTML = `<h4>${plant.name}</h4><p><i>${plant.scientific}</i></p>`;
  card.addEventListener('click', () => openModal(plant));
  plantGrid.appendChild(card);
});

// Modal
const modal = document.getElementById('plantModal');
const closeBtn = modal.querySelector('.close');

closeBtn.onclick = () => { modal.style.display = 'none'; }

function openModal(plant) {
  modal.style.display = 'block';
  document.getElementById('modalTitle').textContent = `${plant.name} (${plant.scientific})`;
  document.getElementById('modalDesc').textContent = plant.description;

  // Table summary
  const table = document.getElementById('plantTable');
  table.innerHTML = plant.summary.map(row => `<tr><td>${row[0]}</td><td>${row[1]}</td></tr>`).join('');

  // Chart conditions
  new Chart(document.getElementById('conditionChart'), {
    type: 'bar',
    data: {
      labels: Object.keys(plant.conditions),
      datasets: [{
        label: 'Điều kiện sinh trưởng',
        data: Object.values(plant.conditions),
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }]
    }
  });

  // Chart nutrition
  new Chart(document.getElementById('nutritionChart'), {
    type: 'bar',
    data: {
      labels: Object.keys(plant.nutrition),
      datasets: [{
        label: 'Nhu cầu dinh dưỡng',
        data: Object.values(plant.nutrition),
        backgroundColor: 'rgba(255, 159, 64, 0.6)'
      }]
    }
  });
}
