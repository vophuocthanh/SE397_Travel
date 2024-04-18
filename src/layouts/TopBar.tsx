import { Link, useNavigate } from 'react-router-dom';
import logo from '@/assets/logo/logo_Sigup.png';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/apis/me';
import { removeToken } from '@/lib/storage';
import { toast } from 'sonner';

const TopBar = () => {
  return (
    <div className='flex items-center justify-between px-5 py-4 bg-[#FCFCFC]'>
      <div className='flex items-center gap-[82px] flex-1'>
        <Logo />
        <Input
          className='w-[300px] bg-[#F4F4F4] outline-none'
          placeholder='Search...'
        />
      </div>
      <UserAdmin />
    </div>
  );
};

function Logo() {
  return (
    <Link to='/' className='flex items-center gap-4'>
      <img src={logo} alt='logo' className='object-cover w-16 h-16' />
    </Link>
  );
}

function UserAdmin() {
  const navigate = useNavigate();
  const meQuery = useQuery({
    queryKey: ['meAdmin'],
    queryFn: () => getMe(),
  });
  const logout = () => {
    removeToken();
    navigate('/login');
    toast.success('Logout successfully!');
  };
  return (
    <div className='flex items-center flex-shrink-0 gap-5'>
      <div className='flex items-center gap-[10px] flex-shrink-0'>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className='flex space-x-4 '>
              <div className='w-max'>
                <h2 className='text-slate-800'>
                  <h1 className='text-xl font-bold border-none outline-none'>
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
              <DropdownMenuItem onClick={logout} className='cursor-pointer'>
                <LogOut className='w-4 h-4 mr-2' />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default TopBar;
