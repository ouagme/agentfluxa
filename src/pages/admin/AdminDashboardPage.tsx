import { Card } from '../../components/common/Card';
import { demoUsers, nutritionPlans, workouts } from '../../data/mockData';

export function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Admin dashboard</p>
        <h1 className="mt-2 text-3xl font-black text-white">OUAGx overview</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total users', value: demoUsers.length },
          { label: 'Active users', value: '1,482' },
          { label: 'Total workouts', value: workouts.length },
          { label: 'Nutrition plans', value: nutritionPlans.length },
        ].map((stat) => (
          <Card key={stat.label} className="p-5">
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className="mt-3 text-3xl font-bold text-white">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white">Recent registrations</h3>
          <div className="mt-5 space-y-3">
            {demoUsers.slice(1).map((user) => (
              <div key={user.id} className="flex items-center justify-between rounded-xl bg-slate-900 p-3">
                <div>
                  <p className="font-medium text-white">{user.firstName} {user.lastName}</p>
                  <p className="text-sm text-slate-400">{user.email}</p>
                </div>
                <span className="rounded-full bg-amber-500/10 px-2 py-1 text-xs text-amber-300">{user.role}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white">Performance summary</h3>
          <div className="mt-5 flex h-52 items-end gap-3">
            {[40, 54, 62, 72, 90, 68, 82].map((value, index) => (
              <div key={index} className="flex-1">
                <div className="rounded-t-xl bg-gradient-to-t from-amber-500 to-yellow-300" style={{ height: `${value}%` }} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
