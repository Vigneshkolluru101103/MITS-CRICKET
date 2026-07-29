import React from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  LogOut, 
  ShieldCheck 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';

export const AdminLayout: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { name: 'Registrations', path: '/admin/registrations', icon: <Users className="h-4 w-4" /> },
  ];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Header Bar */}
      <div className="glass-panel p-4 sm:p-6 rounded-[24px] border border-slate-800 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/90 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white font-display">DPL Admin Control Center</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Logged in as: <span className="text-[#D4AF37]">{currentUser?.email || 'admin@mitsdpl.in'}</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? 'primary' : 'secondary'}
                  size="sm"
                  icon={item.icon}
                  className="whitespace-nowrap"
                >
                  {item.name}
                </Button>
              </Link>
            );
          })}

          <Button
            variant="crimson"
            size="sm"
            onClick={handleLogout}
            icon={<LogOut className="h-4 w-4" />}
            className="ml-2 whitespace-nowrap"
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};
