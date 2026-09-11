import { Activity, Dumbbell, Flame, HeartPulse, LayoutDashboard, LogOut, Settings, UserRound } from 'lucide-react';
import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/my-workouts', label: 'My Workouts', icon: Dumbbell },
  { to: '/progress', label: 'Progress', icon: Activity },
  { to: '/profile', label: 'Profile', icon: UserRound },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export function DashboardSidebar() {
  const { authState, setAuthState } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <aside className="card-surface p-4">
      <div className="mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/15 text-green-300">
          <HeartPulse size={18} />
        </div>
        <div>
          <p className="text-sm text-slate-400">Welcome back</p>
          <p className="font-semibold text-white">{authState.user?.firstName || 'Athlete'}</p>
        </div>
      </div>

      <nav className="space-y-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                isActive ? 'bg-green-500/15 text-green-300' : 'text-slate-300 hover:bg-white/5 hover:text-white'
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
          Logout
        </button>
      </div>
    </aside>
  );
}
