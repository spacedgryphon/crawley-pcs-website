import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { AuthCredentials, AuthResponse } from '../types/auth';
import { AUTH_CONFIG, AUTH_ERRORS } from '../config/auth';
import { createMockUser, validateCredentials } from '../utils/authUtils';

export class AuthService {
  static async signIn(credentials: AuthCredentials): Promise<AuthResponse> {
    if (!credentials.email || !credentials.password) {
      return { success: false, error: AUTH_ERRORS.REQUIRED_FIELDS };
    }

    // If Supabase is not available, use mock authentication
    if (!supabase) {
      await new Promise(resolve => setTimeout(resolve, AUTH_CONFIG.MOCK_AUTH_DELAY));
      
      if (validateCredentials(credentials.email, credentials.password)) {
        const mockUser = createMockUser(credentials.email);
        return { success: true, user: mockUser };
      }
      
      return { success: false, error: AUTH_ERRORS.INVALID_CREDENTIALS };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword(credentials);
      
      if (error) {
        return { success: false, error: error.message };
      }

      if (!data?.user) {
        return { success: false, error: AUTH_ERRORS.AUTH_FAILED };
      }

      return { success: true, user: data.user };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { 
        success: false, 
        error: error?.message || AUTH_ERRORS.AUTH_FAILED 
      };
    }
  }

  static async signOut(): Promise<AuthResponse> {
    try {
      if (!supabase) {
        await new Promise(resolve => setTimeout(resolve, 300));
        return { success: true };
      }

      const { error } = await supabase.auth.signOut();
      
      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error: any) {
      console.error('Sign out error:', error);
      return { 
        success: false, 
        error: error?.message || AUTH_ERRORS.SIGNOUT_FAILED 
      };
    }
  }

  static async getCurrentSession(): Promise<User | null> {
    if (!supabase) {
      const storedUser = localStorage.getItem(AUTH_CONFIG.STORAGE_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      return session?.user ?? null;
    } catch (error) {
      console.error('Get session error:', error);
      return null;
    }
  }
}