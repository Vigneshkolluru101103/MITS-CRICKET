# 🏆 DILMAN Premier League (DPL 2026) - Official Web Platform

The official digital web platform for the **DILMAN Premier League (DPL)** at Madanapalle Institute of Technology and Science (MITS). Designed for maximum performance, smooth mobile responsiveness (Lighthouse 90+), real-time player registrations, Cloudinary receipt processing, Cloud Firestore database storage, and secure Firebase Admin authentication.

---

## 🚀 Key Features

### 🏏 Player & Tournament Features
- **Player Registration Portal**: Multi-step interactive form with Zod schema validation for Active Students (₹400) & MITS Alumni (₹1000).
- **Cloudinary Receipt Upload**: Instant client-side validation (JPG, JPEG, PNG <= 5MB) and unsigned upload to Cloudinary CDN with automatic format (`f_auto`), quality (`q_auto`), and DPR optimization.
- **Realtime Firestore Storage**: Registration metadata saved directly into Cloud Firestore (`registrations` collection) with auto-generated registration pass IDs.
- **Official CricHeroes Integration**: Direct CTAs for live score tracking, ball-by-ball commentary, player statistics, points table, and match schedule on CricHeroes.
- **Tournament History & Champions**: Interactive gallery carousel highlighting past champions, team huddles, and match action.
- **Officials & Committee**: Spotlights Student Committee leaders and team captains.

### 🛡️ Protected Admin Control Center
- **Firebase Authentication**: Secure Email & Password login at `/admin/login` with session persistence, autofill protection, and client storage sanitation on logout.
- **Realtime Metrics Dashboard**: Live counts for Total Registrations, Pending Reviews, Approved Players, and Rejected Requests.
- **Registrations Management Table**: Searchable table with instant filtering by status, UTR number, branch, or player name. Includes modal preview for payment receipt screenshots and live **Approve**, **Reject**, and **Delete** actions.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 19, TypeScript, Vite 8
- **Styling**: Tailwind CSS v4, Vanilla CSS Design System, Custom Glassmorphism
- **Animations & Icons**: Framer Motion, Lucide React
- **Cloud Infrastructure**:
  - **Firebase Auth**: Admin Email & Password Authentication
  - **Cloud Firestore**: Realtime Database (`onSnapshot` listeners)
  - **Cloudinary**: Unsigned Image Uploads & Responsive Image Optimization (`f_auto`, `q_auto`)
- **Data & Validation**: Zod, React Hook Form, TanStack React Query

---

## 📁 Project Directory Structure

```
mits-cricket/
├── public/               # Static assets & tournament logos
├── src/
│   ├── components/
│   │   ├── auth/         # Admin auth components
│   │   ├── cards/        # Sponsor & Committee cards
│   │   ├── layout/       # Navbar & Footer
│   │   └── ui/           # Button, Badge, Modal, Toast, Skeleton
│   ├── context/          # AuthContext (Firebase Auth Provider)
│   ├── firebase/         # Firebase config, auth, firestore
│   ├── pages/            # Home, About, Tournament, Register, History, Sponsors, Committee, Contact
│   ├── pages/admin/      # AdminLogin, AdminLayout, Dashboard, Registrations
│   ├── routes/           # ProtectedRoute guard
│   └── utils/            # Cloudinary upload & image optimization helpers
├── .env                  # Environment variables
├── .env.example          # Environment template
├── index.html            # Main HTML entry point with async fonts
├── package.json          # Project dependencies & scripts
├── README.md             # Project documentation
├── vercel.json           # Vercel SPA routing rewrite rule
└── vite.config.ts        # Vendor chunk splitting & build config
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=mits-cricket.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=mits-cricket
VITE_FIREBASE_STORAGE_BUCKET=mits-cricket.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=162035038041
VITE_FIREBASE_APP_ID=1:162035038041:web:36e21e0a1b05708394fe48

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=rdtxedw7
VITE_CLOUDINARY_UPLOAD_PRESET=payments
```

---

## 🚀 Quick Start & Deployment Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Access the app locally at `http://localhost:5173`.

### 3. Production Build
```bash
npm run build
```
Generates an optimized, chunk-split production bundle in `dist/`.

### 4. Deploying to Vercel
1. Push your repository to GitHub.
2. Import project in [Vercel Dashboard](https://vercel.com).
3. Add Environment Variables (`VITE_FIREBASE_*` and `VITE_CLOUDINARY_*`).
4. Click **Deploy** — Vercel will automatically build and publish your app at root!
