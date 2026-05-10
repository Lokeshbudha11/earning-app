export const intelligenceCards = [
  {
    title: "Smart Farming",
    description:
      "Connected sensors, autonomous machinery, and predictive intelligence orchestrating every hectare in real time.",
    glyph: "smart",
    accent: "neon" as const
  },
  {
    title: "AI Crop Analysis",
    description:
      "Vision models identify pests, growth stages and yield potential from drone & satellite imagery — second by second.",
    glyph: "ai",
    accent: "electric" as const
  },
  {
    title: "Soil Intelligence",
    description:
      "Spectral soil mapping with nutrient, moisture and microbial diagnostics — turning earth into living data.",
    glyph: "soil",
    accent: "gold" as const
  },
  {
    title: "Irrigation Systems",
    description:
      "Adaptive flow networks balance river, monsoon and reservoir input across districts with surgical precision.",
    glyph: "drop",
    accent: "electric" as const
  },
  {
    title: "Climate Monitoring",
    description:
      "High-resolution micro-climate forecasts steer plantings, harvests and disaster mitigation in real time.",
    glyph: "climate",
    accent: "neon" as const
  },
  {
    title: "Livestock Innovation",
    description:
      "Wearable AI tracks herd health, productivity and welfare — securing rural livelihoods at scale.",
    glyph: "livestock",
    accent: "gold" as const
  },
  {
    title: "Farmer Digital Network",
    description:
      "A nationwide interface uniting growers, cooperatives, extension agents and markets in one fabric.",
    glyph: "network",
    accent: "neon" as const
  },
  {
    title: "Agriculture Research",
    description:
      "Open scientific commons collaborating across universities, institutes and farms to evolve Nepal's harvest.",
    glyph: "research",
    accent: "electric" as const
  }
];

export const dashboardMetrics = [
  { label: "Connected Farmers", value: 248_312, suffix: "+", trend: "+12.4%" },
  { label: "Active Districts", value: 77, suffix: "/77", trend: "100%" },
  { label: "Hectares Mapped", value: 1_482_000, suffix: "ha", trend: "+8.2%" },
  { label: "Drones in Field", value: 1_204, suffix: "", trend: "+24.1%" },
  { label: "Sensors Online", value: 38_921, suffix: "", trend: "live" },
  { label: "Avg Yield Increase", value: 23.7, suffix: "%", trend: "+3.4%" }
];

export const productionData = [
  { crop: "Rice", value: 5.6, unit: "M tons", color: "#8DFF8A" },
  { crop: "Maize", value: 2.9, unit: "M tons", color: "#00D1FF" },
  { crop: "Wheat", value: 2.1, unit: "M tons", color: "#D9B86C" },
  { crop: "Potato", value: 3.4, unit: "M tons", color: "#B4FFB1" },
  { crop: "Vegetables", value: 4.8, unit: "M tons", color: "#7CE8FF" },
  { crop: "Tea", value: 0.27, unit: "M tons", color: "#EAD49A" }
];

export const districtPoints = [
  { id: "kathmandu", name: "Kathmandu", x: 60, y: 60, intensity: 0.95 },
  { id: "pokhara", name: "Pokhara", x: 47, y: 56, intensity: 0.85 },
  { id: "biratnagar", name: "Biratnagar", x: 80, y: 70, intensity: 0.78 },
  { id: "chitwan", name: "Chitwan", x: 56, y: 65, intensity: 0.9 },
  { id: "lumbini", name: "Lumbini", x: 38, y: 67, intensity: 0.7 },
  { id: "janakpur", name: "Janakpur", x: 70, y: 67, intensity: 0.74 },
  { id: "dhangadhi", name: "Dhangadhi", x: 18, y: 62, intensity: 0.65 },
  { id: "nepalgunj", name: "Nepalgunj", x: 28, y: 64, intensity: 0.68 },
  { id: "butwal", name: "Butwal", x: 40, y: 64, intensity: 0.72 },
  { id: "ilam", name: "Ilam", x: 86, y: 65, intensity: 0.6 },
  { id: "jumla", name: "Jumla", x: 24, y: 50, intensity: 0.55 },
  { id: "mustang", name: "Mustang", x: 44, y: 44, intensity: 0.5 },
  { id: "everest", name: "Solukhumbu", x: 73, y: 50, intensity: 0.62 },
  { id: "rara", name: "Rara", x: 22, y: 45, intensity: 0.48 },
  { id: "humla", name: "Humla", x: 14, y: 40, intensity: 0.42 }
];

export const programs = [
  {
    title: "Smart Agriculture",
    tagline: "Autonomous farming infrastructure",
    description:
      "Deploying sensors, robotics and predictive AI across Nepal's terraces, valleys and lowlands.",
    metric: "12 districts active",
    accent: "neon" as const
  },
  {
    title: "Sustainability Projects",
    tagline: "Regenerating ecosystems",
    description:
      "Restoring soil biology, watersheds and biodiversity through data-driven cultivation.",
    metric: "208 micro-watersheds",
    accent: "electric" as const
  },
  {
    title: "Digital Training",
    tagline: "National farmer literacy",
    description:
      "Free, multilingual learning paths covering smart agriculture, business and climate adaptation.",
    metric: "84,000 graduates",
    accent: "gold" as const
  },
  {
    title: "Climate Innovation",
    tagline: "Adaptive resilience",
    description:
      "Forecasting micro-climates and engineering crops & cycles to thrive in a changing Himalaya.",
    metric: "+23.7% yield",
    accent: "neon" as const
  },
  {
    title: "Farmer Empowerment",
    tagline: "Cooperative intelligence",
    description:
      "Cooperative finance, market access and decision support — placing growers at the center.",
    metric: "1,420 cooperatives",
    accent: "electric" as const
  },
  {
    title: "Rural Development",
    tagline: "Connected communities",
    description:
      "Energy, connectivity and logistics infrastructure that brings rural Nepal into the digital era.",
    metric: "486 villages online",
    accent: "gold" as const
  }
];

export const mediaItems = [
  {
    title: "Above the Terraces",
    category: "Documentary",
    duration: "12:48",
    blurb:
      "Four seasons of Nepali farms told through autonomous drone cinema and AI-assisted weather narration.",
    color: "from-emerald-900 via-emerald-700 to-emerald-500"
  },
  {
    title: "The Soil Beneath",
    category: "Research Series",
    duration: "08:11",
    blurb:
      "Spectral microbiology revealing the unseen intelligence of Nepal's mountain and lowland soils.",
    color: "from-amber-900 via-amber-700 to-amber-500"
  },
  {
    title: "Monsoon Code",
    category: "Climate Lab",
    duration: "15:22",
    blurb:
      "Predictive models, satellite arrays and millions of micro-readings forecasting the monsoon's pulse.",
    color: "from-cyan-900 via-cyan-600 to-sky-400"
  },
  {
    title: "Cooperative Futures",
    category: "Field Stories",
    duration: "06:39",
    blurb:
      "How women-led cooperatives are rebuilding hill farming with mobile finance and shared intelligence.",
    color: "from-rose-900 via-rose-700 to-amber-400"
  },
  {
    title: "Drone Karma",
    category: "Tech Showcase",
    duration: "04:54",
    blurb:
      "A behind-the-scenes look at Nepal's autonomous fleet: from delivery quadcopters to mapping wings.",
    color: "from-indigo-900 via-fuchsia-700 to-pink-500"
  },
  {
    title: "Annapurna Yields",
    category: "Documentary",
    duration: "21:03",
    blurb:
      "Crop intelligence at altitude — the alpine farmers redefining what is possible above 3,000m.",
    color: "from-emerald-900 via-cyan-600 to-amber-400"
  }
];

export const team = [
  {
    name: "Dr. Anjali Karki",
    role: "Director · Strategy & Vision",
    bio: "Former IFPRI fellow architecting Nepal's national agriculture intelligence agenda.",
    accent: "neon" as const
  },
  {
    name: "Bibek Shrestha",
    role: "Chief Technology Officer",
    bio: "Builds the realtime systems linking drones, satellites and farmer devices nationwide.",
    accent: "electric" as const
  },
  {
    name: "Pratima Tamang",
    role: "Head of Research",
    bio: "Leads soil-microbiome and climate-resilient crop programs with universities across Nepal.",
    accent: "gold" as const
  },
  {
    name: "Sagar Adhikari",
    role: "Head of Cooperatives",
    bio: "Connecting 1,400+ cooperatives into a single, transparent national value chain.",
    accent: "neon" as const
  },
  {
    name: "Ritika Bhattarai",
    role: "Director · Climate Innovation",
    bio: "Directs predictive monsoon, glacier and watershed modeling for adaptive agriculture.",
    accent: "electric" as const
  },
  {
    name: "Dipesh Rai",
    role: "Head of Drone Operations",
    bio: "Commands the autonomous fleet — surveying, scanning and serving 77 districts daily.",
    accent: "gold" as const
  }
];
