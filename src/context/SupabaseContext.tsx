import React, { createContext, useContext } from 'react';
import { Session } from '@supabase/supabase-js';
import { useSupabase } from '../hooks/useSupabase';

interface SupabaseContextType {
  session: Session | null;
  loading: boolean;
}

const SupabaseContext = createContext<SupabaseContextType>({
  session: null,
  loading: true,
});

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const { session, loading } = useSupabase();

  return (
    <SupabaseContext.Provider value={{ session, loading }}>
      {children}
    </SupabaseContext.Provider>
  );
}

export const useSupabaseContext = () => useContext(SupabaseContext);