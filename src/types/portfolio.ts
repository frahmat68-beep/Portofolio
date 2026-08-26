export type ProjectCategory = 'Short Film' | 'Series' | 'Commercial' | 'Music Video';

export interface ProjectVideo {
  platform: 'youtube' | 'tiktok' | 'instagram' | 'vimeo' | 'direct';
  url: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  client: string | null;
  role: string;
  year?: string;
  description: string;
  posterUrl?: string;
  previewVideoUrl?: string;
  gallery?: string[];
  videos: ProjectVideo[];
  featured?: boolean;
  order?: number;
  tags?: string[];
}

export interface ProductionStill {
  id: string;
  imageUrl: string;
  title: string;
  project?: string;
  aspect?: 'landscape' | 'portrait' | 'square';
}

export interface FilmographyEntry {
  id: string;
  year: string;
  title: string;
  type: 'Short Film' | 'Series' | 'Music Video' | 'Commercial' | 'Documentary';
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
  contact: {
    whatsapp: string;
    whatsappDisplay: string;
    email: string;
    instagram: string;
    linkedin: string;
    showreelUrl: string;
    cvPdfUrl: string;
  };
  stats: {
    totalProductions: string;
    shortFilms: string;
    musicVideos: string;
    experienceYears: string;
  };
}

export interface PortfolioData {
  profile: ProfileData;
  projects: Project[];
  filmography: FilmographyEntry[];
  productionStills: ProductionStill[];
}
