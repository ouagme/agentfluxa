import { ArrowRight, Activity, Apple, Dumbbell, HeartHandshake, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { workouts } from '../data/mockData';

const workoutCategories = ['Beginner', 'Weight Loss', 'Muscle Building', 'Strength', 'Cardio', 'Home Workout', 'Gym Workout'];

const features = [
  { title: 'Personalized Workouts', desc: 'Programs tailored around your goal, time, and experience.', icon: Dumbbell },
  { title: 'Nutrition Plans', desc: 'Meal strategies built for recovery, energy, and results.', icon: Apple },
  { title: 'Progress Tracking', desc: 'See measurable milestones from strength to body metrics.', icon: TrendingUp },
  { title: 'Workout History', desc: 'Keep a complete record of your training every week.', icon: Activity },
  { title: 'Easy to Use', desc: 'Clean workflows and simple routines designed to keep you moving.', icon: HeartHandshake },
  { title: 'Mobile Friendly', desc: 'Stay on track wherever your day takes you.', icon: ShieldCheck },
];

export function HomePage() {
  return (
    <div>
      <section className="border-b border-white/10">
        <div className="container-shell grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-500/10 px-3 py-1 text-sm text-green-300">
              <Sparkles size={14} />
              Performance coaching for real life
            </div>
            <h1 className="max-w-xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Train Better. Eat Better. Live Better.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-slate-300">
              PLfit combines personalized workouts, nutrition guidance, and progress tracking so you can stay consistent and achieve more.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/signup"><Button>Start Training</Button></Link>
              <Link to="/login"><Button variant="secondary">Create Account</Button></Link>
            </div>
            <div className="mt-10 flex items-center gap-8 text-sm text-slate-300">
              <div><span className="block text-2xl font-bold text-white">12k+</span> Members</div>
              <div><span className="block text-2xl font-bold text-white">90%</span> Retention</div>
              <div><span className="block text-2xl font-bold text-white">4.9/5</span> Rating</div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-8 h-32 w-32 rounded-full bg-green-500/10 blur-3xl" />
            <div className="absolute -right-8 bottom-4 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80"
              alt="Athlete training"
              className="h-[560px] w-full rounded-[32px] border border-white/10 object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="container-shell py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-green-300">Workouts</p>
            <h2 className="section-title">Train for your next milestone</h2>
          </div>
          <Link to="/workouts" className="text-sm font-medium text-green-300 hover:text-green-200">View all</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {workoutCategories.map((category, i) => (
            <Card key={category} className="p-5">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-300">
                {i + 1}
              </div>
              <h3 className="text-lg font-semibold text-white">{category}</h3>
              <p className="mt-2 text-sm text-slate-400">
                Built to match your current level and long-term goals.
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-slate-900/60 py-16">
        <div className="container-shell">
          <div className="mb-8">
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-green-300">Nutrition</p>
            <h2 className="section-title">Fuel your performance</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {['Personalized nutrition plans', 'Healthy meal plans', 'Calories', 'Protein', 'Carbohydrates', 'Fats', 'Hydration'].map((item) => (
              <Card key={item} className="p-5">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300">
                  <Apple size={24} />
                </div>
                <h3 className="text-lg font-semibold text-white">{item}</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Smart fueling strategies to support every session and recovery cycle.
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-16">
        <div className="mb-8">
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-green-300">Progress tracking</p>
          <h2 className="section-title">Measure what matters</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Weight tracking', value: '64 kg' },
            { label: 'Body measurements', value: '+6 cm' },
            { label: 'Workout progress', value: '83%' },
            { label: 'Workout streaks', value: '14 days' },
          ].map((stat) => (
            <Card key={stat.label} className="p-6">
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-3 text-3xl font-bold text-white">{stat.value}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-slate-900/60 py-16">
        <div className="container-shell">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-green-300">Why PLfit?</p>
            <h2 className="section-title">A simpler way to train and recover</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map(({ title, desc, icon: Icon }) => (
              <Card key={title} className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-300">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-16">
        <Card className="overflow-hidden bg-gradient-to-r from-green-500/15 via-slate-900 to-emerald-500/10 p-8 md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-green-300">Ready to start your fitness journey?</p>
              <h3 className="mt-3 text-3xl font-bold text-white">Make real progress with PLfit.</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/signup"><Button>Sign Up Free</Button></Link>
              <Link to="/login"><Button variant="secondary">Login</Button></Link>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
