import { Card } from '../../components/common/Card';
import { nutritionPlans } from '../../data/mockData';

export function AdminNutritionPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Nutrition management</p>
        <h1 className="mt-2 text-3xl font-black text-white">Nutrition plans</h1>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {nutritionPlans.map((plan) => (
          <Card key={plan.id} className="p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold text-white">{plan.title}</h3>
              <span className="rounded-full bg-amber-500/10 px-2 py-1 text-xs text-amber-300">{plan.calories} kcal</span>
            </div>
            <p className="mt-3 text-sm text-slate-400">{plan.description}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-3 text-sm text-slate-300">
              <span>Protein {plan.protein}g</span>
              <span>Carbs {plan.carbs}g</span>
              <span>Fats {plan.fats}g</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
