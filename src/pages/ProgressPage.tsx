import { Card } from '../components/common/Card';
import { progressData } from '../data/mockData';

export function ProgressPage() {
  const latest = progressData[progressData.length - 1];
  const start = progressData[0];
  const weightChange = Number((start.weight - latest.weight).toFixed(1));

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-green-300">Progress</p>
        <h1 className="mt-2 text-3xl font-black text-white">Track your momentum.</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Starting weight', value: `${start.weight} kg` },
          { label: 'Current weight', value: `${latest.weight} kg` },
          { label: 'Target weight', value: '60 kg' },
          { label: 'Weight change', value: `${weightChange} kg` },
        ].map((stat) => (
          <Card key={stat.label} className="p-5">
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className="mt-3 text-2xl font-bold text-white">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-semibold text-white">Progress timeline</h3>
        <div className="mt-6 flex h-48 items-end gap-3">
          {progressData.map((entry) => (
            <div key={entry.id} className="flex flex-1 flex-col items-center gap-2">
              <div className="w-full rounded-t-xl bg-gradient-to-t from-green-500 to-emerald-300" style={{ height: `${(entry.weight / 80) * 100}%` }} />
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{new Date(entry.date).toLocaleDateString('en-US', { month: 'short' })}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
