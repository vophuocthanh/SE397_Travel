import { useEffect, useState } from 'react';
import axios from 'axios';

const useCheckRole = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const userRole = response.data.data.role;
        setIsAdmin(userRole === 'ADMIN');
      } catch (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
      }
    };

    checkAdminRole();

    return () => {};
  }, []);

  return isAdmin;
};

export default useCheckRole;
