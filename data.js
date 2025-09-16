// Dữ liệu cây trồng (đã gộp từ data1.js, data2.js, data3.js)
const plantData = [
  {
    id: 1,
    name: "Cà chua",
    scientificName: "Solanum lycopersicum",
    origin: "Nam Mỹ",
    // Điều kiện sinh trưởng (dữ liệu để vẽ biểu đồ)
    conditions: [22, 70, 6.0, 9.0],  // [Nhiệt độ (°C), Độ ẩm (%), pH đất, Ánh sáng (độ chiếu sáng)]
    // Dinh dưỡng (hàm lượng phần trăm N-P-K cơ bản)
    nutrients: [10, 5, 5], // [Đạm N, Lân P, Kali K]
    season: "Mùa xuân – Hè",
    yield: "80 tấn/ha",
    uses: "Ăn sống, làm nước ép, chế biến thực phẩm.",
    images: [
      // URL ảnh minh họa
      "https://images.pexels.com/photos/2718416/pexels-photo-2718416.jpeg",
      "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg"
    ]
  },
  {
    id: 2,
    name: "Lúa",
    scientificName: "Oryza sativa",
    origin: "Châu Á",
    conditions: [26, 80, 5.5, 8.0],  
    nutrients: [8, 4, 4],
    season: "Mùa xuân – Hè",
    yield: "60 tạ/ha",
    uses: "Lúa gạo làm lương thực chính, sản xuất thực phẩm.",
    images: [
      "https://images.pexels.com/photos/33810107/pexels-photo-33810107.jpeg",
      "https://images.pexels.com/photos/96715/pexels-photo-96715.jpeg"
    ]
  },
  {
    id: 3,
    name: "Ngô",
    scientificName: "Zea mays",
    origin: "Châu Mỹ",
    conditions: [25, 65, 6.5, 7.5],  
    nutrients: [7, 3, 6],
    season: "Mùa hạ – Thu",
    yield: "100 tạ/ha",
    uses: "Thực phẩm, thức ăn chăn nuôi, công nghiệp.",
    images: [
      "https://images.pexels.com/photos/96715/pexels-photo-96715.jpeg",
      "https://images.pexels.com/photos/7539901/pexels-photo-7539901.jpeg"
    ]
  }
];
