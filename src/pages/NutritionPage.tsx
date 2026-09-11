import { useMemo, useState } from 'react';
import { Card } from '../components/common/Card';
import { nutritionPlans } from '../data/mockData';

export function NutritionPage() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [age, setAge] = useState(29);
  const [goal, setGoal] = useState('maintain');
  const [activity, setActivity] = useState('moderate');

  const nutritionSummary = useMemo(() => {
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    const activityMultiplier = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      high: 1.725,
    }[activity] ?? 1.55;

    const goalAdjustment = {
      lose: -400,
      maintain: 0,
      gain: 250,
    }[goal] ?? 0;

    const calories = Math.round(bmr * activityMultiplier + goalAdjustment);
    const protein = Math.round(weight * 1.8);
    const carbs = Math.round((calories * 0.45) / 4);
    const fats = Math.round((calories * 0.25) / 9);
    const water = Math.round(weight * 0.035 * 1000 / 250) * 250;

    return { calories, protein, carbs, fats, water };
  }, [weight, height, age, goal, activity]);

  return (
    <div className="container-shell py-16">
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-green-300">Nutrition</p>
        <h1 className="text-4xl font-black text-white sm:text-5xl">Fuel your body with intention.</h1>
      </div>

      <Card className="mb-10 p-6">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-green-300">Nutrition calculator</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Daily calorie estimate</h2>
          </div>
          <div className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-300">
            {nutritionSummary.calories} kcal/day
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          <label className="text-sm text-slate-300">
            Weight (kg)
            <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value) || 0)} className="input-field mt-2" />
          </label>
          <label className="text-sm text-slate-300">
            Height (cm)
            <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value) || 0)} className="input-field mt-2" />
          </label>
          <label className="text-sm text-slate-300">
            Age
            <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value) || 0)} className="input-field mt-2" />
          </label>
          <label className="text-sm text-slate-300">
            Goal
            <select value={goal} onChange={(e) => setGoal(e.target.value)} className="input-field mt-2">
              <option value="lose">Lose weight</option>
              <option value="maintain">Maintain</option>
              <option value="gain">Gain muscle</option>
            </select>
          </label>
          <label className="text-sm text-slate-300">
            Activity
            <select value={activity} onChange={(e) => setActivity(e.target.value)} className="input-field mt-2">
              <option value="sedentary">Sedentary</option>
              <option value="light">Light</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-xl bg-slate-800 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Calories</p>
            <p className="mt-2 text-2xl font-bold text-white">{nutritionSummary.calories}</p>
          </div>
          <div className="rounded-xl bg-slate-800 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Protein</p>
            <p className="mt-2 text-2xl font-bold text-white">{nutritionSummary.protein}g</p>
          </div>
          <div className="rounded-xl bg-slate-800 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Carbs</p>
            <p className="mt-2 text-2xl font-bold text-white">{nutritionSummary.carbs}g</p>
          </div>
          <div className="rounded-xl bg-slate-800 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Fats</p>
            <p className="mt-2 text-2xl font-bold text-white">{nutritionSummary.fats}g</p>
          </div>
          <div className="rounded-xl bg-slate-800 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Water</p>
            <p className="mt-2 text-2xl font-bold text-white">{nutritionSummary.water} ml</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        {nutritionPlans.map((plan) => (
          <Card key={plan.id} className="p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-2xl font-bold text-white">{plan.title}</h3>
                <p className="text-sm text-slate-400">{plan.description}</p>
              </div>
              <span className="rounded-full bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-300">{plan.calories} kcal</span>
            </div>
            <div className="mb-6 grid gap-3 sm:grid-cols-4">
              <div className="rounded-xl bg-slate-800 p-3"><p className="text-xs text-slate-400">Protein</p><p className="mt-2 font-bold text-white">{plan.protein}g</p></div>
              <div className="rounded-xl bg-slate-800 p-3"><p className="text-xs text-slate-400">Carbs</p><p className="mt-2 font-bold text-white">{plan.carbs}g</p></div>
              <div className="rounded-xl bg-slate-800 p-3"><p className="text-xs text-slate-400">Fats</p><p className="mt-2 font-bold text-white">{plan.fats}g</p></div>
              <div className="rounded-xl bg-slate-800 p-3"><p className="text-xs text-slate-400">Water</p><p className="mt-2 font-bold text-white">2.5L</p></div>
            </div>
            <div className="space-y-4">
              {plan.meals.map((meal) => (
                <div key={meal.id} className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="font-semibold text-white">{meal.name}</h4>
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-400">{meal.category}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{meal.ingredients.join(', ')}</p>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-300">
                    <span>{meal.calories} kcal</span>
                    <span>Protein {meal.protein}g</span>
                    <span>Carbs {meal.carbs}g</span>
                    <span>Fat {meal.fats}g</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
