'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, ProfileData, Project, FilmographyEntry } from '@/types/portfolio';
import { initialPortfolioData } from '@/data/initialPortfolioData';

interface PortfolioContextType {
  data: PortfolioData;
  isLoading: boolean;
  updateProfile: (profile: ProfileData) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  addFilmography: (item: Omit<FilmographyEntry, 'id'>) => void;
  updateFilmography: (item: FilmographyEntry) => void;
  deleteFilmography: (id: string) => void;
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonString: string) => boolean;
}

const LOCAL_STORAGE_KEY = 'fikri_portfolio_data_v1';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        // Basic schema check
        if (parsed.profile && Array.isArray(parsed.projects) && Array.isArray(parsed.filmography)) {
          setData(parsed);
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
        saveState(parsed);
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
        updateProfile,
        addProject,
        updateProject,
        deleteProject,
        addFilmography,
        updateFilmography,
        deleteFilmography,
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
