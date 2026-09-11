import { env } from '../config/env';

const API_URL = env.apiUrl;

export async function getUsers() {
  return fetch(`${API_URL}/users`).then((response) => response.json());
}
