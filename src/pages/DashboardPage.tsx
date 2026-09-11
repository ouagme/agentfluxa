import { ArrowRight, Flame, Target, Trophy, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { workoutHistory, workouts } from '../data/mockData';

const weeklyWorkouts = [80, 65, 90, 72, 95, 55, 100];

export function DashboardPage() {
  const navigate = useNavigate();
  const ongoingWorkout = workouts[2];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-green-300">Dashboard</p>
          <h1 className="mt-2 text-3xl font-black text-white">Welcome back, Ava</h1>
        </div>
        <Link to="/my-workouts" className="inline-flex items-center gap-2 text-sm font-medium text-green-300">
          View My Workouts <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Current weight', value: '64 kg', icon: Target },
          { label: 'Target weight', value: '60 kg', icon: Trophy },
          { label: 'Weekly workouts', value: '4/5', icon: Zap },
          { label: 'Calories', value: '2,150', icon: Flame },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label} className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-3 text-2xl font-bold text-white">{value}</p>
              </div>
              <div className="rounded-xl bg-green-500/10 p-3 text-green-300">
                <Icon size={20} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Weight progress</h3>
            <span className="text-sm text-green-300">-4kg this month</span>
          </div>
          <div className="flex h-52 items-end gap-3">
            {[48, 54, 57, 62, 66, 71, 74].map((height, index) => (
              <div key={index} className="flex-1">
                <div className="rounded-t-xl bg-gradient-to-t from-green-500 to-emerald-300" style={{ height: `${height}%` }} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white">Today’s Workout</h3>
          <img src={ongoingWorkout.image} alt={ongoingWorkout.title} className="mt-4 h-40 w-full rounded-xl object-cover" />
          <div className="mt-4 flex items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-white">{ongoingWorkout.title}</p>
              <p className="text-sm text-slate-400">{ongoingWorkout.duration} min • {ongoingWorkout.calories} kcal</p>
            </div>
            <button type="button" className="btn-primary" onClick={() => navigate(`/workout/${ongoingWorkout.id}`)}>
              Start
            </button>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_1.1fr]">
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white">Workout activity</h3>
          <div className="mt-5 flex h-44 items-end gap-3">
            {weeklyWorkouts.map((value, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-xl bg-gradient-to-t from-green-500 to-emerald-300" style={{ height: `${value}%` }} />
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white">Today’s Nutrition</h3>
          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">
              <div>
                <p className="font-medium text-white">Protein Oat Bowl</p>
                <p className="text-sm text-slate-400">Breakfast • 450 kcal</p>
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-green-300">Complete</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">
              <div>
                <p className="font-medium text-white">Chicken Rice Bowl</p>
                <p className="text-sm text-slate-400">Lunch • 620 kcal</p>
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-amber-300">Pending</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Recent progress</h3>
          <span className="text-sm text-slate-400">{workoutHistory.length} sessions</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {workoutHistory.slice(0, 3).map((entry) => (
            <div key={entry.id} className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
              <p className="text-sm text-slate-400">{new Date(entry.completedAt).toLocaleDateString()}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-semibold text-white">{entry.duration} min</span>
                <span className="text-green-300">{entry.caloriesBurned} kcal</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
