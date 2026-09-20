import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-4">
        <div>
          <div className="mb-4 text-xl font-bold text-white">OUAGx</div>
          <p className="text-sm text-slate-400">Autonomous AI for focused action.</p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Explore</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/workouts">Workouts</Link></li>
            <li><Link to="/nutrition">Nutrition</Link></li>
            <li><Link to="/progress">Progress</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Company</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Connect</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>hello@ouagx.com</li>
            <li>+1 (800) 123-4567</li>
            <li>Mon-Fri 8am-6pm</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-sm text-slate-500">
        © 2026 OUAGx. All rights reserved.
      </div>
    </footer>
  );
}
