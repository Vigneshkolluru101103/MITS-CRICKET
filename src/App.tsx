import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PageSkeleton } from './components/ui/PageSkeleton';

// Lazy loaded page components for Code-Splitting
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Tournament = lazy(() => import('./pages/Tournament').then(m => ({ default: m.Tournament })));
const Register = lazy(() => import('./pages/Register').then(m => ({ default: m.Register })));
const History = lazy(() => import('./pages/History').then(m => ({ default: m.History })));
const Sponsors = lazy(() => import('./pages/Sponsors').then(m => ({ default: m.Sponsors })));
const Committee = lazy(() => import('./pages/Committee').then(m => ({ default: m.Committee })));
const Announcements = lazy(() => import('./pages/Announcements').then(m => ({ default: m.Announcements })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

// Lazy loaded Admin Portal pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then(m => ({ default: m.AdminLogin })));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout').then(m => ({ default: m.AdminLayout })));
const Dashboard = lazy(() => import('./pages/admin/Dashboard').then(m => ({ default: m.Dashboard })));
const Registrations = lazy(() => import('./pages/admin/Registrations').then(m => ({ default: m.Registrations })));

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
              <Suspense fallback={<PageSkeleton />}>
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
                    </Route>
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
