import ForgotPassword from '@/pages/forgot-password/ForgotPassword';
import ResetPassword from '@/pages/reset-password/ResetPassword';
import Home from '@/pages/Home';
import BestTrip from '@/pages/best-trip/BestTrip';
import DetailsBestTrip from '@/pages/best-trip/details/DetailsBestTrip';
import CheckOut from '@/pages/check-out/CheckOut';
import LocationAll from '@/pages/location/LocationAll';
import LoginPage from '@/pages/login/LoginPage';
import Payment from '@/pages/pay/Payment';
import Profile from '@/pages/profile/Profile';
import SignUpPage from '@/pages/sign-up/SignUpPage';
import { useRoutes } from 'react-router-dom';
import AdminPage from '@/pages/admin/AdminPage';
import LayoutMain from '@/layouts/LayoutMain';
import LocationAdmin from '@/pages/admin/AdminLocation/LocationAdmin';
import LocationAdminDetail from '@/pages/admin/AdminLocation/components/LocationAdminDetail';
import { UpdateLocationAdmin } from '@/pages/admin/AdminLocation/components/UpdateLocationAdmin';
import TourAdmin from '@/pages/admin/Tour-Admin/TourAdmin';
import TourAdminDetail from '@/pages/admin/Tour-Admin/components/TourAdminDetail';
import UserAdmin from '@/pages/admin/users/UserAdmin';
import UserAdminDetails from '@/pages/admin/users/UserAdminDetails';
import DetailsLocation from '@/pages/location/details/DetailsLocation';

export default function useRoutesElements() {
  const routeElements = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/sign-up', element: <SignUpPage /> },
    {
      path: '/admin/loaction/edit/:id',
      element: <LayoutMain children={<UpdateLocationAdmin />} />,
    },
    {
      path: '/admin/loaction/detail/:id',
      element: <LayoutMain children={<LocationAdminDetail />} />,
    },
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
    { path: '/best-trip/details/:tourId', element: <DetailsBestTrip /> },
    { path: '/location', element: <LocationAll /> },
    { path: '/location/details/:locationId', element: <DetailsLocation /> },
    { path: '/payment/checkout', element: <Payment /> },
    { path: '/payment/checkoutDetail', element: <CheckOut /> },
    { path: '*', element: <h1>404</h1> },
  ]);
  return routeElements;
}
