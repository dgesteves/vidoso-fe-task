import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useRedirect(fromPath: string, toPath: string) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === fromPath) {
      navigate(toPath, { replace: true });
    }
  }, [location.pathname, navigate, fromPath, toPath]);

  return { location, navigate };
}
