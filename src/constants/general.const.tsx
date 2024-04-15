import IconBuilding from '@/icon/IconBuilding';
import IconDashboard from '@/icon/IconDashboard';
import IconStar from '@/icon/IconStar';
import { TSidebarLinks } from '@/types/general.type';

export const sidebarLinks: TSidebarLinks[] = [
  {
    title: 'Dashboard',
    icon: <IconDashboard />,
    path: '/admin',
  },
  {
    title: 'Tour',
    icon: <IconBuilding />,
    path: '/admin/tour',
  },
  {
    title: 'Location',
    icon: <IconStar />,
    path: '/admin/location',
  },
  // {
  //   title: 'Review',
  //   path: '/review',
  // },
  // {
  //   title: 'Message',
  //   path: '/message',
  // },
  // {
  //   title: 'My Profile',
  //   path: '/my-profile',
  // },
];
