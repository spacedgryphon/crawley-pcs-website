import { User } from '@supabase/supabase-js';
import { AUTH_CONFIG } from '../config/auth';

export const createMockUser = (email: string): User => ({
  email,
  id: '1',
  role: 'admin',
  aud: 'authenticated',
  user_metadata: { role: 'admin' },
  app_metadata: {},
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
});

export const validateCredentials = (email: string, password: string): boolean => {
  return (
    email.toLowerCase() === AUTH_CONFIG.ADMIN_EMAIL.toLowerCase() &&
    password === AUTH_CONFIG.ADMIN_PASSWORD
  );
};

export const persistUser = (user: User): void => {
  localStorage.setItem(AUTH_CONFIG.STORAGE_KEY, JSON.stringify(user));
};

export const clearPersistedUser = (): void => {
  localStorage.removeItem(AUTH_CONFIG.STORAGE_KEY);
};

export const getPersistedUser = (): User | null => {
  const storedUser = localStorage.getItem(AUTH_CONFIG.STORAGE_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};