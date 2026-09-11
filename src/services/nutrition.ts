import { env } from '../config/env';

const API_URL = env.apiUrl;

export async function getNutritionPlans() {
  return fetch(`${API_URL}/nutrition`).then((response) => response.json());
}
