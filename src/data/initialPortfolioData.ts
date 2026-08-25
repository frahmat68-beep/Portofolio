import { PortfolioData } from '@/types/portfolio';

export const initialPortfolioData: PortfolioData = {
  profile: {
    name: "Fikri Mulya Rachmat",
    tagline: "Film Producer • Line Producer • Unit Production Manager • Art Director",
    bio: "Passionate Film Producer and Line Producer with experience across 30+ short films, music videos, and commercial productions. Graduated from SAE Institute Jakarta (Diploma of Film), skilled in end-to-end production pipeline, budgeting, crew management, and visual storytelling.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    roles: [
      "Film Producer",
      "Line Producer",
      "Unit Production Manager (UPM)",
      "Art Director",
      "Location Manager"
    ],
    location: "Jakarta & Depok, Indonesia",
    education: {
      institution: "SAE Institute Jakarta",
      degree: "Diploma of Film",
      period: "2021 – 2024",
      details: "Comprehensive film production training covering producing, cinematography, directing, line producing, and post-production management."
    },
    contact: {
      whatsapp: "6285156649015",
      whatsappDisplay: "+62 851-5664-9015",
      email: "frahmat68@gmail.com",
      instagram: "kikiirch",
      linkedin: "https://www.linkedin.com/in/fikrimulyarachmat",
      showreelUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      cvPdfUrl: "#"
    },
    stats: {
      totalProductions: "30+",
      shortFilms: "12+",
      musicVideos: "10+",
      experienceYears: "4+ Years"
    },
    availableForWork: true,
    statusText: "Available for New Projects & Collaborations"
  },
  services: [
    {
      id: "srv-1",
      title: "Film & Narrative Producing",
      role: "Creative Producer",
      description: "Menangani keseluruhan lifecycle produksi film dari pra-produksi, budgeting, casting talent, manajemen kru, perizinan lokasi, hingga delivery file master ke festival atau platform distribusi.",
      deliverables: ["Comprehensive Budget Sheet", "Crew & Equipment Hiring", "Production Timeline & Schedule", "Post-production Supervision"],
      iconName: "Clapperboard"
    },
    {
      id: "srv-2",
      title: "Line Producing & Set Management",
      role: "Line Producer / UPM",
      description: "Pengawasan operasional harian di set syuting untuk memastikan jadwal berjalan tepat waktu (on-time), efisiensi biaya, keselamatan kru, katering, serta koordinasi teknis antar departemen.",
      deliverables: ["Daily Call Sheets & Script Breakdown", "On-Set Logistics & Transport", "Location Permits & Legal", "Department Problem Solving"],
      iconName: "Film"
    },
    {
      id: "srv-3",
      title: "Music Video & Brand Commercials",
      role: "Commercial Producer / UPM",
      description: "Eksekusi visual dinamis untuk label musik, musisi independen, dan brand agensi dengan timeline cepat, manajemen artis, dan standar estetika sinematik tinggi.",
      deliverables: ["Visual Mood & Treatment Planning", "Artist & Talent Care", "Agency & Client Coordination", "Fast-Turnaround Delivery"],
      iconName: "Briefcase"
    },
    {
      id: "srv-4",
      title: "Art Direction & Production Design",
      role: "Art Director / Stylist",
      description: "Perancangan konsep visual latar, set dressing, props styling, serta wardrobe untuk membangun identitas visual karakter dan suasana cerita yang otentik.",
      deliverables: ["Set Concept & Moodboards", "Prop Sourcing & Fabrication", "Wardrobe & Styling Guide", "On-Set Dressing & Maintenance"],
      iconName: "Palette"
    }
  ],
  btsPhotos: [
    {
      id: "bts-1",
      title: "PUMA x McLaren: Livery Reveal",
      caption: "Behind the scenes shooting PUMA x McLaren SEA campaign & collection launch di Senayan City.",
      imageUrl: "/assets/projects/puma-x-mclaren/Built_for_the_grid_Styled.jpg",
      tag: "Commercial / Fashion"
    },
    {
      id: "bts-2",
      title: "PUMA x McLaren: Grid & Street Looks",
      caption: "Dokumentasi styling & wardrobe talent SEA campaign PUMA Motorsport.",
      imageUrl: "/assets/projects/puma-x-mclaren/Different_streets_Same_sp.jpg",
      tag: "Wardrobe & Styling"
    },
    {
      id: "bts-3",
      title: "DDH: Menjadi Manusia",
      caption: "Dokumentasi on-set series drama naratif DDH (Dari Dekat Hati).",
      imageUrl: "/assets/projects/ddh/Menjadi_Manusia.jpeg",
      tag: "Narrative Set"
    },
    {
      id: "bts-4",
      title: "Art Dept & Props Styling: Bullet In A Gun",
      caption: "Detailing wardrobe antagonis dan penataan ruang set bertema gritty action.",
      imageUrl: "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=800&auto=format&fit=crop",
      tag: "Art Direction"
    }
  ],
  projects: [
    {
      id: "jurus-jitu-harra",
      title: "Harra – Jurus Jitu",
      category: "music-video",
      categoryLabel: "Music Video",
      role: "Unit Production Manager (UPM)",
      year: "2023",
      productionHouse: "Bloom Pictures",
      director: "Bloom Pictures Directing Team",
      synopsis: "Official Music Video 'Jurus Jitu' oleh band Harra. Konsep visual dinamis dan penuh warna dengan koreografi set. Mengelola seluruh kebutuhan teknis, penjadwalan kru di set, pergerakan alat berat kamera, dan operasional produksi.",
      posterUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop",
      videoUrl: "https://youtu.be/9xd-DQMDrHw?si=t-bcApYGSYEX8B_j",
      featured: true,
      order: 1,
      tags: ["Music Video", "UPM", "Bloom Pictures", "Harra"]
    },
    {
      id: "firasat-selfi-yamma",
      title: "Selfi Yamma – Firasat",
      category: "music-video",
      categoryLabel: "Music Video",
      role: "Line Producer",
      year: "2023",
      productionHouse: "Seven Production / Sunyata Studio",
      client: "3D Entertainment",
      director: "Seven Production",
      synopsis: "Official Music Video lagu 'Firasat' oleh penyanyi Selfi Yamma di bawah label 3D Entertainment. Mengorganisir timeline produksi ketat, koordinasi teknis set, dan memastikan seluruh kebutuhan adegan dramatis terpenuhi.",
      posterUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop",
      videoUrl: "https://youtu.be/yqi4CVUdPIk?si=EydaSdt260MEd79r",
      featured: true,
      order: 2,
      tags: ["Music Video", "Line Producer", "3D Entertainment", "Selfi Yamma"]
    },
    {
      id: "temu-bertamu-gia-sabila",
      title: "Gia Sabila – Temu Bertamu",
      category: "music-video",
      categoryLabel: "Music Video",
      role: "Art Crew / Wardrobe Ass.",
      year: "2023",
      productionHouse: "Trinity Optima Production",
      director: "Trinity Optima Team",
      client: "Trinity Optima Production",
      synopsis: "Official Music Video 'Temu Bertamu' oleh Gia Sabila. Bertanggung jawab atas penataan wardrobe, artist care, mood styling props, dan koordinasi departemen artistik di bawah naungan label rekaman Trinity Optima Production.",
      posterUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop",
      videoUrl: "https://youtu.be/vhJbjb4P1Cc?si=HMwsXlCv2YMRu4jK",
      featured: true,
      order: 3,
      tags: ["Music Video", "Trinity Optima", "Art Dept", "Wardrobe"]
    },
    {
      id: "puma-x-mclaren",
      title: "PUMA x McLaren F1 Campaign",
      category: "commercial",
      categoryLabel: "Commercial / Brand Campaign",
      role: "Production & Stylist Team",
      year: "2025",
      productionHouse: "PUMA Indonesia",
      client: "PUMA x McLaren Racing",
      synopsis: "Kampanye digital & brand activation PUMA x McLaren Racing Collection SEA. Eksekusi video campaign berenergi tinggi, peliputan livery reveal MCL40 di The Crystal Senayan City Mall, serta lifestyle fashion shoot.",
      posterUrl: "/assets/projects/puma-x-mclaren/Check_out_the_MCL40_and_t.jpg",
      videoUrl: "/assets/projects/puma-x-mclaren/The_new_PUMA_x_McLaren_Ra.mp4",
      featured: true,
      order: 4,
      tags: ["Commercial", "PUMA", "McLaren F1", "Fashion & Motorsport"]
    },
    {
      id: "allianz-music-video",
      title: "Allianz – Official Music Video 2026",
      category: "music-video",
      categoryLabel: "Commercial / Music Video",
      role: "Line Producer / UPM",
      year: "2026",
      productionHouse: "Berimajinasi Ria",
      client: "Allianz Indonesia",
      synopsis: "Proyek video musik korporat dan brand campaign berskala besar untuk Allianz Indonesia. Menangani operasional set, manajemen talent & extras, jadwal syuting, dan koordinasi langsung dengan agensi serta client.",
      posterUrl: "/assets/projects/allianz/hvfeIL15AY4ZehkQrkI7FNSOf.png",
      videoUrl: "/assets/projects/allianz/Allianz_-_Music_Video_202.mp4",
      featured: true,
      order: 5,
      tags: ["Music Video", "Commercial", "Allianz", "Berimajinasi Ria"]
    },
    {
      id: "my-love-bedcover-tvc",
      title: "My Love Bedcover TVC",
      category: "commercial",
      categoryLabel: "TV Commercial",
      role: "Line Producer / UPM",
      year: "2025",
      productionHouse: "Berimajinasi Ria",
      client: "My Love Bedcover",
      synopsis: "Iklan komersial TVC My Love Bedcover. Memimpin manajemen jadwal shooting harian, koordinasi talent utama, logistik studio set indoor, dan memastikan standar visual komersial terbaik.",
      posterUrl: "/assets/projects/my-love-bedcover/images_1.jpeg",
      videoUrl: "/assets/projects/my-love-bedcover/TVC_for_My_Love_mylovebed.mp4",
      featured: true,
      order: 6,
      tags: ["TVC", "Commercial", "My Love", "Berimajinasi Ria"]
    },
    {
      id: "kopken-x-bengbeng",
      title: "Kopi Kenangan x Beng Beng",
      category: "commercial",
      categoryLabel: "Digital Commercial",
      role: "Production Team / UPM",
      year: "2025",
      productionHouse: "Commercial Team",
      client: "Kopi Kenangan & Drink Beng Beng",
      synopsis: "Digital ads campaign kolaborasi menu spesial Kopi Kenangan dengan rasa cokelat ikonik Beng Beng. Mengatur kebutuhan food styling, timeline shooting komersial cepat, dan delivery asset media sosial.",
      posterUrl: "/assets/projects/kopken-x-bengbeng/639905945_184269055961841.jpg",
      videoUrl: "/assets/projects/kopken-x-bengbeng/Nikmati_rasa_cokelat_ikon.mp4",
      featured: false,
      order: 7,
      tags: ["Digital Ads", "Food & Beverage", "Kopi Kenangan", "Commercial"]
    },
    {
      id: "the-forestine-ciputra",
      title: "The Forestine – Ciputra Citygarden",
      category: "commercial",
      categoryLabel: "Digital Ads / Property",
      role: "Production Team / UPM",
      year: "2025",
      productionHouse: "Digital Ads Production",
      client: "Ciputra Group (The Forestine)",
      synopsis: "Digital commercial campaign untuk hunian The Forestine di Ciputra Citygarden. Pengambilan gambar arsitektur lanskap, penataan talent keluarga, dan koordinasi perizinan lokasi di kawasan perumahan.",
      posterUrl: "/assets/projects/the-forestine-ciputra-citygarden/images.jpeg",
      videoUrl: "/assets/projects/the-forestine-ciputra-citygarden/Ciputra_-_The_Forestine_D.mp4",
      featured: false,
      order: 8,
      tags: ["Commercial", "Property", "Ciputra", "Digital Ads"]
    },
    {
      id: "manifesto-kopi-kenangan",
      title: "Manifesto Kopi Kenangan",
      category: "commercial",
      categoryLabel: "Brand Manifesto",
      role: "Production Team",
      year: "2024",
      productionHouse: "Commercial Production",
      client: "Kopi Kenangan",
      synopsis: "Video profil manifesto brand Kopi Kenangan yang menampilkan dedikasi cita rasa lokal. Mengelola alur pengambilan gambar di berbagai outlet dan interaksi barista otentik.",
      posterUrl: "/assets/projects/manifesto-kopi-kenangan/images.png",
      videoUrl: "/assets/projects/manifesto-kopi-kenangan/Manifesto_Kopi_Kenangan.mp4",
      featured: false,
      order: 9,
      tags: ["Brand Film", "Commercial", "Kopi Kenangan"]
    },
    {
      id: "reku-relaunch-pack",
      title: "REKU Relaunch Pack",
      category: "commercial",
      categoryLabel: "Commercial / Brand Ad",
      role: "Production Assistant",
      year: "2023",
      productionHouse: "Sunyata Studio",
      client: "REKU Indonesia (Crypto & Investment Platform)",
      synopsis: "Kampanye komersial peluncuran ulang brand aplikasi REKU. Membantu tim produser dan sutradara dalam koordinasi logistik komersial profesional, prop sourcing, manajemen talent, dan timeline cepat khas agensi periklanan.",
      posterUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
      videoUrl: "/assets/projects/reku/Reku_Devina.mp4",
      featured: false,
      order: 10,
      tags: ["Commercial", "Sunyata Studio", "Brand Campaign", "Fintech"]
    },
    {
      id: "ddh-web-series",
      title: "DDH (Dari Dekat Hati) Series",
      category: "short-film",
      categoryLabel: "Web Series / Narrative",
      role: "Line Producer / Production Team",
      year: "2024",
      productionHouse: "Narrative Studio",
      director: "DDH Creative Team",
      synopsis: "Web series naratif antologi kehidupan sehari-hari (Goceng, Lupa Memberi Makan Kucing, Menjadi Laki-Laki, Panggilan Tak Terduga, Persimpangan). Mengatur jadwal shooting multi-episode, perizinan lokasi jalanan & perumahan, serta logistik kru.",
      posterUrl: "/assets/projects/ddh/Menjadi_Manusia.jpeg",
      videoUrl: "/assets/projects/ddh/Menjadi_Laki_-_Laki.mp4",
      featured: false,
      order: 11,
      tags: ["Web Series", "Narrative", "Drama", "Multi-episode"]
    },
    {
      id: "anonymous-love-rejoice",
      title: "Anonymous Love By Rejoice",
      category: "short-film",
      categoryLabel: "Mini Series / Branded Film",
      role: "Production Team / Line Producer",
      year: "2024",
      productionHouse: "Creative Agency & Studio",
      client: "Rejoice Indonesia",
      synopsis: "Branded short movie series 'Anonymous Love' (Ep 1 - 4) yang memadukan cerita cinta remaja modern dengan penempatan brand natural. Mengkoordinasikan continuous shooting schedule dan kesinambungan set antar episode.",
      posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop",
      videoUrl: "/assets/projects/anonymous-love-by-rejoice/Ep1.mp4",
      featured: false,
      order: 12,
      tags: ["Branded Film", "Rejoice", "Mini Series", "Romance"]
    },
    {
      id: "keepsakes",
      title: "Keepsakes",
      category: "short-film",
      categoryLabel: "Short Film",
      role: "Producer",
      year: "2024",
      productionHouse: "SAE Indonesia Production",
      director: "Student Graduation Showcase",
      synopsis: "Sebuah film pendek drama emosional yang mengeksplorasi memori masa lalu, hubungan personal, dan kehilangan yang membekas. Menangani keseluruhan proses produksi dari budgeting, casting, crew hiring, perizinan lokasi, hingga final master delivery.",
      posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop",
      videoUrl: "",
      featured: false,
      order: 13,
      awards: ["SAE Jakarta Graduation Showcase 2024"],
      tags: ["Drama", "Narrative", "Producing", "Budgeting & Logistics"]
    },
    {
      id: "bullet-in-a-gun",
      title: "Bullet In a Gun",
      category: "art-dept",
      categoryLabel: "Short Film (Art Dept)",
      role: "Art Director",
      year: "2023",
      productionHouse: "Indie Action Drama",
      director: "SAE Production Showcase",
      synopsis: "Film pendek aksi bernuansa gritty. Bertanggung jawab atas perancangan konsep visual latar, props styling, wardrobe styling karakter antagonis & protagonis, serta pembangunan set safe weapon handling.",
      posterUrl: "https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=1000&auto=format&fit=crop",
      videoUrl: "",
      featured: false,
      order: 14,
      tags: ["Art Direction", "Set Design", "Action Drama", "Prop Styling"]
    }
  ],
  filmography: [
    {
      id: "f-1",
      year: "2026",
      title: "Allianz – Official Music Video",
      type: "Music Video",
      role: "Line Producer / UPM",
      productionHouse: "Berimajinasi Ria",
      directorOrArtist: "Allianz Indonesia",
      notes: "Commercial Music Video"
    },
    {
      id: "f-2",
      year: "2025",
      title: "PUMA x McLaren F1 Campaign",
      type: "Commercial",
      role: "Production & Styling",
      productionHouse: "PUMA Indonesia",
      directorOrArtist: "McLaren Mastercard F1",
      notes: "Livery Reveal & Fashion Shoot"
    },
    {
      id: "f-3",
      year: "2025",
      title: "My Love Bedcover TVC",
      type: "Commercial",
      role: "Line Producer / UPM",
      productionHouse: "Berimajinasi Ria",
      directorOrArtist: "My Love Bedcover",
      notes: "National TV Commercial"
    },
    {
      id: "f-4",
      year: "2025",
      title: "Kopi Kenangan x Beng Beng",
      type: "Commercial",
      role: "Production Team / UPM",
      productionHouse: "Commercial Team",
      directorOrArtist: "Kopi Kenangan",
      notes: "Digital Campaign"
    },
    {
      id: "f-5",
      year: "2025",
      title: "The Forestine – Ciputra Citygarden",
      type: "Commercial",
      role: "Production Team",
      productionHouse: "Digital Ads Production",
      directorOrArtist: "Ciputra Group",
      notes: "Property Brand Ad"
    },
    {
      id: "f-6",
      year: "2024",
      title: "DDH (Dari Dekat Hati) Series",
      type: "Short Film",
      role: "Line Producer / Team",
      productionHouse: "Narrative Studio",
      directorOrArtist: "DDH Team",
      notes: "Anthology Web Series (5 Episodes)"
    },
    {
      id: "f-7",
      year: "2024",
      title: "Anonymous Love By Rejoice",
      type: "Short Film",
      role: "Production Team",
      productionHouse: "Creative Agency",
      directorOrArtist: "Rejoice Indonesia",
      notes: "Branded Mini Series (Ep 1-4)"
    },
    {
      id: "f-8",
      year: "2024",
      title: "Manifesto Kopi Kenangan",
      type: "Commercial",
      role: "Production Team",
      productionHouse: "Commercial Production",
      directorOrArtist: "Kopi Kenangan",
      notes: "Brand Film"
    },
    {
      id: "f-9",
      year: "2024",
      title: "Keepsakes",
      type: "Short Film",
      role: "Producer",
      productionHouse: "SAE Indonesia",
      directorOrArtist: "SAE Graduation Film",
      notes: "Full production management & budgeting"
    },
    {
      id: "f-10",
      year: "2024",
      title: "Terimalah Salam Pamitku",
      type: "Music Video",
      role: "Producer",
      productionHouse: "Independent Label",
      directorOrArtist: "Music Video Project",
      notes: "End-to-end Producer"
    },
    {
      id: "f-11",
      year: "2023",
      title: "Harra – Jurus Jitu",
      type: "Music Video",
      role: "Unit Production Manager (UPM)",
      productionHouse: "Bloom Pictures",
      directorOrArtist: "Harra (Band)",
      notes: "Official YouTube MV"
    },
    {
      id: "f-12",
      year: "2023",
      title: "Selfi Yamma – Firasat",
      type: "Music Video",
      role: "Line Producer",
      productionHouse: "Seven Production / Sunyata Studio",
      directorOrArtist: "Selfi Yamma / 3D Ent",
      notes: "Official YouTube MV"
    },
    {
      id: "f-13",
      year: "2023",
      title: "Gia Sabila – Temu Bertamu",
      type: "Music Video",
      role: "Art Crew / Wardrobe Ass.",
      productionHouse: "Trinity Optima Production",
      directorOrArtist: "Gia Sabila",
      notes: "Official YouTube MV"
    },
    {
      id: "f-14",
      year: "2023",
      title: "REKU Relaunch Pack",
      type: "Commercial",
      role: "Production Assistant",
      productionHouse: "Sunyata Studio",
      directorOrArtist: "REKU Indonesia",
      notes: "Fintech brand campaign"
    },
    {
      id: "f-15",
      year: "2023",
      title: "Love, In a Falling Way",
      type: "Short Film",
      role: "Line Producer",
      productionHouse: "Seven Production / Karyakarsa",
      directorOrArtist: "Seven Production",
      notes: "Collaborative platform release"
    },
    {
      id: "f-16",
      year: "2023",
      title: "The Claymaker",
      type: "Documentary",
      role: "Line Producer",
      productionHouse: "SAE Documentary Showcase",
      directorOrArtist: "Doc Team",
      notes: "Traditional artisan feature"
    },
    {
      id: "f-17",
      year: "2023",
      title: "Alsa – Unworthy",
      type: "Music Video",
      role: "Production Assistant / Art Crew",
      productionHouse: "Independent",
      directorOrArtist: "Alsa",
      notes: "Concept styling & set"
    },
    {
      id: "f-18",
      year: "2023",
      title: "Bullet In a Gun",
      type: "Short Film",
      role: "Art Director",
      productionHouse: "SAE Production Showcase",
      directorOrArtist: "SAE Team",
      notes: "Action set & prop styling"
    },
    {
      id: "f-19",
      year: "2023",
      title: "Jakarta Tapes",
      type: "Short Film",
      role: "Location Manager",
      productionHouse: "Indie Project",
      directorOrArtist: "Jakarta Story",
      notes: "Permit & urban venue management"
    },
    {
      id: "f-20",
      year: "2022",
      title: "A Girl's Bedroom",
      type: "Short Film",
      role: "Line Producer",
      productionHouse: "Seven Production",
      directorOrArtist: "Seven Production",
      notes: "Psychological drama"
    },
    {
      id: "f-21",
      year: "2022",
      title: "Bintang Fajar",
      type: "Short Film",
      role: "Line Producer",
      productionHouse: "Seven Production",
      directorOrArtist: "Seven Production",
      notes: "City narrative"
    },
    {
      id: "f-22",
      year: "2022",
      title: "Neon Race",
      type: "Short Film",
      role: "Clapper / 2nd AC",
      productionHouse: "SAE Production",
      directorOrArtist: "SAE Team",
      notes: "Technical camera dept"
    },
    {
      id: "f-23",
      year: "2022",
      title: "Remedi",
      type: "Short Film",
      role: "Talent & Production Runner",
      productionHouse: "Indie Short",
      directorOrArtist: "Remedi Project",
      notes: "On-set production"
    }
  ]
};
