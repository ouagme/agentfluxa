import { Card } from '../components/common/Card';
import { AppContext } from '../App';
import { useContext } from 'react';

export function ProfilePage() {
  const { authState } = useContext(AppContext);
  const user = authState.user;

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-green-300">Profile</p>
        <h1 className="mt-2 text-3xl font-black text-white">{user.firstName} {user.lastName}</h1>
      </div>

      <Card className="p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div><p className="text-sm text-slate-400">Email</p><p className="mt-2 font-medium text-white">{user.email}</p></div>
          <div><p className="text-sm text-slate-400">Fitness goal</p><p className="mt-2 font-medium text-white">{user.fitnessGoal}</p></div>
          <div><p className="text-sm text-slate-400">Height</p><p className="mt-2 font-medium text-white">{user.height} cm</p></div>
          <div><p className="text-sm text-slate-400">Weight</p><p className="mt-2 font-medium text-white">{user.weight} kg</p></div>
          <div><p className="text-sm text-slate-400">Gender</p><p className="mt-2 font-medium text-white">{user.gender}</p></div>
          <div><p className="text-sm text-slate-400">Member since</p><p className="mt-2 font-medium text-white">{new Date(user.createdAt).toLocaleDateString()}</p></div>
        </div>
      </Card>
    </div>
  );
}
