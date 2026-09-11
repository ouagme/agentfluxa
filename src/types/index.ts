export type Role = 'user' | 'admin';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role: Role;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Prefer not to say';
  height: number;
  weight: number;
  fitnessGoal: 'Lose Weight' | 'Build Muscle' | 'Increase Strength' | 'Improve Fitness' | 'Maintain Weight';
  createdAt: string;
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number;
  calories: number;
  image: string;
  createdAt: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: string;
  workoutId: string;
  name: string;
  description: string;
  muscleGroup: string;
  equipment: string;
  sets: number;
  reps: number;
  rest: string;
  instructions: string[];
  image?: string;
}

export interface NutritionPlan {
  id: string;
  title: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  meals: Meal[];
}

export interface Meal {
  id: string;
  nutritionPlanId: string;
  name: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  ingredients: string[];
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  prepTime: number;
  instructions: string[];
}

export interface ProgressEntry {
  id: string;
  userId: string;
  weight: number;
  waist: number;
  chest: number;
  arms: number;
  legs: number;
  date: string;
}

export interface WorkoutHistoryEntry {
  id: string;
  userId: string;
  workoutId: string;
  completedAt: string;
  duration: number;
  caloriesBurned: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}
