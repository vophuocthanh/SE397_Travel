import logo from '@/assets/logo/logo-home.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='flex items-center justify-between w-full px-10 py-4 mx-auto bg-transparent'>
      <img src={logo} alt='logo' className='object-cover w-16 h-16' />
      <div className='flex items-center justify-between gap-10 text-xl font-bold'>
        <Link to='/' className='text-white hover:underline'>
          Destination
        </Link>
        <Link to='/' className='text-white hover:underline'>
          Stories
        </Link>
        <Link to='/' className='text-white hover:underline'>
          Reviews
        </Link>
      </div>
      <div className='flex items-center gap-8 text-xl font-bold'>
        <Link to='/sign-up' className='text-white'>
          Sign Up
        </Link>
        <Link to='/login' className='px-6 py-2 bg-white rounded-3xl'>
          Login
        </Link>
      </div>
    </div>
  );
};

export default Header;
