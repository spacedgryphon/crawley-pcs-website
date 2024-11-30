import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { initSupabase } from './config/supabase';
import './index.css';

// Initialize Supabase
initSupabase().catch(console.error);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);