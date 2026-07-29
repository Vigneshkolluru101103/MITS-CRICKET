import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Public Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Tournament } from './pages/Tournament';
import { Register } from './pages/Register';
import { History } from './pages/History';
import { Sponsors } from './pages/Sponsors';
import { Committee } from './pages/Committee';
import { Announcements } from './pages/Announcements';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { Registrations } from './pages/admin/Registrations';
import { Gallery } from './pages/admin/Gallery';
import { Announcements as AdminAnnouncements } from './pages/admin/Announcements';
import { Settings } from './pages/admin/Settings';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 font-sans selection:bg-amber-500 selection:text-black">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Public Website Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/tournament" element={<Tournament />} />
                <Route path="/register" element={<Register />} />
                <Route path="/history" element={<History />} />
                <Route path="/sponsors" element={<Sponsors />} />
                <Route path="/committee" element={<Committee />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/contact" element={<Contact />} />

                {/* Admin Auth Route */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Protected Admin Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/registrations" element={<Registrations />} />
                    <Route path="/admin/gallery" element={<Gallery />} />
                    <Route path="/admin/announcements" element={<AdminAnnouncements />} />
                    <Route path="/admin/settings" element={<Settings />} />
                  </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
