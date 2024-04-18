import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '@/lib/storage';

const useCheckRole = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/me`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
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
