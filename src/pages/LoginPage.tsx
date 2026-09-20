import { FormEvent, useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';

export function LoginPage() {
  const { setAuthState, users } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('ava@ouagx.com');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const user = users.find((candidate) => candidate.email.toLowerCase() === email.toLowerCase());

    if (!user || user.passwordHash !== password) {
      setError('Invalid email or password.');
      return;
    }

    setAuthState({ user, isAuthenticated: true, isAdmin: user.role === 'admin' });
    const state = location.state as { from?: { pathname?: string } } | null;
    navigate(state?.from?.pathname || (user.role === 'admin' ? '/admin' : '/dashboard'));
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
      <Card className="w-full max-w-md p-8">
        <div className="mb-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-green-300">Welcome back</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Login to OUAGx</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>

          <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
            <label className="flex items-center gap-2"><input type="checkbox" /> Remember me</label>
            <a href="#" className="text-green-300">Forgot password?</a>
          </div>

          {error && <p className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}

          <Button type="submit" className="w-full">Login</Button>
        </form>

        <div className="mt-6 border-t border-white/10 pt-4 text-center text-sm text-slate-400">
          Need an account? <Link to="/signup" className="font-medium text-green-300">Create one</Link>
        </div>
      </Card>
    </div>
  );
}
