'use client';

import React, { createContext, useContext } from 'react';
import { PortfolioData } from '@/types/portfolio';
import { profileData, projects, filmographyData, productionStills, brandLogos } from '@/data/projects';

interface PortfolioContextType {
  data: PortfolioData;
}

const staticPortfolioData: PortfolioData = {
  profile: profileData,
  projects: projects,
  filmography: filmographyData,
  productionStills: productionStills,
  logos: brandLogos,
};

const PortfolioContext = createContext<PortfolioContextType>({
  data: staticPortfolioData
});

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  return (
    <PortfolioContext.Provider value={{ data: staticPortfolioData }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  return context;
}
