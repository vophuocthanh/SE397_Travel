import { getMe } from '@/apis/me';
import logo from '@/assets/logo/logo-home.png';
import { Avatar } from '@/components/ui/avatar';
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
import { LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface HeaderProps {
  className: string;
}

const Header = ({ className }: HeaderProps) => {
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
      {token ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className='flex space-x-4'>
                    <Avatar />
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
      ) : (
        <div className='flex items-center gap-8 text-xl font-bold'>
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
