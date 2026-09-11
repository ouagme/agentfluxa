import { CheckCircle2, Clock3, Dumbbell, Flame, PlayCircle } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { workouts } from '../data/mockData';

export function WorkoutDetailPage() {
  const { id } = useParams();
  const workout = workouts.find((item) => item.id === id) ?? workouts[0];
  const [started, setStarted] = useState(false);

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <img src={workout.image} alt={workout.title} className="h-64 w-full object-cover" />
        <div className="p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-green-300">{workout.category}</p>
              <h1 className="mt-2 text-3xl font-black text-white">{workout.title}</h1>
            </div>
            <Button onClick={() => setStarted((value) => !value)}>
              <PlayCircle size={16} className="mr-2" />
              {started ? 'Workout started' : 'Start workout'}
            </Button>
          </div>

          <p className="max-w-2xl text-slate-300">{workout.description}</p>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <div className="rounded-xl bg-slate-800 p-4"><div className="flex items-center gap-2 text-sm text-slate-400"><Clock3 size={16} /> Duration</div><p className="mt-2 font-bold text-white">{workout.duration} min</p></div>
            <div className="rounded-xl bg-slate-800 p-4"><div className="flex items-center gap-2 text-sm text-slate-400"><Flame size={16} /> Calories</div><p className="mt-2 font-bold text-white">{workout.calories}</p></div>
            <div className="rounded-xl bg-slate-800 p-4"><div className="flex items-center gap-2 text-sm text-slate-400"><Dumbbell size={16} /> Difficulty</div><p className="mt-2 font-bold text-white">{workout.difficulty}</p></div>
            <div className="rounded-xl bg-slate-800 p-4"><div className="flex items-center gap-2 text-sm text-slate-400"><CheckCircle2 size={16} /> Exercises</div><p className="mt-2 font-bold text-white">{workout.exercises.length}</p></div>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {workout.exercises.map((exercise, index) => (
          <Card key={exercise.id} className="p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 font-bold text-green-300">{index + 1}</div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{exercise.name}</h3>
                  <p className="text-sm text-slate-400">{exercise.muscleGroup} • {exercise.equipment}</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm text-slate-300">
                <span>{exercise.sets} sets</span>
                <span>{exercise.reps} reps</span>
                <span>{exercise.rest}</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-300">{exercise.description}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-400">
              {exercise.instructions.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
