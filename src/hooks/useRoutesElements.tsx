import ForgotPassword from '@/pages/forgot-password/ForgotPassword';
import ResetPassword from '@/pages/reset-password/ResetPassword';
import Home from '@/pages/Home';
import BestTrip from '@/pages/best-trip/BestTrip';
import DetailsBestTrip from '@/pages/best-trip/details/DetailsBestTrip';
import CreateNewTrip from '@/pages/best-trip/new-trip/CreateNewTrip';
import CheckOut from '@/pages/check-out/CheckOut';
import LocationAll from '@/pages/location/LocationAll';
import CreateNewLocation from '@/pages/location/create/CreateNewLocation';
import DetailsLocation from '@/pages/location/details/DetailsLocation';
import LoginPage from '@/pages/login/LoginPage';
import Payment from '@/pages/pay/Payment';
import Profile from '@/pages/profile/Profile';
import SignUpPage from '@/pages/sign-up/SignUpPage';
import { useRoutes } from 'react-router-dom';
import AdminPage from '@/pages/admin/AdminPage';
import LayoutMain from '@/layouts/LayoutMain';
import LocationAdmin from '@/pages/admin/LocationAdmin';
import UserAdmin from '@/pages/admin/users/UserAdmin';
import UserAdminDetails from '@/pages/admin/users/UserAdminDetails';
import TourAdminDetail from '@/pages/admin/Tour-Admin/components/TourAdminDetail';
import TourAdmin from '@/pages/admin/Tour-Admin/TourAdmin';
export default function useRoutesElements() {
  const routeElements = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/sign-up', element: <SignUpPage /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    { path: '/reset-password', element: <ResetPassword /> },
    { path: '/admin', element: <LayoutMain children={<AdminPage />} /> },
    { path: '/admin/tour', element: <LayoutMain children={<TourAdmin />} /> },
    {
      path: '/admin/tour/detail/:tourId',
      element: <LayoutMain children={<TourAdminDetail />} />,
    },
    {
      path: '/admin/location',
      element: <LayoutMain children={<LocationAdmin />} />,
    },
    {
      path: '/admin/user',
      element: <LayoutMain children={<UserAdmin />} />,
    },
    {
      path: '/admin/user/:id',
      element: <LayoutMain children={<UserAdminDetails />} />,
    },
    { path: '/profile', element: <Profile /> },
    { path: '/best-trip', element: <BestTrip /> },
    { path: '/best-trip/create', element: <CreateNewTrip /> },
    { path: '/best-trip/details/:tourId', element: <DetailsBestTrip /> },
    { path: '/location', element: <LocationAll /> },
    { path: '/location/create', element: <CreateNewLocation /> },
    { path: '/location/details/:locationId', element: <DetailsLocation /> },
    { path: '/payment/checkout', element: <Payment /> },
    { path: '/payment/checkoutDetail', element: <CheckOut /> },
    { path: '*', element: <h1>404</h1> },
  ]);
  return routeElements;
}
