import { env } from '../config/env';

const API_URL = env.apiUrl;

export async function getWorkouts() {
  return fetch(`${API_URL}/workouts`).then((response) => response.json());
}

export async function getWorkoutById(id: string) {
  return fetch(`${API_URL}/workouts/${id}`).then((response) => response.json());
}
