import { Link } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { workouts } from '../data/mockData';

export function WorkoutsPage() {
  return (
    <div className="container-shell py-16">
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-green-300">Workouts</p>
        <h1 className="text-4xl font-black text-white sm:text-5xl">Choose a plan that fits your goals.</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {workouts.map((workout) => (
          <Link key={workout.id} to={`/workout/${workout.id}`}>
            <Card className="overflow-hidden transition hover:-translate-y-1 hover:border-green-400/30">
              <img src={workout.image} alt={workout.title} className="h-48 w-full object-cover" />
              <div className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-300">{workout.category}</span>
                  <span className="text-sm text-slate-400">{workout.difficulty}</span>
                </div>
                <h3 className="text-xl font-semibold text-white">{workout.title}</h3>
                <p className="mt-3 text-sm text-slate-400">{workout.description}</p>
                <div className="mt-5 flex items-center justify-between text-sm text-slate-300">
                  <span>{workout.duration} min</span>
                  <span>{workout.calories} kcal</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
