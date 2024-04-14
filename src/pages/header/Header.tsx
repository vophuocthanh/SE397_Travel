import { getMe } from '@/apis/me';
import logo from '@/assets/logo/logo-home.png';
import { PopoverCart } from '@/components/PopoverCart';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getToken, removeToken } from '@/lib/storage';
import { useQuery } from '@tanstack/react-query';
import { LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface HeaderProps {
  className: string;
}

const Header = ({ className }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const menuStyle = isMenuOpen ? 'fixed z-10 top-8 right-4' : 'absolute';

  const navigate = useNavigate();
  const token = getToken();
  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: () => getMe(),
  });
  const logout = () => {
    removeToken();
    navigate('/login');
    toast.success('Logout successfully!');
  };
  return (
    <div className={className}>
      <Link to='/'>
        <img src={logo} alt='logo' className='object-cover w-16 h-16' />
      </Link>

      {/* Menu trên màn hình lớn */}
      <div className='items-center justify-between hidden gap-10 text-xl font-bold md:flex '>
        <Link to='/best-trip' className='text-white hover:underline'>
          Tours
        </Link>
        <Link to='/location' className='text-white hover:underline'>
          Locations
        </Link>
        <Link to='/' className='text-white hover:underline'>
          Reviews
        </Link>
      </div>

      {/* Menu dọc trên màn hình nhỏ */}
      <div
        className={`lg:hidden w-full ${
          isMenuOpen ? 'block w-full' : 'hidden'
        } z-10 fixed top-0 left-0 w-full bg-blue-400 pt-16 pb-8`}
      >
        <div className='flex flex-col gap-4 mt-4 text-xl font-bold'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className='flex justify-center text-white hover:underline hover:bg-gray-500'>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className='flex space-x-4 '>
                      <div className='w-max'>
                        <h2 className='text-slate-800'>
                          <h1 className='text-xl font-bold text-white'>
                            {meQuery.data?.data?.data.email}
                          </h1>
                        </h2>
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-56'>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem className='cursor-pointer'>
                        <User className='w-4 h-4 mr-2' />
                        <Link to='/profile'>Account</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={logout}
                        className='cursor-pointer'
                      >
                        <LogOut className='w-4 h-4 mr-2' />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>Account</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Link
            to='/best-trip'
            className='flex justify-center text-white hover:underline hover:bg-gray-500'
          >
            Tours
          </Link>
          <Link
            to='/location'
            className='flex justify-center text-white hover:underline hover:bg-gray-500 '
          >
            Locations
          </Link>
          <Link
            to='/'
            className='flex justify-center text-white hover:underline hover:bg-gray-500'
          >
            Reviews
          </Link>
        </div>
      </div>

      {/* Biểu tượng menu trên màn hình nhỏ */}
      {token ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className={`top-8 right-3 lg:hidden inline-flex items-center justify-center w-10 h-10 p-2 rounded-lg bg-white hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-colors duration-300 focus:ring-gray-200 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-colors duration-300 ${menuStyle}`}
          onClick={handleMenuClick}
        >
          <line x1='4' x2='20' y1='12' y2='12' />
          <line x1='4' x2='20' y1='6' y2='6' />
          <line x1='4' x2='20' y1='18' y2='18' />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className={`hidden top-8 right-3 lg:hidden inline-flex items-center justify-center w-10 h-10 p-2 rounded-lg bg-white hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-colors duration-300 focus:ring-gray-200 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-colors duration-300 ${menuStyle}`}
          onClick={handleMenuClick}
        >
          <line x1='4' x2='20' y1='12' y2='12' />
          <line x1='4' x2='20' y1='6' y2='6' />
          <line x1='4' x2='20' y1='18' y2='18' />
        </svg>
      )}

      {token ? (
        <div className='flex items-center gap-8 '>
          <PopoverCart />
          <div className='hidden lg:flex'>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className='flex space-x-4'>
                  <div className='w-max'>
                    <h1 className='text-xl font-bold text-white xl:block lg:hidden'>
                      {meQuery.data?.data?.data.email}
                    </h1>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-auto'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className='cursor-pointer'>
                    <User className='w-4 h-4 mr-2' />
                    <Link to='/profile'>Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className='cursor-pointer'>
                    <LogOut className='w-4 h-4 mr-2' />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ) : (
        <div className='flex items-center gap-8 ml-6 text-xl font-bold'>
          <Link to='/sign-up' className='text-white'>
            Sign Up
          </Link>
          <Link to='/login' className='px-6 py-2 bg-white rounded-3xl'>
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
