import bgLogin from '@/assets/images/bg-login.png';
import logo from '@/assets/logo/logo-home.png';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className='flex justify-between w-full'>
      <Link to='/'>
        <img
          src={logo}
          alt=''
          className='absolute object-cover w-16 h-16 top-8 left-10'
        />
      </Link>
      <img src={bgLogin} alt='' className='object-cover w-1/2 h-screen' />
      <div className='flex items-center justify-center w-1/2 mx-auto'>
        <div className='flex flex-col items-center justify-center mx-auto space-y-4'>
          <h1 className='text-3xl font-bold'>Welcome Back ✌️</h1>
          <p className='text-sm '>
            Continue with Google or Enter Login Details
          </p>
          <form className='flex flex-col w-full h-full space-y-4'>
            <Input type='email' className='outline-none' placeholder='Email' />
            <Input
              type='password'
              className='outline-none'
              placeholder='Password'
            />
            <div className='flex items-center space-x-2'>
              <Checkbox id='terms' className='w-4 h-4' />
              <Label htmlFor='terms' className='text-base'>
                Remember me
              </Label>
            </div>
            <Button variant='default' className='bg-blue-500 hover:bg-blue-600'>
              Login
            </Button>
            <p className='font-medium'>
              Don’t have an account yet?{' '}
              <Link
                to='/sign-up'
                className='text-blue-600 underline cursor-pointer'
              >
                Create account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
