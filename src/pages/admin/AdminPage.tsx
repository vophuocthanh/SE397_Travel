import { AppContext, AppContextType } from '@/contexts/app.context';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminPage() {
  const { isAuthenticated } = useContext<AppContextType>(AppContext);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/me');
        const { role } = response.data;
        setUserRole(role);
        console.log('response:', response);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, []);

  if (!userRole) {
    return <div>Loading...</div>;
  }

  if (userRole !== 'ADMIN') {
    navigate('/login');
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }
  return <div>AdminPage</div>;
}
