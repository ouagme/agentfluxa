import {
  BarChart3,
  Dumbbell,
  Flame,
  LayoutDashboard,
  LogOut,
  Settings,
  Shield,
  Users,
} from 'lucide-react';
import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/users', label: 'User Management', icon: Users },
  { to: '/admin/workouts', label: 'Workout Management', icon: Dumbbell },
  { to: '/admin/exercises', label: 'Exercise Management', icon: Flame },
  { to: '/admin/nutrition', label: 'Nutrition Management', icon: BarChart3 },
  { to: '/admin/meals', label: 'Meal Management', icon: Shield },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminSidebar() {
  const { setAuthState } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <aside className="card-surface p-4">
      <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-300">
          <Shield size={18} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Admin</p>
          <p className="font-semibold text-white">PLfit Control</p>
        </div>
      </div>

      <nav className="space-y-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                isActive ? 'bg-amber-500/15 text-amber-300' : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-8 border-t border-white/10 pt-4">
        <button
          onClick={() => {
            setAuthState({ user: null, isAuthenticated: false, isAdmin: false });
            navigate('/');
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          <LogOut size={16} />
          Exit Admin
        </button>
      </div>
    </aside>
  );
}
