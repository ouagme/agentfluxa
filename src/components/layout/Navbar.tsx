import { Menu, Sparkles, X } from 'lucide-react';
import { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/workouts', label: 'Workouts' },
  { to: '/nutrition', label: 'Nutrition' },
  { to: '/progress', label: 'Progress' },
  { to: '/about', label: 'About' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { authState, setAuthState } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthState({ user: null, isAuthenticated: false, isAdmin: false });
    navigate('/');
    setMobileOpen(false);
  };

  const isLoggedIn = authState.isAuthenticated && authState.user;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="container-shell flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 text-slate-950">
            <Sparkles size={18} />
          </div>
          <span>OUAGx</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? 'text-green-300' : 'text-slate-300 hover:text-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white">Login</Link>
              <Link to="/signup" className="btn-primary">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-sm font-medium text-slate-200 hover:text-white">Dashboard</Link>
              <Link to="/profile" className="text-sm font-medium text-slate-200 hover:text-white">Profile</Link>
              {authState.user?.role === 'admin' && (
                <Link to="/admin" className="text-sm font-medium text-amber-300 hover:text-amber-200">Admin Panel</Link>
              )}
              <button onClick={handleLogout} className="text-sm font-medium text-slate-300 hover:text-white">Logout</button>
            </>
          )}
        </div>

        <button className="rounded-lg border border-white/10 p-2 md:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-slate-950 md:hidden">
          <div className="container-shell flex flex-col gap-4 py-4">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className="text-slate-200">
                {item.label}
              </NavLink>
            ))}
            {!isLoggedIn ? (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="text-slate-200">Login</Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)} className="btn-primary">Sign Up</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="text-slate-200">Dashboard</Link>
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="text-slate-200">Profile</Link>
                {authState.user?.role === 'admin' && (
                  <Link to="/admin" onClick={() => setMobileOpen(false)} className="text-amber-300">Admin Panel</Link>
                )}
                <button onClick={handleLogout} className="text-left text-slate-200">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
