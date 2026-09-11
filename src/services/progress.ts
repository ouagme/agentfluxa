import { env } from '../config/env';

const API_URL = env.apiUrl;

export async function getProgress() {
  return fetch(`${API_URL}/progress`).then((response) => response.json());
}
