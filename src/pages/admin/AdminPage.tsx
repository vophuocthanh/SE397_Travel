import { AppContext, AppContextType } from '@/contexts/app.context';
import useCheckRole from '@/hooks/useCheckRole';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
  const { isAuthenticated } = useContext<AppContextType>(AppContext);

  const isAdmin = useCheckRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <p>You are logged in as {isAdmin ? 'admin' : 'user'}</p>
    </div>
  );
}
