'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, ProfileData, Project, FilmographyEntry, ServiceOffering, BTSPhoto } from '@/types/portfolio';
import { initialPortfolioData } from '@/data/initialPortfolioData';

interface PortfolioContextType {
  data: PortfolioData;
  isLoading: boolean;
  adminPin: string;
  updateAdminPin: (newPin: string) => void;
  updateProfile: (profile: ProfileData) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  moveProjectOrder: (id: string, direction: 'up' | 'down') => void;
  addFilmography: (item: Omit<FilmographyEntry, 'id'>) => void;
  updateFilmography: (item: FilmographyEntry) => void;
  deleteFilmography: (id: string) => void;
  addService: (service: Omit<ServiceOffering, 'id'>) => void;
  updateService: (service: ServiceOffering) => void;
  deleteService: (id: string) => void;
  addBTSPhoto: (photo: Omit<BTSPhoto, 'id'>) => void;
  updateBTSPhoto: (photo: BTSPhoto) => void;
  deleteBTSPhoto: (id: string) => void;
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonString: string) => boolean;
}

const LOCAL_STORAGE_KEY = 'fikri_portfolio_data_v2';
const PIN_STORAGE_KEY = 'fikri_admin_pin_v2';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [adminPin, setAdminPin] = useState<string>('1234');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const savedPin = localStorage.getItem(PIN_STORAGE_KEY);
      if (savedPin) {
        setAdminPin(savedPin);
      }

      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.profile && Array.isArray(parsed.projects) && Array.isArray(parsed.filmography)) {
          // Merge with initial data to ensure all new fields like services and btsPhotos exist
          setData({
            ...initialPortfolioData,
            ...parsed,
            services: parsed.services || initialPortfolioData.services,
            btsPhotos: parsed.btsPhotos || initialPortfolioData.btsPhotos,
          });
        }
      }
    } catch (e) {
      console.warn('Failed to load portfolio data from localStorage:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save changes to localStorage
  const saveState = (newData: PortfolioData) => {
    setData(newData);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Failed to save portfolio data to localStorage:', e);
    }
  };

  const updateAdminPin = (newPin: string) => {
    setAdminPin(newPin);
    try {
      localStorage.setItem(PIN_STORAGE_KEY, newPin);
    } catch (e) {
      console.error('Failed to save admin PIN:', e);
    }
  };

  const updateProfile = (newProfile: ProfileData) => {
    saveState({
      ...data,
      profile: newProfile,
    });
  };

  const addProject = (projectInput: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projectInput,
      id: `proj-${Date.now()}`,
    };
    saveState({
      ...data,
      projects: [newProject, ...data.projects],
    });
  };

  const updateProject = (updatedProject: Project) => {
    saveState({
      ...data,
      projects: data.projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)),
    });
  };

  const deleteProject = (id: string) => {
    saveState({
      ...data,
      projects: data.projects.filter((p) => p.id !== id),
    });
  };

  const moveProjectOrder = (id: string, direction: 'up' | 'down') => {
    const index = data.projects.findIndex((p) => p.id === id);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === data.projects.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const newProjects = [...data.projects];
    const temp = newProjects[index];
    newProjects[index] = newProjects[targetIndex];
    newProjects[targetIndex] = temp;

    saveState({
      ...data,
      projects: newProjects,
    });
  };

  const addFilmography = (itemInput: Omit<FilmographyEntry, 'id'>) => {
    const newItem: FilmographyEntry = {
      ...itemInput,
      id: `film-${Date.now()}`,
    };
    saveState({
      ...data,
      filmography: [newItem, ...data.filmography],
    });
  };

  const updateFilmography = (updatedItem: FilmographyEntry) => {
    saveState({
      ...data,
      filmography: data.filmography.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      ),
    });
  };

  const deleteFilmography = (id: string) => {
    saveState({
      ...data,
      filmography: data.filmography.filter((item) => item.id !== id),
    });
  };

  const addService = (serviceInput: Omit<ServiceOffering, 'id'>) => {
    const newService: ServiceOffering = {
      ...serviceInput,
      id: `srv-${Date.now()}`,
    };
    saveState({
      ...data,
      services: [...(data.services || []), newService],
    });
  };

  const updateService = (updatedService: ServiceOffering) => {
    saveState({
      ...data,
      services: (data.services || []).map((s) => (s.id === updatedService.id ? updatedService : s)),
    });
  };

  const deleteService = (id: string) => {
    saveState({
      ...data,
      services: (data.services || []).filter((s) => s.id !== id),
    });
  };

  const addBTSPhoto = (photoInput: Omit<BTSPhoto, 'id'>) => {
    const newPhoto: BTSPhoto = {
      ...photoInput,
      id: `bts-${Date.now()}`,
    };
    saveState({
      ...data,
      btsPhotos: [...(data.btsPhotos || []), newPhoto],
    });
  };

  const updateBTSPhoto = (updatedPhoto: BTSPhoto) => {
    saveState({
      ...data,
      btsPhotos: (data.btsPhotos || []).map((p) => (p.id === updatedPhoto.id ? updatedPhoto : p)),
    });
  };

  const deleteBTSPhoto = (id: string) => {
    saveState({
      ...data,
      btsPhotos: (data.btsPhotos || []).filter((p) => p.id !== id),
    });
  };

  const resetToDefaults = () => {
    saveState(initialPortfolioData);
  };

  const exportDataJson = () => {
    return JSON.stringify(data, null, 2);
  };

  const importDataJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profile && Array.isArray(parsed.projects) && Array.isArray(parsed.filmography)) {
        saveState({
          ...initialPortfolioData,
          ...parsed,
        });
        return true;
      }
      return false;
    } catch (e) {
      console.error('Invalid JSON structure:', e);
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isLoading,
        adminPin,
        updateAdminPin,
        updateProfile,
        addProject,
        updateProject,
        deleteProject,
        moveProjectOrder,
        addFilmography,
        updateFilmography,
        deleteFilmography,
        addService,
        updateService,
        deleteService,
        addBTSPhoto,
        updateBTSPhoto,
        deleteBTSPhoto,
        resetToDefaults,
        exportDataJson,
        importDataJson,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
