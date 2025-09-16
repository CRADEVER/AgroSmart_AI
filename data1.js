// data1.js
const plantsData1 = [
  {
    commonName: "Lúa (Rice)",
    scientificName: "Oryza sativa",
    origin: "Asia (domesticated in Yangtze River valley, China):contentReference[oaicite:0]{index=0}",
    region: "Widespread in Vietnam (especially Mekong and Red River deltas, including Nghệ An):contentReference[oaicite:1]{index=1}",
    growingConditions: {
      temperature: "25\u00B0C\u201335\u00B0C (optimal daily range):contentReference[oaicite:2]{index=2}",
      humidity: "High (flooded paddy fields)",
      light: "Full sun",
      pH: "5.5\u20137.0 (slightly acidic to neutral):contentReference[oaicite:3]{index=3}"
    },
    nutrients: {
      N: "~100\u2013200 kg/ha (high N demand)",
      P: "~50\u2013100 kg/ha",
      K: "~50\u2013100 kg/ha",
      micro: "Needs Zn, Fe, B, etc. (often added in fertilizer)"
    },
    sowingSeason: "Mùa (monsoon): May\u2013Aug:contentReference[oaicite:4]{index=4}; Đông Xuân (winter-spring): Dec\u2013Feb:contentReference[oaicite:5]{index=5}; Hè Thu (summer-autumn): Apr\u2013Jun:contentReference[oaicite:6]{index=6}",
    harvestTime: "Mùa harvest: Sep\u2013Dec; Đông Xuân: Apr\u2013Jun; Hè Thu: Aug\u2013Sep:contentReference[oaicite:7]{index=7}:contentReference[oaicite:8]{index=8}",
    yield: "~3\u20135 t/ha (Nghe An ~2.99 t/ha):contentReference[oaicite:9]{index=9}:contentReference[oaicite:10]{index=10}",
    uses: "Staple food (grain); straw and husk used as fodder and in industry (paper, building):contentReference[oaicite:11]{index=11}",
    references: "Rice cultivation info:contentReference[oaicite:12]{index=12}:contentReference[oaicite:13]{index=13}"
  },
  {
    commonName: "Xoài (Mango)",
    scientificName: "Mangifera indica",
    origin: "South Asia (India-Myanmar region):contentReference[oaicite:14]{index=14}",
    region: "Southern Vietnam provinces (Đồng Tháp, An Giang, Cần Thơ, Bình Thuận):contentReference[oaicite:15]{index=15} (also grown in central areas)",
    growingConditions: {
      temperature: "24\u201327\u00B0C (mean):contentReference[oaicite:16]{index=16}",
      humidity: "High tropical",
      light: "Full sun",
      pH: "5.5\u20137.5:contentReference[oaicite:17]{index=17}"
    },
    nutrients: {
      N: "Moderate (balanced fertilizer, e.g. 8-3-9 NPK):contentReference[oaicite:18]{index=18}",
      P: "Moderate",
      K: "High (important for fruit quality):contentReference[oaicite:19]{index=19}",
      micro: "Needs Zn, Fe, B, Cu (flowering, fruit set):contentReference[oaicite:20]{index=20}"
    },
    sowingSeason: "Start of rainy season (May\u2013Jun) for planting nursery/grafts",
    harvestTime: "Flowering: Dec\u2013Feb; fruit ripens Apr\u2013Jun:contentReference[oaicite:21]{index=21} (about 3–6 months after flowering)",
    yield: "100\u2013300 kg fruit/tree/year (mature trees):contentReference[oaicite:22]{index=22}",
    uses: "Fresh fruit (desserts, salads, beverages); rich in vitamins C and A:contentReference[oaicite:23]{index=23}; wood used for carving",
    references: "Mango cultivation and fertilization:contentReference[oaicite:24]{index=24}:contentReference[oaicite:25]{index=25}"
  },
  {
    commonName: "Ngô (Maize)",
    scientificName: "Zea mays",
    origin: "Central Mexico (domesticated from teosinte ~9,000 years ago):contentReference[oaicite:26]{index=26}",
    region: "Northern Vietnam (mountains), Central Coast, Central Highlands (animal feed production)",
    growingConditions: {
      temperature: "~20\u201330\u00B0C (warm season)",
      humidity: "Moderate (well-drained soil)",
      light: "Full sun",
      pH: "6.0\u20137.0 (neutral):contentReference[oaicite:27]{index=27}"
    },
    nutrients: {
      N: "~200 kg/ha (for ~7 t/ha grain yield):contentReference[oaicite:28]{index=28}",
      P: "~85 kg/ha (P₂O₅):contentReference[oaicite:29]{index=29}",
      K: "~200 kg/ha (K₂O):contentReference[oaicite:30]{index=30}",
      micro: "Needs Zn, B, Fe (often applied with seed or foliar)"
    },
    sowingSeason: "Spring (Mar\u2013Apr) and early summer (Jul) plantings",
    harvestTime: "Summer\u2013Autumn (90\u2013120 days after sowing, depending on variety)",
    yield: "Typically ~5\u20137 t/ha under good management:contentReference[oaicite:31]{index=31}",
    uses: "Food (boiled corn, flour), animal feed (high carb/protein):contentReference[oaicite:32]{index=32}, processed products (sweeteners, corn oil), ethanol",
    references: "Maize nutrition and historical use:contentReference[oaicite:33]{index=33}:contentReference[oaicite:34]{index=34}"
  },
  {
    commonName: "Chuối (Banana)",
    scientificName: "Musa spp.",
    origin: "Southeast Asia (Indomalayan realm):contentReference[oaicite:35]{index=35}",
    region: "Tropical lowlands of Vietnam (Mekong Delta, Huế region, Nghệ An), also as shade/ornamental",
    growingConditions: {
      temperature: "26\u201330\u00B0C (shoot growth best 26–28\u00B0C, fruit 29–30\u00B0C):contentReference[oaicite:36]{index=36}",
      humidity: "High",
      light: "Full sun (can grow under partial shade)",
      pH: "6.0\u20137.0"
    },
    nutrients: {
      N: "High (rapid leaf growth, ~20-10-10 ratio early):contentReference[oaicite:37]{index=37}",
      P: "Moderate",
      K: "Very high (e.g. NPK 12-12-36 during fruiting):contentReference[oaicite:38]{index=38}",
      micro: "Needs Mg, S, Zn, Mn (improves bunch quality)"
    },
    sowingSeason: "Year-round (propagated by suckers; best planted at onset of rains)",
    harvestTime: "10\u201320 months after planting (flower emerges 10–15 months, bunch harvest 80–180 days after shooting):contentReference[oaicite:39]{index=39}",
    yield: "~30\u201340 t/ha (green fruit weight, varies by cultivar and spacing)",
    uses: "Fruit eaten fresh or cooked (desserts, salads); plantains (cooking bananas); fiber (stems for ropes); ornamental plant:contentReference[oaicite:40]{index=40}",
    references: "Banana cultivation and fertilization:contentReference[oaicite:41]{index=41}:contentReference[oaicite:42]{index=42}"
  },
  {
    commonName: "Sắn (Cassava)",
    scientificName: "Manihot esculenta",
    origin: "South America (domesticated in west-central Brazil ~10,000 years ago):contentReference[oaicite:43]{index=43}",
    region: "All Vietnam (notably Nghệ An, Central Highlands, South Vietnam)",
    growingConditions: {
      temperature: "25\u201330\u00B0C (tropical):contentReference[oaicite:44]{index=44}",
      humidity: "Tolerant of dry conditions; survives drought",
      light: "Full sun",
      pH: "5.5\u20136.5"
    },
    nutrients: {
      N: "Moderate (e.g. ~160 kg urea/ha applied):contentReference[oaicite:45]{index=45}",
      P: "Moderate (~200 kg P₂O₅/ha):contentReference[oaicite:46]{index=46}",
      K: "Moderate (~160 kg K₂O/ha):contentReference[oaicite:47]{index=47}",
      micro: "Needs Mg, Ca (often added via dolomite/lime)"
    },
    sowingSeason: "Early rainy season (May\u2013Jul)",
    harvestTime: "8\u201312 months after planting (roots mature; often harvested in dry season)",
    yield: "~10\u201320 t/ha (fresh root):contentReference[oaicite:48]{index=48}",
    uses: "Food (boiled roots, cassava flour); tapioca starch production (food, animal feed, industrial uses):contentReference[oaicite:49]{index=49}",
    references: "Cassava agronomy and uses:contentReference[oaicite:50]{index=50}:contentReference[oaicite:51]{index=51}"
  }
];
