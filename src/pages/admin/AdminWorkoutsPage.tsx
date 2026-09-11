import { Card } from '../../components/common/Card';
import { workouts } from '../../data/mockData';

export function AdminWorkoutsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Workout management</p>
        <h1 className="mt-2 text-3xl font-black text-white">Program library</h1>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {workouts.map((workout) => (
          <Card key={workout.id} className="p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-white">{workout.title}</h3>
              <span className="rounded-full bg-amber-500/10 px-2 py-1 text-xs text-amber-300">{workout.category}</span>
            </div>
            <p className="mt-3 text-sm text-slate-400">{workout.description}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
              <span>{workout.duration} min</span>
              <span>{workout.calories} kcal</span>
              <span>{workout.difficulty}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
