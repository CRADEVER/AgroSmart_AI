// Danh sách các video nền (tùy chỉnh theo dự án)
var videos = [
  "videos/video1.mp4",
  "videos/video2.mp4",
  "videos/video3.mp4"
];
var currentVideoIndex = 0;

// Chuyển sang video kế tiếp
function nextVideo() {
  // Cập nhật chỉ số video, vòng quanh nếu cuối danh sách
  currentVideoIndex = (currentVideoIndex + 1) % videos.length;
  var videoElem = document.getElementById("backgroundVideo");
  videoElem.src = videos[currentVideoIndex];    // Cập nhật nguồn video mới
  videoElem.load();                              // Tải video mới:contentReference[oaicite:7]{index=7}
  videoElem.play();                              // Bắt đầu phát:contentReference[oaicite:8]{index=8}
}

// Chuyển sang video trước đó
function prevVideo() {
  currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
  var videoElem = document.getElementById("backgroundVideo");
  videoElem.src = videos[currentVideoIndex];
  videoElem.load();
  videoElem.play();
}

// Bật tắt chế độ toàn màn hình cho popup
document.getElementById("toggleFullscreenBtn").addEventListener("click", function() {
  var popup = document.getElementById("popup");
  popup.classList.toggle("fullscreen");
});

// (Tuỳ chọn) Đóng popup khi nhấn nút Đóng
document.getElementById("closePopupBtn").addEventListener("click", function() {
  document.getElementById("popup").style.display = "none";
});
