import HeroBio from "@/components/HeroBio";
import BentoShowcase from "@/components/BentoShowcase";
import StillsCarousel from "@/components/StillsCarousel";
import FilmographySection from "@/components/FilmographySection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-gray-100 flex flex-col items-center selection:bg-[#C84B2F]/20 selection:text-[#C84B2F]">
      {/* 1. Hero Section with Full-Bleed Video Ambience & Massive Typography */}
      <HeroBio />

      {/* 2. Featured Works (L&M Living Bento Video/Visual Grid) */}
      <BentoShowcase />

      {/* 3. Visual Vault — Flowing 35mm Stills & On-Set Archive Carousel */}
      <StillsCarousel />

      {/* 4. Production Archive Table (Complete Filmography Logbook) */}
      <FilmographySection />

      {/* 5. Minimalist Footer with Identity Context & Social Links */}
      <ContactSection />
    </main>
  );
}
