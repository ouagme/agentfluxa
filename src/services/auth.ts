import { env } from '../config/env';

const API_URL = env.apiUrl;

export async function login(email: string, password: string) {
  return fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then((response) => response.json());
}

export async function signup(payload: Record<string, unknown>) {
  return fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).then((response) => response.json());
}
