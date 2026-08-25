# 🎬 Fikri Mulya Rachmat – Cinematic Portfolio & Bio-Link Hub

Website portofolio interaktif dan modern khusus **Film Producer, Line Producer, Unit Production Manager (UPM), & Art Director** untuk bio Instagram. Dilengkapi dengan **Admin CMS Dashboard** untuk mengelola proyek & info tanpa coding, serta siap dihubungkan ke **GitHub** dan **Vercel**.

---

## 🌟 Fitur Utama

1. **Cinematic Bento Grid Showcase (`/`)**:
   - Tampilan visual modern darkroom (`#08090D`, glassmorphism, aksen glow amber & cyan).
   - Filter kategori instan: *Semua Karya*, *Short Films*, *Music Videos*, *Commercials*, *Art Direction*.
   - **Interactive Project Modal**: Popup detail proyek dengan sinopsis lengkap, trailer video (YouTube/Vimeo embed), peran kru, studio, dan penghargaan.
   - **30+ Complete Filmography Log**: Tabel pencarian & filter cepat untuk seluruh rekam jejak produksi dari Canva.
   - **1-Tap Direct CTA**: WhatsApp langsung, Email, Instagram `@kikiirch`, dan Showreel.

2. **Admin CMS No-Code (`/admin`)**:
   - Diproteksi Master PIN/Password (Default: `1234`).
   - **Kelola Profil**: Edit nama, tagline, status ketersediaan (*Available for Projects*), nomor WhatsApp, email, foto profil avatar.
   - **Kelola Proyek Film/Video**: Tambah film baru, upload URL poster, edit sinopsis, embed trailer video YouTube, atur status *Featured*.
   - **Kelola Filmography**: Tambah, edit, dan hapus 30+ daftar kredit produksi.
   - **Backup & Ekspor JSON**: Download file backup data atau restore kapan saja dengan 1-klik.

---

## 🚀 Cara Menjalankan di Komputer Lokal

```bash
# 1. Masuk ke folder project
cd "/Users/kiki/Documents/Web Develop/Porto Web"

# 2. Jalankan development server
npm run dev
```

Buka browser dan akses:
* **Halaman Publik**: `http://localhost:3000`
* **Dashboard Admin**: `http://localhost:3000/admin` *(PIN: `1234`)*

---

## 🌐 Cara Menghubungkan ke GitHub & Deploy ke Vercel

### Langkah 1: Push ke GitHub Repository

1. Buka terminal di folder project ini:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Cinematic Filmmaker Portfolio with Admin CMS"
   ```
2. Buat repository baru di [github.com/new](https://github.com/new) (misal beri nama `porto-web` atau `fikri-portfolio`).
3. Hubungkan dan push kode:
   ```bash
   git remote add origin https://github.com/USERNAME_LU/NAMA_REPO.git
   git branch -M main
   git push -u origin main
   ```

### Langkah 2: Hubungkan ke Vercel (Auto Deploy)

1. Buka [vercel.com](https://vercel.com) dan login dengan akun GitHub lu.
2. Klik **"Add New..."** $\rightarrow$ **"Project"**.
3. Pilih repository GitHub lu tadi (`fikri-portfolio`).
4. Vercel akan mendeteksi framework **Next.js** secara otomatis.
5. Klik **"Deploy"**. Dalam ~1 menit website lu sudah live dengan domain gratis seperti `https://fikri-portfolio.vercel.app`!
6. Pasang link tersebut di Bio Instagram lu!

---

## 🔐 Akses Admin CMS

Untuk mengupdate karya baru setelah website live di Vercel:
1. Kunjungi `https://domain-website-lu.vercel.app/admin`
2. Masukkan PIN: `1234`
3. Tambah film baru, ganti poster, atau ubah nomor WhatsApp sesuai kebutuhan.
4. Perubahan langsung aktif seketika di website!
