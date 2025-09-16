/* data.js
   Mảng plantData chứa 50 cây. Mỗi phần tử:
   {
     id, name, scientificName, origin, region, season, yield, uses,
     longDescription, summary: {k:v,...},
     conditionChartLabels: [...], conditionChartData: [...],
     nutritionChartLabels: [...], nutritionChartData: [...],
     images: [url,...]
   }
*/

const plantData = [
  /* 1 */ {
    id:1,
    name:"Lúa",
    scientificName:"Oryza sativa",
    origin:"Đông Nam Á",
    region:"Đồng bằng sông Hồng, ĐBSCL, Bắc Trung Bộ (kể cả Nghệ An)",
    season:"Vụ Đông Xuân, Vụ Hè Thu",
    yield:"3–6 tấn/ha (tùy giống và kỹ thuật)",
    uses:"Lương thực chủ lực, rơm rạ làm vật liệu, thức ăn gia súc",
    images:["https://source.unsplash.com/600x400/?rice,field"],
    longDescription:
`Lúa là cây lương thực chủ yếu ở Việt Nam... (mô tả đầy đủ kỹ thuật canh tác, giống, lịch trình bón phân, phòng trừ sâu bệnh, thu hoạch, xử lý sau thu hoạch). 
- Thời vụ chi tiết: ... 
- Kỹ thuật gieo cấy, mật độ, bón phân theo giai đoạn... 
- Các bệnh thường gặp và biện pháp xử lý: ...`.repeat(4),
    summary:{
      "Nhiệt độ tối ưu":"25–35°C",
      "Độ ẩm":"Cao (ruộng ngập nước)",
      "pH đất":"5.5–7.0",
      "Tưới":"Ngập cục bộ theo giai đoạn"
    },
    conditionChartLabels:["Nhiệt độ (°C)","Độ ẩm (%)","Ánh sáng (lux)","pH đất"],
    conditionChartData:[28,85,18000,6.2],
    nutritionChartLabels:["Đạm (N)","Lân (P)","Kali (K)"],
    nutritionChartData:[150,80,80]
  },

  /* 2 */ {
    id:2,
    name:"Xoài",
    scientificName:"Mangifera indica",
    origin:"Nam Á",
    region:"Bắc Trung Bộ, Nam Bộ (vùng chuyên canh)",
    season:"Chín rộ vào tháng 4-6 (tùy giống)",
    yield:"100–300 kg/cây/năm (cây trưởng thành)",
    uses:"Ăn tươi, chế biến, xuất khẩu",
    images:["https://source.unsplash.com/600x400/?mango,tree"],
    longDescription:
`Xoài là cây ăn quả ... (mô tả chi tiết: chọn giống, xử lý đất, cắt tỉa, bón phân theo chu kỳ, phòng trừ sâu bệnh hại hoa quả, thu hoạch và bảo quản).`.repeat(4),
    summary:{"Nhiệt độ":"24–32°C","Độ ẩm":"Cao","pH đất":"5.5–7.5"},
    conditionChartLabels:["Nhiệt độ","Độ ẩm","Ánh sáng","pH"],
    conditionChartData:[26,80,20000,6.5],
    nutritionChartLabels:["N","P","K"],
    nutritionChartData:[80,40,120]
  },

  /* 3 */ {
    id:3,
    name:"Ngô",
    scientificName:"Zea mays",
    origin:"Trung Mỹ",
    region:"Vùng miền núi, đồng bằng",
    season:"Xuân, Hè",
    yield:"5–8 t/ha",
    uses:"Thực phẩm, thức ăn chăn nuôi, công nghiệp",
    images:["https://source.unsplash.com/600x400/?corn,field"],
    longDescription:
`Ngô cần kỹ thuật chăm sóc ... (chi tiết: mật độ gieo, bón thúc, tưới, thu hoạch, phòng bệnh).`.repeat(4),
    summary:{"Nhiệt độ":"20–30°C","pH":"5.5–7.0","Ánh sáng":"Cần nhiều nắng"},
    conditionChartLabels:["Nhiệt độ","Độ ẩm","Ánh sáng","pH"],
    conditionChartData:[24,60,22000,6.5],
    nutritionChartLabels:["N","P","K"],
    nutritionChartData:[180,85,200]
  },

  /* 4 */ {
    id:4,
    name:"Chuối",
    scientificName:"Musa spp.",
    origin:"Đông Nam Á",
    region:"ĐBSCL, Bắc Trung Bộ",
    season:"Trồng quanh năm, thu 9-12 tháng",
    yield:"30–60 t/ha",
    uses:"Ăn tươi, chế biến, công nghiệp",
    images:["https://source.unsplash.com/600x400/?banana,plantation"],
    longDescription:
`Chuối cần môi trường ấm ẩm... (kỹ thuật trồng, mật độ, dinh dưỡng, tưới tiêu, cháy lá, xử lý sau thu hoạch).`.repeat(4),
    summary:{"Nhiệt độ":"26–30°C","Độ ẩm":"Cao","pH":"5.5–7.0"},
    conditionChartLabels:["Nhiệt độ","Độ ẩm","Ánh sáng","pH"],
    conditionChartData:[28,85,18000,6.5],
    nutritionChartLabels:["N","P","K"],
    nutritionChartData:[160,150,400]
  },

  /* 5 */ {
    id:5,
    name:"Sắn (Cassava)",
    scientificName:"Manihot esculenta",
    origin:"Nam Mỹ",
    region:"Tây Nguyên, Bắc Trung Bộ",
    season:"Thu hoạch 8–12 tháng",
    yield:"10–25 t/ha",
    uses:"Tinh bột, thực phẩm, thức ăn chăn nuôi",
    images:["https://source.unsplash.com/600x400/?cassava,field"],
    longDescription:
`Sắn là cây chịu hạn... (kỹ thuật chọn giống, canh tác, bón phân, phòng bệnh, thu hoạch và chế biến).`.repeat(4),
    summary:{"Nhiệt độ":"25–30°C","Độ ẩm":"Chịu hạn","pH":"5.5–6.5"},
    conditionChartLabels:["Nhiệt độ","Độ ẩm","Ánh sáng","pH"],
    conditionChartData:[27,60,17000,6.0],
    nutritionChartLabels:["N","P","K"],
    nutritionChartData:[80,200,160]
  },

  /* 6 */ {
    id:6,
    name:"Khoai lang",
    scientificName:"Ipomoea batatas",
    origin:"Nam Mỹ",
    region:"Bắc Trung, Bắc Bộ",
    season:"2 vụ/năm",
    yield:"15–30 t/ha",
    uses:"Thực phẩm, công nghiệp",
    images:["https://source.unsplash.com/600x400/?sweet-potato,field"],
    longDescription:
`Khoai lang yêu cầu đất nhẹ thoát nước... (bón phân, chăm sóc, thu hoạch, bảo quản củ).`.repeat(4),
    summary:{"Nhiệt độ":"21–30°C","Độ ẩm":"70–80%","pH":"4.5–7.5"},
    conditionChartLabels:["Nhiệt độ","Độ ẩm","Ánh sáng"],
    conditionChartData:[26,75,15000],
    nutritionChartLabels:["N","P","K"],
    nutritionChartData:[60,60,80]
  },

  /* 7 */ {
    id:7,
    name:"Cà phê",
    scientificName:"Coffea spp.",
    origin:"Châu Phi",
    region:"Tây Nguyên",
    season:"Vụ chính tùy giống",
    yield:"1–3 t/ha (hạt nhân)",
    uses:"Cà phê tiêu thụ trong nước và xuất khẩu",
    images:["https://source.unsplash.com/600x400/?coffee,plantation"],
    longDescription:
`Cà phê: đất, bóng mát, bón vôi, phân vi lượng, lịch thu hoạch, chế biến sơ chế ướt/khô...`.repeat(4),
    summary:{"Nhiệt độ":"18–24°C","Độ ẩm":"60–80%","pH":"5.0–6.0"},
    conditionChartLabels:["Nhiệt độ","Độ ẩm","Ánh sáng"],
    conditionChartData:[22,70,12000],
    nutritionChartLabels:["N","P","K"],
    nutritionChartData:[90,60,160]
  },

  /* 8 */ {
    id:8,
    name:"Cà chua",
    scientificName:"Solanum lycopersicum",
    origin:"Nam Mỹ",
    region:"Đà Lạt, Nghệ An, Bắc Trung Bộ",
    season:"Vụ Xuân, Vụ Đông",
    yield:"15–30 t/ha",
    uses:"Thực phẩm tươi, chế biến",
    images:["https://source.unsplash.com/600x400/?tomato,plant"],
    longDescription:
`Cà chua: kỹ thuật gieo, trồng, tưới nhỏ giọt, bón thúc, phòng trừ sâu bệnh, thu hoạch theo trái hoặc cắt toàn ruộng...`.repeat(4),
    summary:{"Nhiệt độ":"20–26°C","pH":"5.5–7.0","Ánh sáng":"Ưa sáng"},
    conditionChartLabels:["Nhiệt độ","Độ ẩm","Ánh sáng","pH"],
    conditionChartData:[24,65,18000,6.2],
    nutritionChartLabels:["N","P","K"],
    nutritionChartData:[120,90,180]
  },

  /* 9 */ {
    id:9,
    name:"Đu đủ",
    scientificName:"Carica papaya",
    origin:"Trung Mỹ",
    region:"Nhiều vùng nhiệt đới",
    season:"Trồng quanh năm",
    yield:"20–40 t/ha",
    uses:"Ăn tươi, chế biến, y học dân gian",
    images:["https://source.unsplash.com/600x400/?papaya,tree"],
    longDescription:
`Đu đủ: chọn giống siêu năng suất, phòng bệnh hại rễ, mật độ trồng, bón phân cân đối...`.repeat(4),
    summary:{"Nhiệt độ":"24–30°C","Độ ẩm":"Cao","pH":"5.5–6.5"},
    conditionChartLabels:["Nhiệt độ","Độ ẩm","Ánh sáng"],
    conditionChartData:[26,78,17000],
    nutritionChartLabels:["N","P","K"],
    nutritionChartData:[120,70,160]
  },

  /* 10 */ {
    id:10,
    name:"Khoai tây",
    scientificName:"Solanum tuberosum",
    origin:"Andes (Nam Mỹ)",
    region:"Miền núi, cao nguyên",
    season:"Thuộc vụ lạnh",
    yield:"15–30 t/ha",
    uses:"Thực phẩm, công nghiệp chế biến",
    images:["https://source.unsplash.com/600x400/?potato,field"],
    longDescription:
`Khoai tây: yêu cầu tránh nóng, đất tơi xốp, bón lót, bón thúc khi trồng, phòng bệnh sương mai, thối củ...`.repeat(4),
    summary:{"Nhiệt độ":"15–22°C","pH":"5.5–7.0","Ánh sáng":"Ưa mát"},
    conditionChartLabels:["Nhiệt độ","Độ ẩm","Ánh sáng"],
    conditionChartData:[18,70,12000],
    nutritionChartLabels:["N","P","K"],
    nutritionChartData:[140,80,180]
  },

  /* 11 */ {
    id:11,
    name:"Ớt",
    scientificName:"Capsicum spp.",
    origin:"Châu Mỹ",
    region:"Toàn quốc",
    season:"Trồng quanh năm",
    yield:"15–25 t/ha",
    uses:"Gia vị, chế biến, xuất khẩu",
    images:["https://source.unsplash.com/600x400/?chili,pepper"],
    longDescription:
`Ớt: kỹ thuật trồng, xử lý bệnh hại thân lá và quả, thu hái phân đợt...`.repeat(4),
    summary:{"Nhiệt độ":"18–28°C","pH":"5.5–6.5"},
    conditionChartLabels:["Nhiệt độ","Độ ẩm","Ánh sáng"],
    conditionChartData:[24,68,20000],
    nutritionChartLabels:["N","P","K"],
    nutritionChartData:[40,35,90]
  },

  /* 12 */ {
    id:12,
    name:"Dưa hấu",
    scientificName:"Citrullus lanatus",
    origin:"Châu Phi",
    region:"Bình Thuận, Nam Bộ, Nghệ An",
    season:"Mùa Hè",
    yield:"30–50 t/ha",
    uses:"Ăn tươi, chế biến nước giải khát",
    images:["https://source.unsplash.com/600x400/?watermelon,field"],
    longDescription:
`Dưa hấu: chọn giống vỏ dày, vườn tách giàn, bón phân, tưới theo nhu cầu quả, phòng bệnh sương mai...`.repeat(4),
    summary:{"Nhiệt độ":"25–35°C","Độ ẩm":"Đất ẩm đều","pH":"6.0–7.5"},
    conditionChartLabels:["Nhiệt độ","Độ ẩm","Ánh sáng"],
    conditionChartData:[30,60,24000],
    nutritionChartLabels:["N","P","K"],
    nutritionChartData:[70,60,140]
  },

  /* Placeholder items 13..50 (tổng 38 mục) - bạn có thể chỉnh chi tiết sau */
  /* To save space, những mục này là ngắn gọn, cấu trúc giống nhau */
];

for(let i=13;i<=50;i++){
  plantData.push({
    id:i,
    name:`Cây mẫu ${i}`,
    scientificName:`Specimenus sample${i}`,
    origin:"Nghệ An / Việt Nam",
    region:"Nghệ An và các vùng lân cận",
    season:"Tùy giống",
    yield:"Tùy kỹ thuật",
    uses:"Thực phẩm / công nghiệp",
    images:[`https://source.unsplash.com/600x400/?plant,agriculture,${i}`],
    longDescription:`Mô tả chi tiết về Cây mẫu ${i}. Bạn có thể thay thế bằng nội dung chuyên sâu: lịch gieo trồng, mật độ, kỹ thuật chăm sóc, bón phân, phòng trừ sâu bệnh, thu hoạch và bảo quản. `.repeat(8),
    summary:{"Nhiệt độ tối ưu":"20-30°C","Độ ẩm":"Tùy giống","pH":"5.5-7.0"},
    conditionChartLabels:["Nhiệt độ","Độ ẩm","Ánh sáng"],
    conditionChartData:[24,65,15000],
    nutritionChartLabels:["N","P","K"],
    nutritionChartData:[80,40,60]
  });
}

/* plantData is global */
