import { useEffect, useState, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../config/supabase';
import { AUTH_CONFIG } from '../config/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

export function useAuth() {
  const [state, setState] = useState<AuthState>(initialState);

  const checkSession = useCallback(async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      setState({
        user: session?.user || null,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Session check failed:', error);
      setState({
        user: null,
        loading: false,
        error: 'Failed to check authentication status',
      });
    }
  }, []);

  useEffect(() => {
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({
        user: session?.user || null,
        loading: false,
        error: null,
      });
    });

    return () => subscription.unsubscribe();
  }, [checkSession]);

  const signIn = async (email: string, password: string): Promise<void> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (!data.user) throw new Error('No user returned from authentication');

      setState({
        user: data.user,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setState({
        user: null,
        loading: false,
        error: error.message,
      });
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setState({
        user: null,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
      throw error;
    }
  };

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    signIn,
    signOut,
  };
}