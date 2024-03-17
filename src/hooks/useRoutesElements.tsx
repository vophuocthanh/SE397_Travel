import Home from '@/pages/Home';
import BestTrip from '@/pages/best-trip/BestTrip';
import DetailsBestTrip from '@/pages/best-trip/details/DetailsBestTrip';
import CreateNewTrip from '@/pages/best-trip/new-trip/CreateNewTrip';
import LocationAll from '@/pages/location/LocationAll';
import CreateNewLocation from '@/pages/location/create/CreateNewLocation';
import DetailsLocation from '@/pages/location/details/DetailsLocation';
import LoginPage from '@/pages/login/LoginPage';
import Payment from '@/pages/pay/Payment';
import Profile from '@/pages/profile/Profile';
import SignUpPage from '@/pages/sign-up/SignUpPage';
import { useRoutes } from 'react-router-dom';
export default function useRoutesElements() {
  const routeElements = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/sign-up', element: <SignUpPage /> },
    { path: '/profile', element: <Profile /> },
    { path: '/best-trip', element: <BestTrip /> },
    { path: '/best-trip/create', element: <CreateNewTrip /> },
    { path: '/best-trip/details/:tourId', element: <DetailsBestTrip /> },
    { path: '/location', element: <LocationAll /> },
    { path: '/location/create', element: <CreateNewLocation /> },
    { path: '/location/details/:locationId', element: <DetailsLocation /> },
    { path: '/payment/checkout', element: <Payment /> },
    { path: '*', element: <h1>404</h1> },
  ]);
  return routeElements;
}
