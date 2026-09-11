import { FormEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';

const goals = ['Lose Weight', 'Build Muscle', 'Increase Strength', 'Improve Fitness', 'Maintain Weight'];

export function SignupPage() {
  const { users, setAuthState } = useContext(AppContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: 'Male',
    height: '',
    weight: '',
    fitnessGoal: 'Lose Weight',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.firstName.trim()) nextErrors.firstName = 'First name is required.';
    if (!form.lastName.trim()) nextErrors.lastName = 'Last name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email.';
    if (form.password.length < 8) nextErrors.password = 'Password must be at least 8 characters.';
    if (form.password !== form.confirmPassword) nextErrors.confirmPassword = 'Passwords do not match.';
    if (!form.dateOfBirth) nextErrors.dateOfBirth = 'Date of birth is required.';
    if (!form.height) nextErrors.height = 'Height is required.';
    if (!form.weight) nextErrors.weight = 'Weight is required.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    const newUser = {
      id: `user-${Date.now()}`,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      passwordHash: form.password,
      role: 'user' as const,
      dateOfBirth: form.dateOfBirth,
      gender: form.gender as 'Male' | 'Female' | 'Prefer not to say',
      height: Number(form.height),
      weight: Number(form.weight),
      fitnessGoal: form.fitnessGoal as any,
      createdAt: new Date().toISOString(),
    };

    setAuthState({ user: newUser, isAuthenticated: true, isAdmin: false });
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl p-8">
        <div className="mb-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-green-300">Join PLfit</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Create your account</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-slate-300">First Name</label>
            <Input value={form.firstName} onChange={(e) => handleChange('firstName', e.target.value)} placeholder="First name" />
            {errors.firstName && <p className="mt-1 text-xs text-red-300">{errors.firstName}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Last Name</label>
            <Input value={form.lastName} onChange={(e) => handleChange('lastName', e.target.value)} placeholder="Last name" />
            {errors.lastName && <p className="mt-1 text-xs text-red-300">{errors.lastName}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-slate-300">Email</label>
            <Input type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="you@example.com" />
            {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Password</label>
            <Input type="password" value={form.password} onChange={(e) => handleChange('password', e.target.value)} placeholder="••••••••" />
            {errors.password && <p className="mt-1 text-xs text-red-300">{errors.password}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Confirm Password</label>
            <Input type="password" value={form.confirmPassword} onChange={(e) => handleChange('confirmPassword', e.target.value)} placeholder="Repeat password" />
            {errors.confirmPassword && <p className="mt-1 text-xs text-red-300">{errors.confirmPassword}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Date of Birth</label>
            <Input type="date" value={form.dateOfBirth} onChange={(e) => handleChange('dateOfBirth', e.target.value)} />
            {errors.dateOfBirth && <p className="mt-1 text-xs text-red-300">{errors.dateOfBirth}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Gender</label>
            <select value={form.gender} onChange={(e) => handleChange('gender', e.target.value)} className="input-field">
              <option>Male</option>
              <option>Female</option>
              <option>Prefer not to say</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Height (cm)</label>
            <Input type="number" value={form.height} onChange={(e) => handleChange('height', e.target.value)} placeholder="170" />
            {errors.height && <p className="mt-1 text-xs text-red-300">{errors.height}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Weight (kg)</label>
            <Input type="number" value={form.weight} onChange={(e) => handleChange('weight', e.target.value)} placeholder="70" />
            {errors.weight && <p className="mt-1 text-xs text-red-300">{errors.weight}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-slate-300">Fitness Goal</label>
            <select value={form.fitnessGoal} onChange={(e) => handleChange('fitnessGoal', e.target.value)} className="input-field">
              {goals.map((goal) => <option key={goal}>{goal}</option>)}
            </select>
          </div>

          <div className="md:col-span-2">
            <Button type="submit" className="w-full">Create Account</Button>
          </div>
        </form>

        <div className="mt-6 border-t border-white/10 pt-4 text-center text-sm text-slate-400">
          Already have an account? <Link to="/login" className="font-medium text-green-300">Login</Link>
        </div>
      </Card>
    </div>
  );
}
