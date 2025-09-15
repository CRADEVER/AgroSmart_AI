// data.js — AgroSmart AI library (mẫu 12 mục chi tiết + skeleton 88 mục)
// IMAGE SOURCING: use imgQuery to build unsplash url: `https://source.unsplash.com/800x600/?${encodeURIComponent(imgQuery)}`
const plants = [

/* ===================== 1. LÚA (Rice) — A4 chi tiết ===================== */
{
  id: "lua",
  name: "Lúa (Oryza sativa)",
  imgQuery: "rice paddy rice plant",
  tags: ["Lương thực","Ruộng nước"],
  origin: "Châu Á; phổ biến toàn tỉnh Nghệ An",
  regions: ["Thanh Chương","Anh Sơn","Yên Thành","Quỳnh Lưu"],
  climate: {
    tempOptimal: [25, 30],          // °C (tối ưu)
    humidityOptimal: [70, 85],      // % (độ ẩm không khí/đất tham khảo)
    pHOptimal: [5.5, 6.5],
    lightHours: 12
  },
  water: "Ngập nước điều chỉnh theo giai đoạn: giữ tầng nước nông trong giai đoạn mạ, tăng/giảm tùy giai đoạn; tránh khô hạn giai đoạn đẻ nhánh và trỗ.",
  nutrition_profile: { N: 100, P: 50, K: 60, Ca: 20, Mg: 10 }, // kg/ha (tham khảo vùng canh tác)
  planting: {
    season: "2 vụ chính (vụ xuân, vụ hè-thu); một số vùng có 3 vụ.",
    method: "Cấy mạ hoặc gieo thẳng; xử lý mạ, quản lý cỏ dại; bón lót + phân thúc theo giai đoạn (đẻ nhánh, trước trỗ).",
    soil: "Đất phù sa, giữ nước tốt; pH nhẹ axit đến trung tính."
  },
  harvest: "90–120 ngày (tùy giống và mùa).",
  yieldAvg: "4.5–6 tấn/ha (mục tiêu thâm canh)",

  pests: ["Rầy nâu, đạo ôn, bạc lá"],

  notes: `Điểm mấu chốt: quản lý nước (thủy lợi) + cân đối phân N để tránh rối loạn ra hoa. Với điều kiện Nghệ An, tập trung vào giống chịu hạn và kỹ thuật xử lý mạ để giảm tỷ lệ lép hạt.`,

  practical: `Cách chăm (ngắn gọn, số bước):
  1) Chuẩn bị mạ: ngâm xử lý giống, làm mạ dày 25-30 ngày.
  2) Bón lót: Phân hữu cơ + 30-40% N; bón thúc đợt 1 khi đẻ nhánh (30-40% N), đợt 2 trước trỗ (30-40% N).
  3) Quản lý nước: giữ tầng nước 2-5 cm trong giai đoạn sinh trưởng chính; rút nước trước thu hái tùy giống.
  4) Phòng bệnh: quan sát rầy từ giai đoạn gieo/cấy; xử lý sinh học hoặc hóa học theo hướng dẫn.`,

  sources: ["FAO - Rice in Vietnam, Rice fact sheet", "Báo cáo Bộ NN&PTNT vùng"],

  // small dataset numbers for charts (used by frontend)
  chart: { temp:28, humidity:75, pH:6.0, light:12 },
  nutrientsForChart: { N:100, P:50, K:60 }
},

/* ===================== 2. NGÔ (Maize) — A4 chi tiết ===================== */
{
  id: "ngo",
  name: "Ngô (Zea mays)",
  imgQuery: "corn field corn crop",
  tags: ["Lương thực","Ngô công nghiệp"],
  origin: "Đồng bằng và trung du; trồng khắp tỉnh",
  regions: ["Thanh Chương","Tân Kỳ","Quỳnh Lưu"],
  climate: {
    tempOptimal: [22, 28],
    humidityOptimal: [60, 75],
    pHOptimal: [5.8, 6.8],
    lightHours: 12
  },
  water: "Đòi hỏi đủ ẩm, đặc biệt giai đoạn đóng bột và trổ; không chịu úng lâu.",
  nutrition_profile: { N: 150, P: 60, K: 80, Ca: 15, Mg: 10 }, // kg/ha tham khảo
  planting: {
    season: "Thường gieo 1–2 vụ, vụ chính phụ thuộc lịch nông vụ địa phương",
    method: "Gieo hàng, mật độ tùy giống (45-60cm giữa hàng)",
    soil: "Đất tơi xốp, thoát nước tốt"
  },
  harvest: "90–110 ngày (hạt ăn/ giống ngắn ngày); trồng lấy thân lâu hơn nếu làm ngô sinh khối.",
  yieldAvg: "3–7 tấn hạt/ha (tùy giống & kỹ thuật)",

  pests: ["Sâu ngô, rệp muội"],

  notes: `Ngô cần lượng N cao; bón phân cân đối và tưới nước giai đoạn trỗ giúp tăng tỷ lệ hạt đầy.`,

  practical: `Cách chăm:
  1) Sử dụng giống ngắn ngày cho vùng có 2 vụ.
  2) Bón lót: phân hữu cơ + P; bón N chia 2 lần (sau nảy mầm và trước trỗ).
  3) Tưới duy trì ẩm giai đoạn quan trọng, phòng sâu bằng biện pháp IPM.`,

  sources: ["Nghiên cứu ngô Việt Nam, FAO", "Báo cáo địa phương"],

  chart: { temp:26, humidity:70, pH:6.5, light:12 },
  nutrientsForChart: { N:150, P:60, K:80 }
},

/* ===================== 3. CÀ CHUA — A4 chi tiết ===================== */
{
  id: "cachua",
  name: "Cà chua (Solanum lycopersicum)",
  imgQuery: "tomato plant ripe tomatoes",
  tags: ["Rau màu","Trái ăn"],
  origin: "Vườn, trồng phổ biến quanh năm; Nghệ An có vùng rau màu quanh đô thị",
  regions: ["Tương Dương","Vinh","Thanh Chương"],
  climate: {
    tempOptimal: [18, 25],
    humidityOptimal: [60, 75],
    pHOptimal: [6.0, 7.0],
    lightHours: 8
  },
  water: "Tưới đều, tránh úng; tăng nước giai đoạn đậu trái.",
  nutrition_profile: { N: 80, P: 40, K: 80, Ca: 20, Mg: 8 },
  planting: {
    season: "Ươm cây con, trồng luống; trồng vụ mát/ấm tùy vùng",
    method: "Ươm khay, trồng luống, phủ bạt nếu cần",
    soil: "Sandy loam giàu mùn, thoát nước"
  },
  harvest: "60–90 ngày sau trồng (tùy giống)",
  yieldAvg: "20–60 tấn/ha (tùy hệ nhà màng/ruộng trời)",

  pests: ["Bọ trĩ, sùng, nấm mốc (sương mai)"],

  notes: `Cần Ca để chống nứt trái; bón vi lượng và cân đối K để tăng chất lượng quả.`,

  practical: `Cách chăm:
  1) Sử dụng đất giàu hữu cơ, bón lót N-P-K theo nhu cầu.
  2) Tưới nhỏ giọt/ tưới thấm để giảm nấm.
  3) Bó cuống, tỉa nhánh cho năng suất thương phẩm.`,

  sources: ["FAO - Tomato crop info", "Hướng dẫn kỹ thuật trồng rau địa phương"],

  chart: { temp:23, humidity:70, pH:6.5, light:9 },
  nutrientsForChart: { N:80, P:40, K:80 }
},

/* ===================== 4. CAM (Orange/Citrus) — A4 chi tiết ===================== */
{
  id: "cam_quyt",
  name: "Cam/Quýt (Citrus spp.)",
  imgQuery: "orange tree citrus orchard",
  tags: ["Cây ăn quả","Cây công nghiệp nhỏ"],
  origin: "Vườn cây ăn quả (vùng đồi & trung du)",
  regions: ["Quỳnh Lưu","Nghi Lộc","Đô Lương"],
  climate: {
    tempOptimal: [20, 28],
    humidityOptimal: [60, 80],
    pHOptimal: [5.5, 6.8],
    lightHours: 10
  },
  water: "Đòi hỏi tưới đều; không chịu úng gốc lâu; nước cho trái quan trọng giai đoạn phát triển trái.",
  nutrition_profile: { N: 120, P: 60, K: 120, Ca: 60, Mg: 15 },
  planting: {
    season: "Trồng cây ghép, chăm quanh năm",
    method: "Ghép trên gốc đảm bảo giống sạch bệnh",
    soil: "Sandy loam, thoát nước tốt"
  },
  harvest: "3–4 năm cho năng suất thương phẩm; thu hoạch theo vụ quả",
  yieldAvg: "5–15 tấn/ha (vùng kinh tế khác nhau)",

  pests: ["Sâu đục trái, rệp, nấm hại rễ"],

  notes: `Citrus nhạy với pH quá thấp; canh tác cần quản lý canxi & vi lượng để hạn chế rụng trái.`,

  practical: `Cách chăm:
  1) Kiểm tra đất pH; nếu <5.5 cân nhắc vôi bón.
  2) Bón phân nhiều đợt: lót hữu cơ, thúc NPK theo chu kỳ dinh dưỡng.
  3) Kiểm soát sâu bệnh bằng trap/ bẫy và xử lý theo IPM.`,

  sources: ["Yara citrus crop guide", "Nguồn canh tác địa phương"],

  chart: { temp:25, humidity:75, pH:6.0, light:11 },
  nutrientsForChart: { N:120, P:60, K:120 }
},

/* ===================== 5. CHUỐI (Banana) — A4 chi tiết ===================== */
{
  id: "chuoi",
  name: "Chuối (Musa spp.)",
  imgQuery: "banana plantation banana tree",
  tags: ["Cây ăn quả","Cây thương phẩm"],
  origin: "Trồng rộng tại Nghệ An ở vùng đồng bằng và vườn nhà",
  regions: ["Quỳnh Lưu","Anh Sơn","Nghi Lộc"],
  climate: {
    tempOptimal: [24, 30],
    humidityOptimal: [70, 90],
    pHOptimal: [5.5, 7.0],
    lightHours: 12
  },
  water: "Cần lượng nước cao; đất ẩm nhưng thoát nước tránh úng.",
  nutrition_profile: { N: 200, P: 80, K: 300, Ca: 40, Mg: 25 },
  planting: {
    season: "Trồng quanh năm tùy điều kiện nước",
    method: "Giâm cây con/ tách bụi, nhóm cây giữ ẩm",
    soil: "Đất mùn, giàu hữu cơ"
  },
  harvest: "9–12 tháng (tùy giống)",
  yieldAvg: "30–50 tấn/ha (tùy hệ trồng & chăm)",

  pests: ["Bệnh tiêu đen, nấm gốc, sâu tơ"],

  notes: `Chuối là cây “ăn dinh dưỡng” (heavy feeder) — đặc biệt K; cần bón phân nhiều lần trong năm.`,

  practical: `Cách chăm:
  1) Duy trì bón hữu cơ (phân chuồng) + bón cân đối N-P-K, ưu tiên Kali.
  2) Tưới thường xuyên trong mùa khô; phủ gốc giữ ẩm.
  3) Cắt tỉa cây già, quản lý bụi để tái sinh.`,

  sources: ["Hướng dẫn trồng chuối", "Tài liệu canh tác vùng nhiệt đới"],

  chart: { temp:26, humidity:80, pH:6.0, light:12 },
  nutrientsForChart: { N:200, P:80, K:300 }
},

/* ===================== 6. XOÀI (Mango) — A4 chi tiết ===================== */
{
  id: "xoai",
  name: "Xoài (Mangifera indica)",
  imgQuery: "mango tree mango orchard",
  tags: ["Cây ăn quả"],
  origin: "Vườn trồng tại vùng đất phù sa/ đồi thấp",
  regions: ["Thanh Chương","Quỳnh Lưu","Yên Thành"],
  climate: {
    tempOptimal: [24, 28],
    humidityOptimal: [60, 80],
    pHOptimal: [5.5, 7.5],
    lightHours: 10
  },
  water: "Khả năng chịu hạn ở mức trung bình; tưới khi thiếu nước giai đoạn tạo quả.",
  nutrition_profile: { N: 150, P: 100, K: 200, Ca: 40, Mg: 12 },
  planting: {
    season: "Trồng ghép; cây ra quả sau 2–3 năm",
    method: "Ghép/chiết cành để giữ giống",
    soil: "Đất sâu, thoát nước"
  },
  harvest: "2–3 năm sau trồng; thu hoạch theo độ chín thương phẩm",
  yieldAvg: "5–15 tấn/ha (tuỳ giống & tuổi cây)",

  pests: ["Sâu cuốn lá, ve sầu hại quả"],

  notes: `Quản lý cây lâu năm: cắt tỉa định kỳ, bón phân cân đối và quản lý sâu bệnh.`,

  practical: `Cách chăm:
  1) Bón lót phân hữu cơ; bón thúc theo chu kỳ ra hoa & làm quả.
  2) Tưới tuần khi khô, kiểm soát nấm hại bằng cách giữ vườn thông thoáng.`,

  sources: ["Hướng dẫn trồng xoài", "Tài liệu nông học"],

  chart: { temp:27, humidity:65, pH:6.0, light:11 },
  nutrientsForChart: { N:150, P:100, K:200 }
},

/* ===================== 7. CÀ PHÊ (Robusta/Arabica) — A4 chi tiết ===================== */
{
  id: "ca_phe",
  name: "Cà phê (Coffea spp.)",
  imgQuery: "coffee plantation coffee trees",
  tags: ["Cây công nghiệp","Cây lâu năm"],
  origin: "Vùng cao (Arabica) và trung du (Robusta); Nghệ An có diện tích cà phê nhỏ lẻ",
  regions: ["Quế Phong (vùng cao)","Tương Dương"],
  climate: {
    tempOptimal: { arabica:[15,24], robusta:[22,30] },
    humidityOptimal: [70,90],
    pHOptimal: [5.0, 6.5],
    lightHours: 8
  },
  water: "Arabica ưa khí hậu mát, ẩm; Robusta chịu nóng hơn; tưới bổ sung khi hạn nặng.",
  nutrition_profile: { N:80, P:40, K:80, Ca:30, Mg:12 },
  planting: {
    season: "Trồng ghép tại vườn ươm, khoảng cách tùy giống",
    method: "Ghép/cấy; che bóng ở giai đoạn đầu",
    soil: "Đất chua nhẹ, thoát nước"
  },
  harvest: "3–4 năm cho quả thương phẩm (cà phê nhân)",
  yieldAvg: "0.8–2 tấn nhân/ha (Robusta cao hơn Arabica)",

  pests: ["Rệp, bệnh gỉ sắt, bệnh nấm rễ"],

  notes: `Gần đây cà phê ở VN phải tưới nhiều hơn do hạn nóng. Cần chú ý quản lý nước & dinh dưỡng để tránh suy kiệt cây.`,

  practical: `Cách chăm:
  1) Dùng bóng râm khi cần, bón phân hữu cơ + phân NPK chia định kỳ.
  2) Kiểm soát sâu bệnh bằng cách cắt tỉa, xử lý vết bệnh kịp thời.`,

  sources: ["Hướng dẫn trồng cà phê vùng cao", "Báo cáo thời tiết & tưới tại VN"],

  chart: { temp:23, humidity:75, pH:5.5, light:8 },
  nutrientsForChart: { N:80, P:40, K:80 }
},

/* ===================== 8. CHÈ (Tea) — A4 chi tiết ===================== */
{
  id: "che",
  name: "Chè (Camellia sinensis)",
  imgQuery: "tea plantation tea leaves",
  tags: ["Cây công nghiệp","Cây lâu năm"],
  origin: "Vùng cao, đồi trà (ít diện tích ở Nghệ An nhưng có vùng trồng thử nghiệm)",
  regions: ["Vùng cao – thử nghiệm"],
  climate: {
    tempOptimal: [18, 24],
    humidityOptimal: [70, 90],
    pHOptimal: [4.5, 5.5],
    lightHours: 7
  },
  water: "Cần độ ẩm tốt; không chịu úng; ưa mưa đều",
  nutrition_profile: { N:120, P:40, K:60, Ca:25, Mg:15 },
  planting: {
    season: "Gieo/ghép; cây cho thu hoạch sau 1-3 năm",
    method: "Gieo/ghép, trồng luống bậc thang ở đồi",
    soil: "Đất chua, nhiều mùn"
  },
  harvest: "Thu hoạch lá non định kỳ (tùy giống & mục đích chế biến)",
  yieldAvg: "5–10 tấn/ha lá tươi (tùy hệ thống)",

  pests: ["Sâu ăn lá, nấm bệnh trên lá"],

  notes: `Chè cần đất chua và quản lý pH; phân hữu cơ giúp chất lượng lá tốt hơn.`,

  practical: `Cách chăm:
  1) Bón phân hữu cơ đều; bón phân vi lượng khi thiếu.
  2) Thu hái đúng độ tuổi lá nhằm đảm bảo chất lượng sản phẩm.`,

  sources: ["Nghiên cứu trà & pH đất", "Tài liệu canh tác chè"],

  chart: { temp:19, humidity:80, pH:5.0, light:7 },
  nutrientsForChart: { N:120, P:40, K:60 }
},

/* ===================== 9. KHOAI LANG (Sweet potato) — A4 chi tiết ===================== */
{
  id: "khoai_lang",
  name: "Khoai lang (Ipomoea batatas)",
  imgQuery: "sweet potato field sweet potatoes",
  tags: ["Củ","Lương thực phụ"],
  origin: "Đồng bằng, đất nhẹ; trồng phổ biến",
  regions: ["Đồng bằng ven biển, Thanh Chương"],
  climate: {
    tempOptimal: [22, 28],
    humidityOptimal: [60, 75],
    pHOptimal: [5.5, 6.5],
    lightHours: 10
  },
  water: "Ưa ẩm vừa; tránh úng; cần ẩm giai đoạn tạo củ",
  nutrition_profile: { N: 50, P: 30, K: 80, Ca: 10, Mg: 8 },
  planting: {
    season: "Gieo hom/cây con; trồng nhiều vụ tùy vùng",
    method: "Gieo hom trên luống",
    soil: "Đất nhẹ, chân đáy tốt"
  },
  harvest: "3–5 tháng (tùy giống)",
  yieldAvg: "10–20 tấn/ha (tùy giống & chăm)",

  pests: ["Sâu đục củ, bệnh thối củ"],

  notes: `Khoai lang là cây chịu hạn tương đối; bón K giúp củ năng suất và chất lượng tốt.`,

  practical: `Cách chăm:
  1) Chuẩn bị hom giống khỏe mạnh.
  2) Bón lót hữu cơ + P, K; bón thúc N nhẹ để tránh nhiều dây hơn củ.`,

  sources: ["Hướng dẫn trồng khoai lang", "Nông học địa phương"],

  chart: { temp:25, humidity:70, pH:5.8, light:11 },
  nutrientsForChart: { N:50, P:30, K:80 }
},

/* ===================== 10. SẮN / KHOAI MÌ (Cassava) — A4 chi tiết ===================== */
{
  id: "san",
  name: "Sắn / Khoai mì (Manihot esculenta)",
  imgQuery: "cassava field cassava roots",
  tags: ["Công nghiệp","Củ"],
  origin: "Đồng bằng, nhiều nơi canh tác",
  regions: ["Nhiều huyện trồng xen luân canh"],
  climate: {
    tempOptimal: [25, 30],
    humidityOptimal: [55, 75],
    pHOptimal: [5.5, 6.5],
    lightHours: 10
  },
  water: "Chịu hạn tốt; không chịu úng lâu",
  nutrition_profile: { N: 40, P: 30, K: 80, Ca: 15, Mg: 8 },
  planting: {
    season: "Trồng hom, 8-12 tháng thu hoạch tùy giống",
    method: "Giâm hom, chăm luống",
    soil: "Đất trung tính, tơi xốp"
  },
  harvest: "8–12 tháng (tùy giống và mục đích: tinh bột hay thực phẩm)",
  yieldAvg: "10–25 tấn/ha củ tươi",

  pests: ["Bọ cánh cứng, bệnh virus"],

  notes: `Sắn phổ biến luân canh; quản lý đất & K quan trọng cho tinh bột.`,

  practical: `Cách chăm:
  1) Trồng hom giống sạch bệnh.
  2) Bón K để tăng năng suất; hạn chế N quá nhiều dẫn tới nhiều lá.`,

  sources: ["FAO cassava guide", "Tài liệu nông nghiệp VN"],

  chart: { temp:26, humidity:65, pH:5.8, light:10 },
  nutrientsForChart: { N:40, P:30, K:80 }
},

/* ===================== 11. ĐẬU PHỘNG (Peanut / Lạc) — A4 chi tiết ===================== */
{
  id: "dauphong",
  name: "Đậu phộng / Lạc (Arachis hypogaea)",
  imgQuery: "peanut crop peanut plant",
  tags: ["Họ đậu","Lương thực"],
  origin: "Đồng bằng, luân canh, trồng nhiều",
  regions: ["Thanh Chương","Yên Thành"],
  climate: {
    tempOptimal: [24, 30],
    humidityOptimal: [60, 75],
    pHOptimal: [6.0, 7.0],
    lightHours: 11
  },
  water: "Đòi hỏi ẩm vừa, nhưng kỵ úng gốc",
  nutrition_profile: { N: 0, P: 60, K: 60, Ca: 50, Mg: 8 }, // họ đậu có khả năng cố định N -> bón N ít
  planting: {
    season: "Gieo vụ khô / vụ mưa tùy vùng",
    method: "Gieo trực tiếp, đất tơi xốp",
    soil: "Đất cát pha giàu hữu cơ"
  },
  harvest: "90–120 ngày (tùy giống)",
  yieldAvg: "2–4 tấn/ha nhân",

  pests: ["Sâu ăn lá, rệp hại"],

  notes: `Lạc giúp cải tạo đất (họ đậu); bón P và Ca giúp tăng tỷ lệ hạt đầy.`,

  practical: `Cách chăm:
  1) Chọn giống thích ứng vùng.
  2) Bón P lót, K khi cần; luân canh để giảm bệnh càng lâu.`,

  sources: ["FAO peanut guide", "Nông học địa phương"],

  chart: { temp:27, humidity:65, pH:6.0, light:11 },
  nutrientsForChart: { N:0, P:60, K:60 }
},

/* ===================== 12. MÍA (Sugarcane) — A4 chi tiết ===================== */
{
  id: "mia",
  name: "Mía (Saccharum spp.)",
  imgQuery: "sugarcane field sugar cane",
  tags: ["Công nghiệp"],
  origin: "Đồng bằng ven sông; canh tác diện rộng",
  regions: ["Nghi Lộc","Anh Sơn","Quỳnh Lưu"],
  climate: {
    tempOptimal: [24, 30],
    humidityOptimal: [70, 85],
    pHOptimal: [5.5, 7.0],
    lightHours: 12
  },
  water: "Cần nhiều nước, tưới hoặc mưa đều trong vụ sinh trưởng",
  nutrition_profile: { N: 200, P: 80, K: 200, Ca: 50, Mg: 20 },
  planting: {
    season: "Trồng hom, chăm dài ngày (10–18 tháng)",
    method: "Trồng hom, bón lót hữu cơ",
    soil: "Đất phù sa, nhiều mùn"
  },
  harvest: "10–18 tháng (tùy giống và mục tiêu đường)",
  yieldAvg: "60–120 tấn/ha cây tươi (tùy canh tác)",

  pests: ["Sâu đục thân, bệnh đốm lá"],

  notes: `Mía là cây công nghiệp đòi hỏi đầu tư tưới & phân bón lớn; cần quản lý thời gian thu hoạch để đạt độ đường tốt.`,

  practical: `Cách chăm:
  1) Bón lót nhiều hữu cơ, bón N chia đợt.
  2) Tưới đều; quản lý sâu bệnh thân lá.`,

  sources: ["Tài liệu mía đường", "Nghiên cứu vùng"],

  chart: { temp:28, humidity:75, pH:6.0, light:12 },
  nutrientsForChart: { N:200, P:80, K:200 }
},

/* ===================== SKELETON — PHẦN CÒN LẠI (ví dụ 88 mục) ===================== */
/* Lưu ý: phần tiếp theo sẽ gồm các object có cùng cấu trúc nhưng ngắn gọn (đủ số để vẽ biểu đồ).
   Mình cung cấp 88 skeleton dưới đây (để tránh chat quá dài mình sẽ đính kèm file hoàn chỉnh nếu bạn xác nhận).
   Dưới đây là một ví dụ của một vài mục ngắn gọn; cả 88 sẽ có cùng fields chart & nutrientsForChart. */

{
  id: "hanhla",
  name: "Hành lá",
  imgQuery: "spring onion green onion",
  tags: ["Rau gia vị"],
  origin: "Vườn, phổ biến",
  regions: ["Toàn tỉnh"],
  climate:{tempOptimal:[18,24],humidityOptimal:[60,80],pHOptimal:[6.0,7.0],lightHours:8},
  water:"Tưới đều",
  nutrition_profile:{N:40,P:20,K:30},
  planting:{season:"Nhiều vụ",method:"Gieo",soil:"Tơi xốp"},
  harvest:"30-45 ngày",
  yieldAvg:"n/a",
  pests:[],
  notes:"Rau gia vị, thu hoạch cắt ngọn",
  chart:{temp:20,humidity:70,pH:6.5,light:8},
  nutrientsForChart:{N:40,P:20,K:30}
},
{
  id: "bapcai",
  name: "Bắp cải",
  imgQuery: "cabbage field cabbage",
  tags: ["Rau màu"],
  origin:"Vườn",
  regions:["Toàn tỉnh"],
  climate:{tempOptimal:[14,18],humidityOptimal:[70,85],pHOptimal:[6.0,7.0],lightHours:8},
  water:"Giữ ẩm",
  nutrition_profile:{N:80,P:40,K:80},
  planting:{season:"Cao vụ/ thấp vụ",method:"ươm cây",soil:"Giàu mùn"},
  harvest:"60-90 ngày",
  yieldAvg:"n/a",
  pests:[],
  notes:"Cần N cao",
  chart:{temp:16,humidity:75,pH:6.5,light:8},
  nutrientsForChart:{N:80,P:40,K:80}
}

/* ... + 86 mục còn lại (mẫu đã sẵn bên trên). 
   Nếu bạn OK, mình sẽ dán tiếp file data.js hoàn chỉnh với 100 object đầy đủ (12 chi tiết + 88 skeleton),
   hoặc mình có thể hoàn thiện hết 100 mục ở dạng A4 chi tiết (ước lượng ~30-40k từ; mình sẽ gửi theo từng phần). */
];

if(typeof module !== 'undefined') module.exports = plants;
