export type ProjectCategory = 'short-film' | 'music-video' | 'commercial' | 'art-dept';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  role: string; // e.g. "Producer", "Line Producer", "Unit Production Manager", "Art Director"
  year: string;
  productionHouse?: string; // e.g. "Seven Production", "Sunyata Studio", "Bloom Pictures"
  director?: string;
  client?: string;
  synopsis: string;
  posterUrl: string;
  videoUrl?: string; // YouTube / Vimeo embed or link
  featured: boolean;
  order: number;
  awards?: string[];
  tags: string[];
  gallery?: string[];
}

export interface FilmographyEntry {
  id: string;
  year: string;
  title: string;
  type: 'Short Film' | 'Music Video' | 'Commercial' | 'Documentary' | 'Other';
  role: string;
  productionHouse: string;
  directorOrArtist?: string;
  notes?: string;
}

export interface ProfileData {
  name: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  roles: string[];
  location: string;
  education: {
    institution: string;
    degree: string;
    period: string;
    details: string;
  };
  contact: {
    whatsapp: string; // e.g. "6285156649015"
    whatsappDisplay: string; // e.g. "+62 851-5664-9015"
    email: string;
    instagram: string; // e.g. "kikiirch"
    linkedin?: string;
    showreelUrl?: string;
    cvPdfUrl?: string;
  };
  stats: {
    totalProductions: string;
    shortFilms: string;
    musicVideos: string;
    experienceYears: string;
  };
  availableForWork: boolean;
  statusText: string;
}

export interface PortfolioData {
  profile: ProfileData;
  projects: Project[];
  filmography: FilmographyEntry[];
}
