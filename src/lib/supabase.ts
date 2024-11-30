import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase credentials missing, falling back to local storage');
}

export const supabase = supabaseUrl && supabaseKey
  ? createClient<Database>(supabaseUrl, supabaseKey)
  : null;

export const initializeSupabase = async () => {
  if (!supabase) return;

  // Create tables if they don't exist
  const { error } = await supabase.from('consultations').select('id').limit(1);
  
  if (error?.code === '42P01') { // Table doesn't exist
    await supabase.rpc('initialize_schema', {
      schema_sql: `
        CREATE TABLE IF NOT EXISTS consultations (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT NOT NULL,
          requirements TEXT,
          date DATE NOT NULL,
          time TIME NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending'
            CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'))
        );

        CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
        CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON consultations(created_at);
      `
    });
  }
};