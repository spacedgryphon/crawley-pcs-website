import { useCallback } from 'react';

export function useNavigate() {
  const navigate = useCallback((path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, []);

  return { navigate };
}