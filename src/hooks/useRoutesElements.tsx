import Home from '@/pages/Home';
import LoginPage from '@/pages/login/LoginPage';
import SignUpPage from '@/pages/sign-up/SignUpPage';
import { useRoutes } from 'react-router-dom';
export default function useRoutesElements() {
  const routeElements = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/sign-up', element: <SignUpPage /> },
    { path: '*', element: <h1>404</h1> },
  ]);
  return routeElements;
}
