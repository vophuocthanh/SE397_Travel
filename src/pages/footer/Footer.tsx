import logo from '@/assets/logo/logo-home.png';
import SectionInViewUp from '@/components/SectionInViewUp';

const Footer = () => {
  return (
    <SectionInViewUp className='flex flex-col items-center justify-center w-full h-56 mx-auto mt-20 space-y-2 bg-blue-600'>
      <img src={logo} alt='logo' className='object-cover w-16 h-16' />
      <p className='text-white'>© 2024 Travel Pulse. All rights reserved</p>
    </SectionInViewUp>
  );
};

export default Footer;
