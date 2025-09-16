const data2 = [
  {
    name: "Lúa",
    scientificName: "Oryza sativa",
    origin: "Đông Nam Á (thuần hóa từ Ấn Độ, Trung Quốc):contentReference[oaicite:0]{index=0}",
    regions: "Đồng bằng sông Hồng, ĐBSCL, Bắc Trung Bộ (kể cả Nghệ An):contentReference[oaicite:1]{index=1}",
    conditions: {
      temperature: "20-35°C",
      light: "Cả ngày (ít nhất 6-8 giờ nắng)",
      pH: "5.5-7.5:contentReference[oaicite:2]{index=2}",
      humidity: "Cao (trung bình ~80%)"
    },
    nutrients: [
      { element: "Đạm (N)", amount: "100-120 kg/ha:contentReference[oaicite:3]{index=3}" },
      { element: "Lân (P₂O₅)", amount: "100-120 kg/ha:contentReference[oaicite:4]{index=4}" },
      { element: "Kali (K₂O)", amount: "30-60 kg/ha:contentReference[oaicite:5]{index=5}" },
      { element: "Silic (Si)", amount: "2 kg/ha:contentReference[oaicite:6]{index=6}" }
    ],
    plantingSeason: "Vụ Đông Xuân gieo tháng 11-12, thu tháng 4-5; Vụ Hè-Thu gieo tháng 5-6, thu tháng 8-9:contentReference[oaicite:7]{index=7}",
    harvestTime: "3-4 tháng sau gieo trồng",
    yield: "6-7 tấn/ha trung bình:contentReference[oaicite:8]{index=8} (tối đa ~7-8 t/ha)",
    image: "https://source.unsplash.com/1600x900/?rice-field"
  },
  {
    name: "Ngô",
    scientificName: "Zea mays",
    origin: "Trung Mỹ (thuần hóa ở Mexico):contentReference[oaicite:9]{index=9}",
    regions: "Trồng khắp miền (Trung du, Bắc bộ, ĐBSCL, Tây Nguyên):contentReference[oaicite:10]{index=10}",
    conditions: {
      temperature: "22-30°C (tối thiểu >10°C)",
      light: "Cả ngày (ưa nắng)",
      pH: "5.5-7.0",
      humidity: "Độ ẩm đất 40-60%"
    },
    nutrients: [
      { element: "Đạm (N)", amount: "80-120 kg/ha:contentReference[oaicite:11]{index=11}" },
      { element: "Lân (P₂O₅)", amount: "80 kg/ha:contentReference[oaicite:12]{index=12}" },
      { element: "Kali (K₂O)", amount: "80-100 kg/ha:contentReference[oaicite:13]{index=13}" }
    ],
    plantingSeason: "Miền Bắc & Bắc Trung: 3 vụ/năm (Xuân, Hè-Thu, Đông); Miền Nam/Tây Nguyên: 1 vụ/năm (mùa mưa):contentReference[oaicite:14]{index=14}",
    harvestTime: "3-4 tháng sau gieo trồng",
    yield: "4-6 tấn/ha (trung bình):contentReference[oaicite:15]{index=15}",
    image: "https://source.unsplash.com/1600x900/?cornfield"
  },
  {
    name: "Sắn (Khoai mì)",
    scientificName: "Manihot esculenta",
    origin: "Nam Mỹ (Amazon):contentReference[oaicite:16]{index=16}",
    regions: "Tây Nguyên, Bắc Trung, Đông Nam Bộ, Nam Trung Bộ",
    conditions: {
      temperature: "22-30°C",
      light: "Cả ngày (ưa sáng)",
      pH: "5.5-6.5 (chịu pH 4.5-7.5):contentReference[oaicite:17]{index=17}",
      humidity: "Độ ẩm đất ~60-70% (giai đoạn tích luỹ bột):contentReference[oaicite:18]{index=18}"
    },
    nutrients: [
      { element: "Đạm (N)", amount: "2.3 kg/tấn củ thu hoạch:contentReference[oaicite:19]{index=19}" },
      { element: "Lân (P₂O₅)", amount: "1.1 kg/tấn củ thu hoạch:contentReference[oaicite:20]{index=20}" },
      { element: "Kali (K₂O)", amount: "4.9 kg/tấn củ thu hoạch:contentReference[oaicite:21]{index=21}" }
    ],
    plantingSeason: "Miền Bắc trồng vụ Xuân (Th2-3) thu vụ Hè; Miền Nam trồng đầu và cuối mùa mưa:contentReference[oaicite:22]{index=22}",
    harvestTime: "6-10 tháng sau trồng (tùy giống)",
    yield: "15-20 tấn/ha (ưu tú)",
    image: "https://source.unsplash.com/1600x900/?cassava"
  },
  {
    name: "Khoai lang",
    scientificName: "Ipomoea batatas",
    origin: "Nam Mỹ (trung tâm đa dạng ĐNA):contentReference[oaicite:23]{index=23}",
    regions: "Trồng nhiều ở Bắc Bộ, Bắc Trung, Tây Nguyên",
    conditions: {
      temperature: "21-30°C (dưới 10°C cây nghỉ, trên 40°C kém phát triển):contentReference[oaicite:24]{index=24}",
      light: "8-10 giờ/ngày (ưa sáng)",
      pH: "4.5-7.5 (ưa đất cát pha nhiều mùn):contentReference[oaicite:25]{index=25}",
      humidity: "Độ ẩm đất 70-80%:contentReference[oaicite:26]{index=26}"
    },
    nutrients: [
      { element: "Đạm (N)", amount: "30-80 kg/ha (tuỳ đất):contentReference[oaicite:27]{index=27}" },
      { element: "Lân (P₂O₅)", amount: "40-80 kg/ha:contentReference[oaicite:28]{index=28}" },
      { element: "Kali (K₂O)", amount: "60-100 kg/ha:contentReference[oaicite:29]{index=29}" }
    ],
    plantingSeason: "Trồng chính vụ đông xuân (2-3) thu hè, vụ hè thu (5-6) thu thu đông:contentReference[oaicite:30]{index=30}",
    harvestTime: "4-5 tháng sau trồng",
    yield: "15-30 tấn/ha (tốt):contentReference[oaicite:31]{index=31}",
    image: "https://source.unsplash.com/1600x900/?sweet-potato"
  },
  {
    name: "Khoai tây",
    scientificName: "Solanum tuberosum",
    origin: "Thung lũng Andes (Nam Mỹ)",
    regions: "Các tỉnh Lào Cai, Sơn La, Đà Lạt (Lâm Đồng)",
    conditions: {
      temperature: "20-22°C (phát triển), 18-20°C (hình thành củ):contentReference[oaicite:32]{index=32}",
      light: "Trước 12-16 giờ/ngày (ưa mát, tránh nhiệt độ >30°C):contentReference[oaicite:33]{index=33}",
      pH: "5.5-7.0 (đất phù sa thịt pha cát, thoát nước tốt):contentReference[oaicite:34]{index=34}",
      humidity: "Giữ ẩm đều (giống cần nước nhưng không úng)"
    },
    nutrients: [
      { element: "Đạm (N)", amount: "120-150 kg/ha" },
      { element: "Lân (P₂O₅)", amount: "60-100 kg/ha" },
      { element: "Kali (K₂O)", amount: "150-200 kg/ha (cao nhất):contentReference[oaicite:35]{index=35}" }
    ],
    plantingSeason: "Miền Bắc: trồng tháng 10-11, thu tháng 1-2:contentReference[oaicite:36]{index=36}",
    harvestTime: "3-4 tháng sau trồng",
    yield: "15-30 tấn/ha (loại cao sản)",
    image: "https://source.unsplash.com/1600x900/?potato-field"
  },
  {
    name: "Cà chua",
    scientificName: "Solanum lycopersicum",
    origin: "Nam Mỹ (Andes):contentReference[oaicite:37]{index=37}",
    regions: "Lâm Đồng (Đà Lạt), Mộc Châu, Bắc bộ (Hải Phòng, Hưng Yên, Nghệ An...):contentReference[oaicite:38]{index=38}",
    conditions: {
      temperature: "21-24°C (ban ngày):contentReference[oaicite:39]{index=39}",
      light: "Cả ngày (≥2000-3000 lux):contentReference[oaicite:40]{index=40}",
      pH: "5.5-7.5 (ưu tiên 6.0-6.5):contentReference[oaicite:41]{index=41}",
      humidity: "Trung bình (đủ ẩm nhưng tránh úng nước)"
    },
    nutrients: [
      { element: "Đạm (N)", amount: "100-150 kg/ha" },
      { element: "Lân (P₂O₅)", amount: "80-100 kg/ha" },
      { element: "Kali (K₂O)", amount: "150-200 kg/ha (cao nhất)" }
    ],
    plantingSeason: "Vụ Đông (gieo 8-10, thu 12-1):contentReference[oaicite:42]{index=42}; vụ Xuân (gieo 2-3, thu 6-7)",
    harvestTime: "2-3 tháng sau gieo",
    yield: "15-20 tấn/ha (vụ Xuân) hoặc 10-15 tấn/ha (vụ Đông)",
    image: "https://source.unsplash.com/1600x900/?tomato"
  },
  {
    name: "Ớt",
    scientificName: "Capsicum frutescens",
    origin: "Châu Mỹ (thuần hóa ở Trung/Nam Mỹ)",
    regions: "Trồng khắp Việt Nam, nhiều ở Bắc và Trung",
    conditions: {
      temperature: "18-28°C (lý tưởng):contentReference[oaicite:43]{index=43}",
      light: "Cả ngày (≥8-9 giờ nắng):contentReference[oaicite:44]{index=44}",
      pH: "5.5-6.5 (thích hợp):contentReference[oaicite:45]{index=45}",
      humidity: "Độ ẩm đất 70-80% (đảm bảo):contentReference[oaicite:46]{index=46}"
    },
    nutrients: [
      { element: "Đạm (N)", amount: "30-60 kg/ha" },
      { element: "Lân (P₂O₅)", amount: "30-50 kg/ha" },
      { element: "Kali (K₂O)", amount: "60-100 kg/ha (cao nhất)" }
    ],
    plantingSeason: "Hầu như quanh năm: gieo giống vụ Xuân-Hè (2-4), Vụ Thu (8-9)",
    harvestTime: "3-4 tháng sau gieo",
    yield: "15-25 tấn/ha (ớt cay) hoặc 20-30 tấn/ha (ớt to):contentReference[oaicite:47]{index=47}",
    image: "https://source.unsplash.com/1600x900/?chili"
  },
  {
    name: "Dưa hấu",
    scientificName: "Citrullus lanatus",
    origin: "Châu Phi (nhiệt đới):contentReference[oaicite:48]{index=48}",
    regions: "Bình Thuận, Long An, Tiền Giang, Nghệ An",
    conditions: {
      temperature: "25-35°C (ấm áp)",
      light: "Cả ngày (ưa sáng)",
      pH: "6.0-7.5",
      humidity: "Đất ẩm đều (tránh ngập úng)"
    },
    nutrients: [
      { element: "Đạm (N)", amount: "60-80 kg/ha" },
      { element: "Lân (P₂O₅)", amount: "50-80 kg/ha" },
      { element: "Kali (K₂O)", amount: "100-150 kg/ha" }
    ],
    plantingSeason: "Trồng mùa Xuân (đầu năm) và giữa Hè, thu hoạch vụ Hè",
    harvestTime: "70-90 ngày sau gieo",
    yield: "30-50 tấn/ha (tuỳ giống và điều kiện)",
    image: "https://source.unsplash.com/1600x900/?watermelon"
  }
];
export default data2;
