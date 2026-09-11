import { Card } from '../../components/common/Card';
import { exercises } from '../../data/mockData';

export function AdminExercisesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Exercise management</p>
        <h1 className="mt-2 text-3xl font-black text-white">Exercises</h1>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {exercises.map((exercise) => (
          <Card key={exercise.id} className="p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-white">{exercise.name}</h3>
              <span className="rounded-full bg-amber-500/10 px-2 py-1 text-xs text-amber-300">{exercise.muscleGroup}</span>
            </div>
            <p className="mt-3 text-sm text-slate-400">{exercise.description}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
              <span>{exercise.sets} sets</span>
              <span>{exercise.reps} reps</span>
              <span>{exercise.rest}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
