import { getMe } from '@/apis/me';
import logo from '@/assets/logo/logo-home.png';
import { ModeToggle } from '@/components/mode-toggle';
import { PopoverCart } from '@/components/PopoverCart';
import SectionInViewDown from '@/components/SectionInViewDown';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Language } from '@/language/Language';

import { getToken, removeToken } from '@/lib/storage';
import { useQuery } from '@tanstack/react-query';
import { LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useTranslation } from "react-i18next";

interface HeaderProps {
  className: string;
}

const Header = ({ className }: HeaderProps) => {
  const {t} = useTranslation();
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
    <SectionInViewDown className={className}>
      <Link to='/'>
        <img src={logo} alt='logo' className='object-cover w-16 h-16' />
      </Link>

      {/* Menu trên màn hình lớn */}
      <div className='items-center justify-between hidden gap-10 text-xl font-bold md:flex '>
        <Link to='/best-trip' className='text-white hover:underline'>
           {t("Tours")}
        </Link>
        <Link to='/location' className='text-white hover:underline'>
           {t("Locations")}
        </Link>
        <Link to='/chat-ai' className='text-white hover:underline'>
           {t("Chat AI")}
        </Link>
      </div>

      {/* Menu dọc trên màn hình nhỏ */}
      <div
        className={`lg:hidden w-full ${
          isMenuOpen ? 'block w-full' : 'hidden'
        } z-10 fixed top-0 left-0 w-full bg-gradient-to-r from-purple-600 via-red-300 to-yellow-500 pt-16 pb-8`}
      >
        <div className='flex flex-col gap-4 mt-4 text-xl font-bold'>
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
              <DropdownMenuLabel> {t("My_Account")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className='cursor-pointer'>
                  <Link to='/profile' className='flex items-center'>
                    <User className='w-4 h-4 mr-2' />
                    <p> {t("Account")}</p>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className='cursor-pointer'>
                  <LogOut className='w-4 h-4 mr-2' />
                  <span> {t("log_out")}</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            to='/best-trip'
            className='flex justify-center text-white hover:underline hover:bg-gray-500'
          >
             {t("Tours")}
          </Link>
          <Link
            to='/location'
            className='flex justify-center text-white hover:underline hover:bg-gray-500 '
          >
             {t("Locations")}
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
          <Language />
          <ModeToggle />
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
                <DropdownMenuLabel> {t("My_Account")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className='cursor-pointer'>
                    <Link to='/profile' className='flex items-center'>
                      <User className='w-4 h-4 mr-2' />
                      <p> {t("Account")}</p>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className='cursor-pointer'>
                    <LogOut className='w-4 h-4 mr-2' />
                    <span> {t("log_out")}</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ) : (
        <div className='flex items-center gap-8 ml-6 text-xl font-bold'>
          <Language />
          <ModeToggle />
          <Link to='/sign-up' className='text-white'>
             {t("Sign_Up")}
          </Link>
          <Link to='/login' className='px-6 py-2 bg-white rounded-3xl'>
             {t("Sign_In")}
          </Link>
        </div>
      )}
    </SectionInViewDown>
  );
};

export default Header;
