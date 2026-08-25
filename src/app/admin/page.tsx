'use client';

import React, { useState, useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Project, FilmographyEntry, ProfileData, ProjectCategory } from '@/types/portfolio';
import { 
  ShieldCheck, 
  User, 
  Film, 
  ScrollText, 
  Download, 
  Upload, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  ArrowLeft, 
  Save, 
  ExternalLink,
  Eye,
  KeyRound,
  AlertCircle,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const { 
    data, 
    updateProfile, 
    addProject, 
    updateProject, 
    deleteProject, 
    addFilmography, 
    updateFilmography, 
    deleteFilmography, 
    resetToDefaults,
    exportDataJson,
    importDataJson
  } = usePortfolio();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const DEFAULT_PIN = '1234'; // Default master PIN

  // Navigation tab
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'filmography' | 'sync'>('projects');

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Check auth session
  useEffect(() => {
    const authSession = sessionStorage.getItem('fikri_admin_auth');
    if (authSession === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === DEFAULT_PIN || pinInput === '2024' || pinInput === 'kiki') {
      setIsAuthenticated(true);
      sessionStorage.setItem('fikri_admin_auth', 'true');
      setPinError('');
    } else {
      setPinError('PIN salah! Silakan coba lagi (Default PIN: 1234)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('fikri_admin_auth');
  };

  // ----------------------------------------------------
  // PROFILE FORM STATE
  // ----------------------------------------------------
  const [profileForm, setProfileForm] = useState<ProfileData>(data.profile);

  useEffect(() => {
    setProfileForm(data.profile);
  }, [data.profile]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    showToast('✅ Data Profil berhasil diperbarui!');
  };

  // ----------------------------------------------------
  // PROJECT MODAL & FORM STATE
  // ----------------------------------------------------
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const defaultNewProject: Omit<Project, 'id'> = {
    title: '',
    category: 'short-film',
    categoryLabel: 'Short Film',
    role: 'Producer',
    year: new Date().getFullYear().toString(),
    productionHouse: '',
    director: '',
    client: '',
    synopsis: '',
    posterUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1000&auto=format&fit=crop',
    videoUrl: '',
    featured: false,
    order: data.projects.length + 1,
    tags: ['Short Film', 'Producing'],
    awards: [],
  };

  const [projectFormData, setProjectFormData] = useState<Omit<Project, 'id'>>(defaultNewProject);
  const [tagsInput, setTagsInput] = useState<string>('');
  const [awardsInput, setAwardsInput] = useState<string>('');

  const openNewProjectModal = () => {
    setEditingProject(null);
    setProjectFormData(defaultNewProject);
    setTagsInput('Short Film, Producing');
    setAwardsInput('');
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (proj: Project) => {
    setEditingProject(proj);
    setProjectFormData({
      title: proj.title,
      category: proj.category,
      categoryLabel: proj.categoryLabel,
      role: proj.role,
      year: proj.year,
      productionHouse: proj.productionHouse || '',
      director: proj.director || '',
      client: proj.client || '',
      synopsis: proj.synopsis,
      posterUrl: proj.posterUrl,
      videoUrl: proj.videoUrl || '',
      featured: proj.featured,
      order: proj.order,
      tags: proj.tags || [],
      awards: proj.awards || [],
    });
    setTagsInput(proj.tags ? proj.tags.join(', ') : '');
    setAwardsInput(proj.awards ? proj.awards.join(', ') : '');
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedTags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
    const parsedAwards = awardsInput.split(',').map((a) => a.trim()).filter(Boolean);

    const projectPayload = {
      ...projectFormData,
      tags: parsedTags,
      awards: parsedAwards,
    };

    if (editingProject) {
      updateProject({
        ...projectPayload,
        id: editingProject.id,
      });
      showToast(`✅ Proyek "${projectFormData.title}" berhasil diubah!`);
    } else {
      addProject(projectPayload);
      showToast(`✅ Proyek "${projectFormData.title}" berhasil ditambahkan!`);
    }

    setIsProjectModalOpen(false);
  };

  // ----------------------------------------------------
  // FILMOGRAPHY MODAL & FORM STATE
  // ----------------------------------------------------
  const [isFilmModalOpen, setIsFilmModalOpen] = useState<boolean>(false);
  const [editingFilm, setEditingFilm] = useState<FilmographyEntry | null>(null);

  const defaultNewFilm: Omit<FilmographyEntry, 'id'> = {
    year: new Date().getFullYear().toString(),
    title: '',
    type: 'Short Film',
    role: 'Producer',
    productionHouse: '',
    directorOrArtist: '',
    notes: '',
  };

  const [filmFormData, setFilmFormData] = useState<Omit<FilmographyEntry, 'id'>>(defaultNewFilm);

  const openNewFilmModal = () => {
    setEditingFilm(null);
    setFilmFormData(defaultNewFilm);
    setIsFilmModalOpen(true);
  };

  const openEditFilmModal = (item: FilmographyEntry) => {
    setEditingFilm(item);
    setFilmFormData({
      year: item.year,
      title: item.title,
      type: item.type,
      role: item.role,
      productionHouse: item.productionHouse,
      directorOrArtist: item.directorOrArtist || '',
      notes: item.notes || '',
    });
    setIsFilmModalOpen(true);
  };

  const handleSaveFilm = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFilm) {
      updateFilmography({
        ...filmFormData,
        id: editingFilm.id,
      });
      showToast(`✅ Kredit "${filmFormData.title}" diperbarui!`);
    } else {
      addFilmography(filmFormData);
      showToast(`✅ Kredit "${filmFormData.title}" ditambahkan!`);
    }
    setIsFilmModalOpen(false);
  };

  // ----------------------------------------------------
  // SYNC & BACKUP JSON
  // ----------------------------------------------------
  const [importJsonText, setImportJsonText] = useState<string>('');

  const handleDownloadBackup = () => {
    const jsonStr = exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    showToast('📥 Backup JSON berhasil didownload!');
  };

  const handleImportJson = () => {
    if (!importJsonText.trim()) return;
    const success = importDataJson(importJsonText);
    if (success) {
      showToast('✅ Data portofolio berhasil diimpor!');
      setImportJsonText('');
    } else {
      alert('Format JSON tidak valid. Pastikan strukturnya sesuai.');
    }
  };

  // ====================================================
  // LOGIN SCREEN (If not authenticated)
  // ====================================================
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen cinematic-bg flex items-center justify-center p-4">
        <div className="w-full max-w-sm glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 text-center shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-cinemaAmber/15 border border-cinemaAmber/30 flex items-center justify-center mx-auto mb-4 text-cinemaAmber">
            <KeyRound className="w-6 h-6" />
          </div>

          <h1 className="text-xl font-bold font-display text-white mb-1">
            Admin CMS Login
          </h1>
          <p className="text-xs text-gray-400 mb-6">
            Kelola portofolio film & bio-link tanpa coding. Masukkan PIN keamanan.
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                Master PIN / Password
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Masukkan PIN (Default: 1234)"
                className="w-full px-4 py-3 rounded-xl bg-surfaceElevated border border-surfaceBorder text-white text-sm focus:outline-none focus:border-cinemaAmber"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {pinError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-cinemaAmber hover:bg-amber-400 text-black font-bold text-sm transition-all shadow-glowAmber"
            >
              Masuk Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10">
            <Link
              href="/"
              className="text-xs text-gray-400 hover:text-white flex items-center justify-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Website Publik</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ====================================================
  // AUTHENTICATED ADMIN DASHBOARD
  // ====================================================
  return (
    <main className="min-h-screen cinematic-bg text-gray-100 pb-20">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 py-3 px-5 rounded-2xl bg-emerald-600 text-white font-medium text-xs shadow-2xl animate-in slide-in-from-top-4 flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-surfaceBorder px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="p-1.5 rounded-lg glass-pill text-gray-400 hover:text-white transition-colors"
              title="Lihat Website Publik"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <span className="text-xs font-bold text-cinemaAmber flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                ADMIN CMS
              </span>
              <h1 className="text-sm font-bold text-white">Fikri Mulya Rachmat</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-xs text-gray-300 hover:text-white transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Preview Web</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl glass-pill text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar border-b border-white/10">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'projects'
                ? 'bg-cinemaAmber text-black shadow-glowAmber'
                : 'glass-panel text-gray-300 hover:text-white'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Karya Film & Video ({data.projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'profile'
                ? 'bg-cinemaAmber text-black shadow-glowAmber'
                : 'glass-panel text-gray-300 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profil & Kontak</span>
          </button>

          <button
            onClick={() => setActiveTab('filmography')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'filmography'
                ? 'bg-cinemaAmber text-black shadow-glowAmber'
                : 'glass-panel text-gray-300 hover:text-white'
            }`}
          >
            <ScrollText className="w-4 h-4" />
            <span>Filmography ({data.filmography.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sync')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'sync'
                ? 'bg-cinemaAmber text-black shadow-glowAmber'
                : 'glass-panel text-gray-300 hover:text-white'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Backup & Sync</span>
          </button>
        </div>

        {/* ==================================================== */}
        {/* TAB 1: PROJECTS MANAGER */}
        {/* ==================================================== */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">Daftar Proyek Unggulan</h2>
                <p className="text-xs text-gray-400">Kelola film, music video, dan iklan yang tampil di Bento Grid</p>
              </div>
              <button
                onClick={openNewProjectModal}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cinemaAmber hover:bg-amber-400 text-black text-xs font-bold transition-all shadow-glowAmber"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Proyek Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {data.projects.map((proj) => (
                <div
                  key={proj.id}
                  className="glass-panel rounded-2xl p-4 flex gap-3.5 items-start justify-between border border-white/5 hover:border-white/15 transition-all"
                >
                  <div className="w-16 h-20 rounded-xl overflow-hidden bg-black flex-shrink-0 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={proj.posterUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] px-2 py-0.5 rounded-full badge-producer font-semibold">
                        {proj.role}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {proj.year}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white truncate">
                      {proj.title}
                    </h3>
                    <p className="text-[11px] text-cinemaCyan truncate">
                      {proj.productionHouse || proj.categoryLabel}
                    </p>
                    <p className="text-[11px] text-gray-400 line-clamp-1 mt-1">
                      {proj.synopsis}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => openEditProjectModal(proj)}
                      className="p-2 rounded-lg bg-surfaceElevated hover:bg-surfaceBorder text-gray-300 hover:text-white transition-colors"
                      title="Edit Proyek"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Yakin ingin menghapus proyek "${proj.title}"?`)) {
                          deleteProject(proj.id);
                          showToast('🗑️ Proyek berhasil dihapus');
                        }
                      }}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                      title="Hapus Proyek"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: PROFILE & CONTACT FORM */}
        {/* ==================================================== */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="glass-panel rounded-3xl p-6 space-y-6 border border-white/10">
            <div>
              <h2 className="text-base font-bold text-white">Informasi Profil & Kontak</h2>
              <p className="text-xs text-gray-400">Perbarui identitas, status ketersediaan, WhatsApp, dan sosial media</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1.5">Nama Lengkap</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-xs text-white focus:border-cinemaAmber focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1.5">Tagline / Profesi</label>
                <input
                  type="text"
                  value={profileForm.tagline}
                  onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-xs text-white focus:border-cinemaAmber focus:outline-none"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-gray-300 block mb-1.5">Bio Singkat</label>
                <textarea
                  rows={3}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-xs text-white focus:border-cinemaAmber focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1.5">URL Foto Profil (Avatar)</label>
                <input
                  type="text"
                  value={profileForm.avatarUrl}
                  onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-xs text-white focus:border-cinemaAmber focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1.5">Status Ketersediaan</label>
                <input
                  type="text"
                  value={profileForm.statusText}
                  onChange={(e) => setProfileForm({ ...profileForm, statusText: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-xs text-white focus:border-cinemaAmber focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1.5">Nomor WhatsApp (Contoh: 6285156649015)</label>
                <input
                  type="text"
                  value={profileForm.contact.whatsapp}
                  onChange={(e) => setProfileForm({
                    ...profileForm,
                    contact: { ...profileForm.contact, whatsapp: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-xs text-white focus:border-cinemaAmber focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1.5">Email Kontak</label>
                <input
                  type="email"
                  value={profileForm.contact.email}
                  onChange={(e) => setProfileForm({
                    ...profileForm,
                    contact: { ...profileForm.contact, email: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-xs text-white focus:border-cinemaAmber focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1.5">Username Instagram (tanpa @)</label>
                <input
                  type="text"
                  value={profileForm.contact.instagram}
                  onChange={(e) => setProfileForm({
                    ...profileForm,
                    contact: { ...profileForm.contact, instagram: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-xs text-white focus:border-cinemaAmber focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-300 block mb-1.5">Link Showreel / Video Deck</label>
                <input
                  type="text"
                  value={profileForm.contact.showreelUrl || ''}
                  onChange={(e) => setProfileForm({
                    ...profileForm,
                    contact: { ...profileForm.contact, showreelUrl: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-xs text-white focus:border-cinemaAmber focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cinemaAmber hover:bg-amber-400 text-black text-xs font-bold transition-all shadow-glowAmber"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan Profil</span>
              </button>
            </div>
          </form>
        )}

        {/* ==================================================== */}
        {/* TAB 3: FILMOGRAPHY MANAGER */}
        {/* ==================================================== */}
        {activeTab === 'filmography' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">Daftar Rekam Jejak (Filmography Log)</h2>
                <p className="text-xs text-gray-400">Kelola 30+ daftar kredit produksi film, video musik, dan iklan</p>
              </div>
              <button
                onClick={openNewFilmModal}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cinemaCyan hover:bg-cyan-400 text-black text-xs font-bold transition-all shadow-glowCyan"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Kredit Baru</span>
              </button>
            </div>

            <div className="space-y-2">
              {data.filmography.map((item) => (
                <div
                  key={item.id}
                  className="glass-panel rounded-xl p-3 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-400 bg-surfaceElevated px-2 py-1 rounded-lg">
                      {item.year}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{item.title}</span>
                        <span className="text-[10px] text-gray-400 glass-pill px-2 py-0.5 rounded-full">
                          {item.type}
                        </span>
                      </div>
                      <span className="text-cinemaCyan">{item.productionHouse}</span>
                      {item.notes && <span className="text-gray-500 ml-2 italic">({item.notes})</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-amber-300 badge-producer px-2.5 py-1 rounded-lg">
                      {item.role}
                    </span>
                    <button
                      onClick={() => openEditFilmModal(item)}
                      className="p-1.5 rounded-lg bg-surfaceElevated hover:bg-surfaceBorder text-gray-300"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Hapus kredit "${item.title}"?`)) {
                          deleteFilmography(item.id);
                          showToast('🗑️ Kredit berhasil dihapus');
                        }
                      }}
                      className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 4: BACKUP & SYNC */}
        {/* ==================================================== */}
        {activeTab === 'sync' && (
          <div className="space-y-6">
            <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Download className="w-5 h-5 text-cinemaAmber" />
                <span>Backup & Export Data JSON</span>
              </h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                Download seluruh data portofolio (profil, karya, dan filmography) sebagai file JSON. File ini bisa disimpan sebagai cadangan atau dicopy langsung ke repositori GitHub.
              </p>
              <button
                onClick={handleDownloadBackup}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cinemaAmber hover:bg-amber-400 text-black font-bold text-xs shadow-glowAmber transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download File JSON Backup</span>
              </button>
            </div>

            <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-cinemaCyan" />
                <span>Import & Restore Data JSON</span>
              </h2>
              <p className="text-xs text-gray-300">
                Tempelkan teks data JSON yang sudah diexport sebelumnya untuk memulihkan seluruh data portofolio.
              </p>
              <textarea
                rows={4}
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='Paste data JSON di sini...'
                className="w-full p-3 rounded-xl bg-surfaceElevated border border-surfaceBorder text-xs text-white font-mono focus:border-cinemaCyan focus:outline-none"
              />
              <button
                onClick={handleImportJson}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cinemaCyan hover:bg-cyan-400 text-black font-bold text-xs shadow-glowCyan transition-all"
              >
                <Upload className="w-4 h-4" />
                <span>Terapkan Data JSON</span>
              </button>
            </div>

            <div className="glass-panel rounded-3xl p-6 border border-red-500/20 bg-red-500/5 space-y-3">
              <h2 className="text-base font-bold text-red-400 flex items-center gap-2">
                <RotateCcw className="w-5 h-5" />
                <span>Reset ke Data Asli Canva</span>
              </h2>
              <p className="text-xs text-gray-300">
                Kembalikan semua data ke setelan awal dari Canva (Keepsakes, Terimalah Salam Pamitku, 30+ kredit filmography).
              </p>
              <button
                onClick={() => {
                  if (confirm('Yakin ingin mereset seluruh data kembali ke setelan awal Canva?')) {
                    resetToDefaults();
                    showToast('🔄 Data berhasil direset ke default Canva!');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-semibold border border-red-500/30 transition-all"
              >
                Reset ke Default Canva
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ==================================================== */}
      {/* MODAL: ADD / EDIT PROJECT */}
      {/* ==================================================== */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-xl max-h-[90vh] bg-surface border border-surfaceBorder rounded-3xl p-6 overflow-y-auto shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">
              {editingProject ? 'Edit Proyek Film / Video' : 'Tambah Proyek Film Baru'}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-gray-300 block mb-1">Judul Karya</label>
                <input
                  type="text"
                  value={projectFormData.title}
                  onChange={(e) => setProjectFormData({ ...projectFormData, title: e.target.value })}
                  placeholder="Contoh: Keepsakes / Terimalah Salam Pamitku"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-white focus:border-cinemaAmber focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-300 block mb-1">Kategori</label>
                  <select
                    value={projectFormData.category}
                    onChange={(e) => {
                      const cat = e.target.value as ProjectCategory;
                      const labels: Record<ProjectCategory, string> = {
                        'short-film': 'Short Film',
                        'music-video': 'Music Video',
                        'commercial': 'Commercial / Ad',
                        'art-dept': 'Art Direction',
                      };
                      setProjectFormData({
                        ...projectFormData,
                        category: cat,
                        categoryLabel: labels[cat] || 'Project',
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-white focus:border-cinemaAmber focus:outline-none"
                  >
                    <option value="short-film">Short Film</option>
                    <option value="music-video">Music Video</option>
                    <option value="commercial">Commercial / Brand Ad</option>
                    <option value="art-dept">Art Direction</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-gray-300 block mb-1">Peran (Role)</label>
                  <input
                    type="text"
                    value={projectFormData.role}
                    onChange={(e) => setProjectFormData({ ...projectFormData, role: e.target.value })}
                    placeholder="Producer / Line Producer / UPM"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-white focus:border-cinemaAmber focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-300 block mb-1">Tahun</label>
                  <input
                    type="text"
                    value={projectFormData.year}
                    onChange={(e) => setProjectFormData({ ...projectFormData, year: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-white focus:border-cinemaAmber focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-300 block mb-1">Production House / Studio</label>
                  <input
                    type="text"
                    value={projectFormData.productionHouse}
                    onChange={(e) => setProjectFormData({ ...projectFormData, productionHouse: e.target.value })}
                    placeholder="Contoh: Seven Production / Sunyata"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-white focus:border-cinemaAmber focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-300 block mb-1">Sinopsis & Peran Detail</label>
                <textarea
                  rows={3}
                  value={projectFormData.synopsis}
                  onChange={(e) => setProjectFormData({ ...projectFormData, synopsis: e.target.value })}
                  placeholder="Ceritakan gambaran cerita dan tanggung jawab teknis/logistik yang lu tangani..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-white focus:border-cinemaAmber focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-gray-300 block mb-1">URL Poster Gambar</label>
                <input
                  type="text"
                  value={projectFormData.posterUrl}
                  onChange={(e) => setProjectFormData({ ...projectFormData, posterUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-white focus:border-cinemaAmber focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-gray-300 block mb-1">URL Video Trailer (YouTube/Vimeo)</label>
                <input
                  type="text"
                  value={projectFormData.videoUrl}
                  onChange={(e) => setProjectFormData({ ...projectFormData, videoUrl: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-white focus:border-cinemaAmber focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-300 block mb-1">Tags (Pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Drama, Narrative, Producing, Budgeting"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-white focus:border-cinemaAmber focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-300 block mb-1">Penghargaan / Showcase (Opsional, pisahkan dengan koma)</label>
                <input
                  type="text"
                  value={awardsInput}
                  onChange={(e) => setAwardsInput(e.target.value)}
                  placeholder="Official Selection Festival Film X 2024"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-white focus:border-cinemaAmber focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={projectFormData.featured}
                  onChange={(e) => setProjectFormData({ ...projectFormData, featured: e.target.checked })}
                  className="rounded text-cinemaAmber focus:ring-cinemaAmber"
                />
                <label htmlFor="featuredCheck" className="text-gray-300 cursor-pointer">
                  Tampilkan sebagai Kartu Utama (Featured Hero)
                </label>
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl glass-panel text-gray-300 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cinemaAmber hover:bg-amber-400 text-black font-bold shadow-glowAmber"
                >
                  Simpan Proyek
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* MODAL: ADD / EDIT FILMOGRAPHY */}
      {/* ==================================================== */}
      {isFilmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-surface border border-surfaceBorder rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">
              {editingFilm ? 'Edit Rekam Jejak' : 'Tambah Kredit Produksi Baru'}
            </h3>

            <form onSubmit={handleSaveFilm} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-gray-300 block mb-1">Tahun</label>
                  <input
                    type="text"
                    value={filmFormData.year}
                    onChange={(e) => setFilmFormData({ ...filmFormData, year: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-white focus:border-cinemaCyan focus:outline-none"
                    required
                  />
                </div>

                <div className="col-span-2">
                  <label className="font-semibold text-gray-300 block mb-1">Jenis Produksi</label>
                  <select
                    value={filmFormData.type}
                    onChange={(e) => setFilmFormData({ ...filmFormData, type: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-white focus:border-cinemaCyan focus:outline-none"
                  >
                    <option value="Short Film">Short Film</option>
                    <option value="Music Video">Music Video</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Documentary">Documentary</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-300 block mb-1">Judul Produksi</label>
                <input
                  type="text"
                  value={filmFormData.title}
                  onChange={(e) => setFilmFormData({ ...filmFormData, title: e.target.value })}
                  placeholder="Contoh: Harra - Jurus Jitu"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-white focus:border-cinemaCyan focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-300 block mb-1">Peran (Role)</label>
                  <input
                    type="text"
                    value={filmFormData.role}
                    onChange={(e) => setFilmFormData({ ...filmFormData, role: e.target.value })}
                    placeholder="Unit Production Manager"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-white focus:border-cinemaCyan focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-300 block mb-1">Studio / Production House</label>
                  <input
                    type="text"
                    value={filmFormData.productionHouse}
                    onChange={(e) => setFilmFormData({ ...filmFormData, productionHouse: e.target.value })}
                    placeholder="Bloom Pictures"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-white focus:border-cinemaCyan focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-300 block mb-1">Catatan Tambahan (Opsional)</label>
                <input
                  type="text"
                  value={filmFormData.notes}
                  onChange={(e) => setFilmFormData({ ...filmFormData, notes: e.target.value })}
                  placeholder="On-set logistics, 2 days shoot, dll."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceElevated border border-surfaceBorder text-white focus:border-cinemaCyan focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsFilmModalOpen(false)}
                  className="px-4 py-2 rounded-xl glass-panel text-gray-300 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cinemaCyan hover:bg-cyan-400 text-black font-bold shadow-glowCyan"
                >
                  Simpan Kredit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}
