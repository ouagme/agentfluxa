import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { workouts } from '../data/mockData';

export function MyWorkoutsPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-green-300">My workouts</p>
        <h1 className="mt-2 text-3xl font-black text-white">Your training plan</h1>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {workouts.map((workout) => (
          <Card key={workout.id} className="overflow-hidden">
            <img src={workout.image} alt={workout.title} className="h-44 w-full object-cover" />
            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-white">{workout.title}</h3>
                <span className="rounded-full border border-green-400/20 bg-green-500/10 px-2.5 py-1 text-xs text-green-300">{workout.category}</span>
              </div>
              <p className="mt-3 text-sm text-slate-400">{workout.description}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
                <span>{workout.duration} min</span>
                <span>{workout.calories} kcal</span>
                <span>{workout.difficulty}</span>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <Link to={`/workout/${workout.id}`} className="text-sm font-medium text-green-300">View details</Link>
                <button type="button" className="btn-primary" onClick={() => navigate(`/workout/${workout.id}`)}>
                  Start
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
