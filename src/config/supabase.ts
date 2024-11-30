import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Missing Supabase credentials');
  throw new Error('Supabase credentials are required');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export const initSupabase = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      throw error;
    }

    console.info('Supabase initialized successfully');
    return data.session;
  } catch (error) {
    console.error('Failed to initialize Supabase:', error);
    throw error;
  }
};