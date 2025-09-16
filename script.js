document.addEventListener('DOMContentLoaded', () => {
  // Background video
  const video = document.getElementById('bgVideo');
  const videos = [
    'video1.mp4',
    'video2.mp4',
    'video3.mp4'
  ];
  let vidIndex = 0;
  if(video) {
    video.src = videos[0];
    setInterval(() => {
      vidIndex = (vidIndex + 1) % videos.length;
      video.src = videos[vidIndex];
      video.play();
    }, 10000);
  }

  // Dark mode toggle
  const toggle = document.getElementById('darkModeToggle');
  const currentMode = localStorage.getItem('darkMode');
  if (currentMode === 'enabled') {
    document.body.classList.add('dark-mode');
  }
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.setItem('darkMode', 'disabled');
    }
  });

  // Combine plant data
  const plantData = [...data1, ...data2, ...data3];

  // Render plant cards
  const grid = document.getElementById('plantGrid');
  plantData.forEach((plant, index) => {
    const card = document.createElement('div');
    card.className = 'plant-card';
    card.innerHTML = `
      <img src="https://source.unsplash.com/featured/?${plant.imgQuery}" alt="${plant.name}" loading="lazy">
      <h3>${plant.name}</h3>
      <p><em>${plant.scientific}</em></p>
    `;
    card.addEventListener('click', () => openModal(index));
    grid.appendChild(card);
  });

  // Search functionality
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    document.querySelectorAll('.plant-card').forEach((card, idx) => {
      const name = plantData[idx].name.toLowerCase();
      card.style.display = name.includes(filter) ? 'block' : 'none';
    });
  });

  // Modal dialog for details
  const modal = document.getElementById('detailModal');
  const closeBtn = document.querySelector('.modal .close');
  closeBtn.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Chart variables
  let condChart = null;
  let nutChart = null;

  // Function to open and populate modal
  function openModal(index) {
    const plant = plantData[index];
    document.getElementById('modalName').innerText = plant.name;
    document.getElementById('modalSciName').innerText = plant.scientific;
    document.getElementById('modalImg').src = `https://source.unsplash.com/featured/?${plant.imgQuery}`;
    document.getElementById('modalOrigin').innerText = plant.origin;
    document.getElementById('modalRegion').innerText = plant.region;
    document.getElementById('modalMainNutrients').innerText = plant.mainNutrients;
    document.getElementById('modalYield').innerText = plant.yield;
    document.getElementById('modalSeason').innerText = plant.season;
    document.getElementById('modalCare').innerText = plant.care;
    document.getElementById('modalSource').innerText = plant.source;

    // Conditions chart
    const ctx1 = document.getElementById('chartConditions').getContext('2d');
    if (condChart) { condChart.destroy(); }
    condChart = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['Nhiệt độ (°C)','Độ ẩm (%)','Độ sáng','Độ pH'],
        datasets: [{
          label: 'Điều kiện sinh trưởng',
          data: [
            plant.conditions.temperature,
            plant.conditions.humidity,
            plant.conditions.light,
            plant.conditions.ph
          ],
          backgroundColor: ['#e76f51','#e76f51','#e76f51','#e76f51']
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Nutrients chart
    const ctx2 = document.getElementById('chartNutrients').getContext('2d');
    if (nutChart) { nutChart.destroy(); }
    nutChart = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: ['Đạm (N)','Lân (P)','Kali (K)'],
        datasets: [{
          label: 'Nhu cầu dưỡng chất',
          data: [
            plant.nutrients.N,
            plant.nutrients.P,
            plant.nutrients.K
          ],
          backgroundColor: ['#2a9d8f','#2a9d8f','#2a9d8f']
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    modal.style.display = 'flex';
  }

  // Chatbot toggle
  const chatToggle = document.getElementById('chatToggle');
  const chatWindow = document.getElementById('chatWindow');
  const closeChat = document.querySelector('.closeChat');
  const chatBody = document.getElementById('chatBody');
  const chatInput = document.getElementById('chatInput');
  const sendChat = document.getElementById('sendChat');

  chatToggle.addEventListener('click', () => {
    chatWindow.classList.toggle('open');
  });
  closeChat.addEventListener('click', () => {
    chatWindow.classList.remove('open');
  });

  sendChat.addEventListener('click', () => {
    const msg = chatInput.value.trim();
    if (!msg) return;
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    userMsg.innerHTML = `<strong>Tôi:</strong> ${msg}`;
    chatBody.appendChild(userMsg);
    chatInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;
    // Simulate AI response
    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'chat-message bot';
      let response = '';
      if (msg.toLowerCase().includes('xin chào') || msg.toLowerCase().includes('hello')) {
        response = 'Xin chào! Tôi có thể giúp gì cho bạn?';
      } else {
        response = 'Xin lỗi, tôi chưa đủ thông minh để trả lời.';
      }
      botMsg.innerHTML = `<strong>AI:</strong> ${response}`;
      chatBody.appendChild(botMsg);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 500);
  });
});
