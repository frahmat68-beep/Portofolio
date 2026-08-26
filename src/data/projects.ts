import { Project, FilmographyEntry, ProfileData } from '@/types/portfolio';

export const profileData: ProfileData = {
  name: "Fikri Mulya Rachmat",
  tagline: "Film Producer · Line Producer · UPM · Art Director",
  bio: "Film Producer, Line Producer, Unit Production Manager, dan Art Director berbasis di Jakarta & Depok. Berpengalaman dalam 30+ produksi karya naratif, digital series, brand campaigns, dan music videos.",
  avatarUrl: "/assets/profile/favicon.png",
  roles: [
    "Film Producer",
    "Line Producer",
    "Unit Production Manager (UPM)",
    "Art Director",
    "Production Assistant"
  ],
  location: "Jakarta & Depok, Indonesia",
  contact: {
    whatsapp: "6285156649015",
    whatsappDisplay: "+62 851-5664-9015",
    email: "frahmat68@gmail.com",
    instagram: "kikiirch",
    linkedin: "https://www.linkedin.com/in/fikrimulyarachmat",
    showreelUrl: "https://youtu.be/xsxIyOvE26M",
    cvPdfUrl: "#"
  },
  stats: {
    totalProductions: "30+",
    shortFilms: "15+",
    musicVideos: "10+",
    experienceYears: "4+ Years"
  }
};

export const projects: Project[] = [
  {
    slug: "darah-nyai",
    title: "Darah Nyai",
    category: "Short Film",
    client: "Imajinarium Pictures",
    role: "Line Producer / UPM",
    year: "2024",
    description:
      "Sebuah short film bergenre drama/horror lokal yang mengangkat kisah 'Nyai' dengan pendekatan sinematik. Kiki terlibat dalam proses produksi mulai dari perencanaan hingga eksekusi di lapangan.",
    posterUrl: "/assets/projects/darah-nyai_imajinarium-pictures/DSC00063.jpg",
    featured: true,
    order: 1,
    tags: ["Short Film", "Horror", "Drama", "Imajinarium"],
    videos: [
      { platform: "youtube", url: "https://youtu.be/xsxIyOvE26M", label: "Full Film" },
    ],
  },
  {
    slug: "love-by-rejoice",
    title: "Love By Rejoice",
    category: "Series",
    client: "Rejoice / Leo Pictures",
    role: "Line Producer / Production Team",
    year: "2024",
    description:
      "Web series 4 episode produksi Leo Pictures Official yang mengangkat cerita cinta dengan format mini-drama, dirilis berkelanjutan di TikTok sebagai strategi konten berseri.",
    posterUrl: "/assets/projects/anonymous-love-by-rejoice_leo-pictures/WhatsApp_Image_2025-03-14_at_01_58_46.jpg",
    previewVideoUrl: "/assets/projects/anonymous-love-by-rejoice_leo-pictures/Ep1.mp4",
    featured: true,
    order: 2,
    tags: ["Series", "TikTok", "Rejoice", "Leo Pictures"],
    videos: [
      { platform: "tiktok", url: "https://www.tiktok.com/@leopicturesofficial/video/7481234654016851255", label: "Eps 1" },
      { platform: "tiktok", url: "https://www.tiktok.com/@leopicturesofficial/video/7482721938406739205", label: "Eps 2" },
      { platform: "tiktok", url: "https://www.tiktok.com/@leopicturesofficial/video/7483803776776686903", label: "Eps 3" },
      { platform: "tiktok", url: "https://www.tiktok.com/@leopicturesofficial/video/7485343069093498167", label: "Eps 4" },
    ],
  },
  {
    slug: "reku-relaunch-pack",
    title: "Reku Relaunch Pack",
    category: "Commercial",
    client: "Reku / Sunyata Studio",
    role: "Production Assistant",
    year: "2023",
    description:
      "Campaign relaunch produk untuk Reku, terdiri dari serangkaian video testimoni/brand story (Raka, Mita, Devina) dan mini-series 'Detik-detik Dalam Hidup' 5 episode yang mengangkat momen personal para narasumber dalam mengelola aset & keputusan finansial mereka.",
    posterUrl: "/assets/projects/reku-relaunch-pack_sunyata-studio/WhatsApp_Image_2025-08-06_at_16_22_01.jpg",
    previewVideoUrl: "/assets/projects/reku-relaunch-pack_sunyata-studio/Reku_Devina.mp4",
    featured: true,
    order: 3,
    tags: ["Commercial", "Fintech", "Reku", "Series"],
    videos: [
      { platform: "youtube", url: "https://youtu.be/uvCVFdDNNHA", label: "Raka" },
      { platform: "youtube", url: "https://youtu.be/rxh5qOL5E7E", label: "Mita" },
      { platform: "youtube", url: "https://youtu.be/0ESm0lJI-mo", label: "Devina" },
      { platform: "instagram", url: "https://www.instagram.com/reel/C6i7gm4SVxW/", label: "Detik-detik Dalam Hidup — Eps 1" },
      { platform: "instagram", url: "https://www.instagram.com/reel/C818wyZyw_E/", label: "Detik-detik Dalam Hidup — Eps 2" },
      { platform: "instagram", url: "https://www.instagram.com/reel/C-aRsM8ybHA/", label: "Detik-detik Dalam Hidup — Eps 3" },
      { platform: "instagram", url: "https://www.instagram.com/reel/C_vGA4ByLrO/", label: "Detik-detik Dalam Hidup — Eps 4" },
      { platform: "instagram", url: "https://www.instagram.com/reel/DITjZJySgvg/", label: "Detik-detik Dalam Hidup — Eps 5" },
    ],
  },
  {
    slug: "puma-x-mclaren",
    title: "Puma x McLaren",
    category: "Commercial",
    client: "Puma x McLaren / Aman Studio",
    role: "Production & Styling Team",
    year: "2025",
    description:
      "Rangkaian konten campaign kolaborasi Puma x McLaren, menampilkan produk apparel & footwear dengan pendekatan visual dinamis bernuansa motorsport, dirilis dalam format reels & feed post.",
    posterUrl: "/assets/projects/puma-x-mclaren_aman-studio/Check_out_the_MCL40_and_t.jpg",
    previewVideoUrl: "/assets/projects/puma-x-mclaren_aman-studio/The_new_PUMA_x_McLaren_Ra.mp4",
    featured: true,
    order: 4,
    tags: ["Commercial", "Fashion", "PUMA", "McLaren F1"],
    videos: [
      { platform: "instagram", url: "https://www.instagram.com/reel/DUxJDSFj2Wp/", label: "Cut 1" },
      { platform: "instagram", url: "https://www.instagram.com/reel/DUo-206iTpk/", label: "Cut 2" },
      { platform: "instagram", url: "https://www.instagram.com/reel/DUnmGnAkTOz/", label: "Cut 3" },
      { platform: "instagram", url: "https://www.instagram.com/p/DUpO304kf3L/", label: "Post 1" },
      { platform: "instagram", url: "https://www.instagram.com/p/DUo-0eeCWcq/", label: "Post 2" },
    ],
  },
  {
    slug: "the-forestine-ciputra",
    title: "The Forestine — Ciputra CitraGarden City",
    category: "Commercial",
    client: "Ciputra CitraGarden City / Berimajinasi Ria",
    role: "Production Team / UPM",
    year: "2025",
    description:
      "Konten promosi properti untuk klaster The Forestine, Ciputra CitraGarden City — menonjolkan konsep hunian asri dan suasana lingkungan lewat pendekatan sinematik.",
    posterUrl: "/assets/projects/the-forestine-ciputra-citygarden_berimajinasi-ria/images.jpeg",
    previewVideoUrl: "/assets/projects/the-forestine-ciputra-citygarden_berimajinasi-ria/Ciputra_-_The_Forestine_D.mp4",
    featured: false,
    order: 5,
    tags: ["Commercial", "Property", "Ciputra"],
    videos: [
      { platform: "instagram", url: "https://www.instagram.com/reel/DUFqhCXEuee/", label: "Reel" },
    ],
  },
  {
    slug: "allianz-official-music-video",
    title: "Allianz — Official Music Video",
    category: "Music Video",
    client: "Allianz / Berimajinasi Ria",
    role: "Line Producer / UPM",
    year: "2026",
    description:
      "Music video resmi untuk brand campaign Allianz, memadukan narasi musikal dengan pesan perlindungan/asuransi dalam format storytelling yang emosional.",
    posterUrl: "/assets/projects/allianz_berimajinasi-ria/hvfeIL15AY4ZehkQrkI7FNSOf.png",
    previewVideoUrl: "/assets/projects/allianz_berimajinasi-ria/Music_Video_for_Allianz_2.mp4",
    featured: false,
    order: 6,
    tags: ["Music Video", "Allianz", "Brand Campaign"],
    videos: [
      { platform: "instagram", url: "https://www.instagram.com/reel/DUKlQvXEptT/", label: "Cut 1" },
      { platform: "instagram", url: "https://www.instagram.com/reel/DUKksk3klTU/", label: "Cut 2" },
    ],
  },
  {
    slug: "my-love-bedcover",
    title: "My Love Bedcover",
    category: "Commercial",
    client: "My Love Bedcover / Berimajinasi Ria",
    role: "Line Producer / UPM",
    year: "2025",
    description:
      "Konten iklan produk bedcover dengan pendekatan visual homey dan lifestyle, menonjolkan tekstur & kenyamanan produk.",
    posterUrl: "/assets/projects/my-love-bedcover_berimajinasi-rua/images_1.jpeg",
    previewVideoUrl: "/assets/projects/my-love-bedcover_berimajinasi-rua/TVC_for_My_Love_mylovebed.mp4",
    featured: false,
    order: 7,
    tags: ["Commercial", "TVC", "My Love"],
    videos: [
      { platform: "instagram", url: "https://www.instagram.com/reel/DW56ABYj_y5/", label: "Reel" },
    ],
  },
  {
    slug: "kopi-kenangan-x-beng-beng",
    title: "Kopi Kenangan x Drink Beng-beng",
    category: "Commercial",
    client: "Kopi Kenangan x Beng-beng / Aman Studio",
    role: "Production Team / UPM",
    year: "2025",
    description:
      "Konten kolaborasi Kopi Kenangan x Drink Beng-beng, kampanye produk cross-brand dengan eksekusi visual playful dan cepat sesuai gaya konten media sosial.",
    posterUrl: "/assets/projects/kopken-x-bengbeng_aman-studio/639905945_184269055961841.jpg",
    previewVideoUrl: "/assets/projects/kopken-x-bengbeng_aman-studio/Nikmati_rasa_cokelat_ikon.mp4",
    featured: false,
    order: 8,
    tags: ["Commercial", "Digital Ads", "Kopi Kenangan"],
    videos: [
      { platform: "instagram", url: "https://www.instagram.com/reel/DVNT0_iCRhD/", label: "Reel" },
    ],
  },
  {
    slug: "kopi-kenangan-manifesto",
    title: "Kopi Kenangan Manifesto",
    category: "Commercial",
    client: "Kopi Kenangan / Aman Studio",
    role: "Production Team",
    year: "2024",
    description:
      "Brand film manifesto Kopi Kenangan — pendekatan naratif yang lebih dalam untuk menyampaikan nilai dan visi brand, di luar format iklan produk biasa.",
    posterUrl: "/assets/projects/manifesto-kopi-kenangan_aman-studio/images.png",
    previewVideoUrl: "/assets/projects/manifesto-kopi-kenangan_aman-studio/Manifesto_Kopi_Kenangan.mp4",
    featured: false,
    order: 9,
    tags: ["Commercial", "Brand Film", "Kopi Kenangan"],
    videos: [
      { platform: "youtube", url: "https://youtu.be/HAWMCxWKBgk", label: "Manifesto Film" },
    ],
  },
  {
    slug: "harra-jurus-jitu",
    title: "Harra – Jurus Jitu",
    category: "Music Video",
    client: "Bloom Pictures",
    role: "Unit Production Manager",
    year: "2023",
    description:
      "Official Music Video 'Jurus Jitu' oleh band Harra. Visual dinamis penuh warna dengan koreografi set dan blocking kamera yang energik.",
    posterUrl: "/assets/projects/jurus-jitu-harra_bloom-pictures/Screenshot_2025-06-17_001722.png",
    featured: true,
    order: 10,
    tags: ["Music Video", "Bloom Pictures", "Harra"],
    videos: [
      { platform: "youtube", url: "https://youtu.be/9xd-DQMDrHw?si=t-bcApYGSYEX8B_j", label: "Official MV" },
    ],
  },
  {
    slug: "selfi-yamma-firasat",
    title: "Selfi Yamma – Firasat",
    category: "Music Video",
    client: "3D Entertainment / Sunyata Studio",
    role: "Line Producer",
    year: "2023",
    description:
      "Official Music Video lagu 'Firasat' oleh penyanyi Selfi Yamma di bawah label 3D Entertainment. Produksi bernuansa dramatis dengan tata artistik dan pencahayaan sinematik kuat.",
    posterUrl: "/assets/projects/firasat-selfi-yamma_sunyata-studio/Screenshot_2025-06-17_205521.png",
    featured: true,
    order: 11,
    tags: ["Music Video", "3D Entertainment", "Selfi Yamma"],
    videos: [
      { platform: "youtube", url: "https://youtu.be/yqi4CVUdPIk?si=EydaSdt260MEd79r", label: "Official MV" },
    ],
  },
  {
    slug: "terimalah-salam-pamitku",
    title: "Terimalah Salam Pamitku",
    category: "Music Video",
    client: "SAE Institute Jakarta",
    role: "Producer",
    year: "2024",
    description:
      "Karya video musik naratif emosional bertema perpisahan dan penerimaan dengan pendekatan visual intim dan manajemen set terencana.",
    posterUrl: "/assets/projects/terimalah-salam-pamitku_sae-institute/WhatsApp_Image_2025-01-18_at_21_29_56.jpg",
    featured: false,
    order: 12,
    tags: ["Music Video", "SAE Institute", "Narrative"],
    videos: [
      { platform: "youtube", url: "https://youtu.be/vhJbjb4P1Cc?si=HMwsXlCv2YMRu4jK", label: "Official MV" },
    ],
  },
  {
    slug: "bintang-fajar",
    title: "Bintang Fajar",
    category: "Short Film",
    client: "SAE Institute Jakarta",
    role: "Line Producer",
    year: "2023",
    description:
      "Film pendek fiksi naratif yang mengeksplorasi perjuangan dan dinamika metropolitan dengan pendekatan visual atmosferik malam hari.",
    posterUrl: "/assets/projects/bintang-fajar_sae-institute/WhatsApp_Image_2025-06-16_at_23_41_21.jpg",
    featured: false,
    order: 13,
    tags: ["Short Film", "SAE Institute", "Drama"],
    videos: [
      // TODO: video link belum ada, minta ke Kiki
    ],
  },
  {
    slug: "neon-race",
    title: "Neon Race",
    category: "Short Film",
    client: "SAE Institute Jakarta",
    role: "Clapper / 2nd AC",
    year: "2022",
    description:
      "Karya otomotif aksi dinamis dengan pencahayaan neon malam hari dan teknik rigging kamera berkecepatan tinggi.",
    posterUrl: "/assets/projects/neon-race_sae-institute/shigeru_jpg_neoncar-168.jpg",
    featured: false,
    order: 14,
    tags: ["Short Film", "Action", "Automotive"],
    videos: [
      // TODO: video link belum ada, minta ke Kiki
    ],
  },
  {
    slug: "top-coffee-cappuccino-mini-series",
    title: "Top Coffee Cappuccino Mini Series",
    category: "Series",
    client: "Top Coffee",
    role: "Production Team",
    year: "2024",
    description:
      "Mini series 4 episode untuk produk Top Coffee Cappuccino, dikemas dalam format cerita berseri yang ringan dan relatable untuk audiens media sosial.",
    featured: false,
    order: 15,
    tags: ["Series", "Top Coffee", "Mini Series"],
    videos: [
      { platform: "instagram", url: "https://www.instagram.com/reel/DaVAqiDBrOm/", label: "Eps 1" },
      { platform: "instagram", url: "https://www.instagram.com/reel/DakJKN3yK4k/", label: "Eps 2" },
      { platform: "instagram", url: "https://www.instagram.com/reel/Da2SBxqR8Xd/", label: "Eps 3" },
      { platform: "instagram", url: "https://www.instagram.com/reel/DbIL790hw9U/", label: "Eps 4" },
    ],
  },
  {
    slug: "soklin-pewangi-mini-series",
    title: "Soklin Pewangi Mini Series",
    category: "Series",
    client: "Soklin Pewangi",
    role: "Production Team",
    year: "2024",
    description:
      "Mini series 3 episode untuk Soklin Pewangi, menonjolkan momen keseharian rumah tangga dengan sentuhan storytelling ringan khas konten seri sosial media.",
    featured: false,
    order: 16,
    tags: ["Series", "Soklin", "Mini Series"],
    videos: [
      { platform: "instagram", url: "https://www.instagram.com/reel/DbxtMx3h1_Z/", label: "Eps 1" },
      { platform: "instagram", url: "https://www.instagram.com/reel/DcDn6myh2dI/", label: "Eps 2" },
      { platform: "instagram", url: "https://www.instagram.com/reel/DcVwXJzhZRW/", label: "Eps 3" },
    ],
  },
  {
    slug: "royale-by-soklin-mini-series",
    title: "Royale By Soklin Mini Series",
    category: "Series",
    client: "Royale by Soklin",
    role: "Production Team",
    year: "2024",
    description:
      "Mini series 2 episode untuk lini produk premium Royale by Soklin, dengan eksekusi visual yang lebih elevated dibanding lini Soklin reguler.",
    featured: false,
    order: 17,
    tags: ["Series", "Royale by Soklin", "Mini Series"],
    videos: [
      { platform: "instagram", url: "https://www.instagram.com/reel/DcDu2_5jekB/", label: "Eps 1" },
      { platform: "instagram", url: "https://www.instagram.com/reel/DcP0rDVAPfS/", label: "Eps 2" },
    ],
  },
];

export const filmographyData: FilmographyEntry[] = [
  {
    id: "f-1",
    year: "2026",
    title: "Allianz – Official Music Video",
    type: "Music Video",
    productionHouse: "Berimajinasi Ria",
    directorOrArtist: "Allianz Indonesia",
    notes: "Commercial Music Video"
  },
  {
    id: "f-2",
    year: "2025",
    title: "PUMA x McLaren Racing Campaign",
    type: "Commercial",
    productionHouse: "Aman Studio",
    directorOrArtist: "PUMA x McLaren F1",
    notes: "Livery Reveal & Fashion Shoot"
  },
  {
    id: "f-3",
    year: "2025",
    title: "My Love Bedcover TVC",
    type: "Commercial",
    productionHouse: "Berimajinasi Ria",
    directorOrArtist: "My Love Bedcover",
    notes: "National TV Commercial"
  },
  {
    id: "f-4",
    year: "2025",
    title: "Kopi Kenangan x Drink Beng-beng",
    type: "Commercial",
    productionHouse: "Aman Studio",
    directorOrArtist: "Kopi Kenangan",
    notes: "Social Media Campaign"
  },
  {
    id: "f-5",
    year: "2025",
    title: "The Forestine – Ciputra CitraGarden",
    type: "Commercial",
    productionHouse: "Berimajinasi Ria",
    directorOrArtist: "Ciputra Group",
    notes: "Property Brand Ad"
  },
  {
    id: "f-6",
    year: "2024",
    title: "Darah Nyai",
    type: "Short Film",
    productionHouse: "Imajinarium Pictures",
    directorOrArtist: "Imajinarium Creative Team",
    notes: "Horror / Drama Short"
  },
  {
    id: "f-7",
    year: "2024",
    title: "Love By Rejoice",
    type: "Series",
    productionHouse: "Leo Pictures",
    directorOrArtist: "Rejoice Indonesia",
    notes: "TikTok Mini Series (4 Episodes)"
  },
  {
    id: "f-8",
    year: "2024",
    title: "Top Coffee Cappuccino Mini Series",
    type: "Series",
    productionHouse: "Top Coffee",
    directorOrArtist: "Top Coffee Creative Team",
    notes: "Instagram Mini Series (4 Episodes)"
  },
  {
    id: "f-9",
    year: "2024",
    title: "Soklin Pewangi Mini Series",
    type: "Series",
    productionHouse: "Soklin Pewangi",
    directorOrArtist: "Soklin Creative Team",
    notes: "Instagram Mini Series (3 Episodes)"
  },
  {
    id: "f-10",
    year: "2024",
    title: "Royale By Soklin Mini Series",
    type: "Series",
    productionHouse: "Royale by Soklin",
    directorOrArtist: "Royale Creative Team",
    notes: "Instagram Mini Series (2 Episodes)"
  },
  {
    id: "f-11",
    year: "2024",
    title: "Manifesto Kopi Kenangan",
    type: "Commercial",
    productionHouse: "Aman Studio",
    directorOrArtist: "Kopi Kenangan",
    notes: "Brand Film Manifesto"
  },
  {
    id: "f-12",
    year: "2024",
    title: "Terimalah Salam Pamitku",
    type: "Music Video",
    productionHouse: "SAE Institute Jakarta",
    directorOrArtist: "SAE Film Showcase",
    notes: "Official Music Video"
  },
  {
    id: "f-13",
    year: "2023",
    title: "Reku Relaunch Pack",
    type: "Commercial",
    productionHouse: "Sunyata Studio",
    directorOrArtist: "Reku Indonesia",
    notes: "Brand Campaign & Mini Series"
  },
  {
    id: "f-14",
    year: "2023",
    title: "Harra – Jurus Jitu",
    type: "Music Video",
    productionHouse: "Bloom Pictures",
    directorOrArtist: "Harra (Band)",
    notes: "Official YouTube MV"
  },
  {
    id: "f-15",
    year: "2023",
    title: "Selfi Yamma – Firasat",
    type: "Music Video",
    productionHouse: "Sunyata Studio",
    directorOrArtist: "Selfi Yamma / 3D Ent",
    notes: "Official YouTube MV"
  },
  {
    id: "f-16",
    year: "2023",
    title: "Bintang Fajar",
    type: "Short Film",
    productionHouse: "SAE Institute Jakarta",
    directorOrArtist: "SAE Production",
    notes: "Narrative Short Film"
  },
  {
    id: "f-17",
    year: "2022",
    title: "Neon Race",
    type: "Short Film",
    productionHouse: "SAE Institute Jakarta",
    directorOrArtist: "SAE Team",
    notes: "Action Automotive Short"
  }
];
