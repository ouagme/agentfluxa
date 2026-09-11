import { Card } from '../../components/common/Card';
import { demoUsers } from '../../data/mockData';

export function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-amber-300">User management</p>
        <h1 className="mt-2 text-3xl font-black text-white">Members</h1>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-300">
            <thead className="border-b border-white/10 bg-slate-900/80 text-slate-400">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Goal</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {demoUsers.map((user) => (
                <tr key={user.id} className="border-b border-white/5">
                  <td className="px-4 py-3 font-medium text-white">{user.firstName} {user.lastName}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 capitalize">{user.role}</td>
                  <td className="px-4 py-3">{user.fitnessGoal}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-green-500/10 px-2 py-1 text-xs text-green-300">Active</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
