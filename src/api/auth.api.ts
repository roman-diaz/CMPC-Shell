import { API_URI_BASE } from '@/config/env.ts';
import type { Session } from '../types/auth.types.ts';

export async function loginApi(samlToken: string): Promise<Session> {
  const profileRoute = `${API_URI_BASE}/v1/profile`;

  const result = await fetch(profileRoute, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${samlToken}`,
    },
  });

  const json = await result.json();

  if (!json.data && typeof json.data !== 'object') {
    console.log({ Response: json });
    throw new Error('Failed to login: JSON data is missing or invalid');
  }

  const { token, user } = json.data;

  return { user, token };
}
