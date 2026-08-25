import HeroBio from "@/components/HeroBio";
import StatsBar from "@/components/StatsBar";
import BentoShowcase from "@/components/BentoShowcase";
import BTSGallerySection from "@/components/BTSGallerySection";
import FilmographySection from "@/components/FilmographySection";
import ContactSection from "@/components/ContactSection";
import StickyMobileBar from "@/components/StickyMobileBar";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-gray-100 flex flex-col items-center selection:bg-[#C84B2F]/20 selection:text-[#C84B2F]">
      {/* 1. Hero Section (Showcase Entry) */}
      <HeroBio />

      {/* 2. Stats Bar */}
      <StatsBar />

      {/* 3. Core Showcase (Films, Commercials, MVs) */}
      <BentoShowcase />

      {/* 4. On-Set BTS Raw Collage Grid */}
      <BTSGallerySection />

      {/* 5. Production Archive Table (Condensed Filmography) */}
      <FilmographySection />

      {/* 6. Minimal Footer with Identity Context & Contacts */}
      <ContactSection />

      {/* Sticky Mobile Bar for quick access */}
      <StickyMobileBar />
    </main>
  );
}
