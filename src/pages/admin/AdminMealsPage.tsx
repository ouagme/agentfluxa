import { Card } from '../../components/common/Card';
import { nutritionPlans } from '../../data/mockData';

export function AdminMealsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Meal management</p>
        <h1 className="mt-2 text-3xl font-black text-white">Meals</h1>
      </div>

      <div className="space-y-4">
        {nutritionPlans.flatMap((plan) => plan.meals).map((meal) => (
          <Card key={meal.id} className="p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">{meal.name}</h3>
                <p className="text-sm text-slate-400">{meal.category}</p>
              </div>
              <span className="rounded-full bg-amber-500/10 px-2 py-1 text-xs text-amber-300">{meal.calories} kcal</span>
            </div>
            <p className="mt-3 text-sm text-slate-400">{meal.ingredients.join(', ')}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-300">
              <span>Protein {meal.protein}g</span>
              <span>Carbs {meal.carbs}g</span>
              <span>Fat {meal.fats}g</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
