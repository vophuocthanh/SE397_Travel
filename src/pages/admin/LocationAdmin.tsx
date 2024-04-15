import { AppContext, AppContextType } from '@/contexts/app.context';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function LocationAdmin() {
  const { isAuthenticated } = useContext<AppContextType>(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  if (!isAuthenticated) {
    return null;
  }
  return <div>LocationAdmin</div>;
}
