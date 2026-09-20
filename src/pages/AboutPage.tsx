import { Card } from '../components/common/Card';

export function AboutPage() {
  return (
    <div className="container-shell py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-green-300">About OUAGx</p>
        <h1 className="text-4xl font-black text-white sm:text-5xl">Built for meaningful momentum.</h1>
        <p className="mt-6 text-lg text-slate-300">
          OUAGx was created for people who want more than generic answers. We combine research, reasoning, and action-oriented guidance into a single intelligent workflow.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white">Coach-minded</h3>
          <p className="mt-3 text-sm text-slate-400">Our plans are designed to adapt to your schedule, goals, and recovery needs.</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white">Trackable</h3>
          <p className="mt-3 text-sm text-slate-400">Measure weight changes, body composition, workout frequency, and calorie consistency.</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-white">Sustainable</h3>
          <p className="mt-3 text-sm text-slate-400">Professional training habits that fit real life and help people stay consistent longer.</p>
        </Card>
      </div>
    </div>
  );
}
