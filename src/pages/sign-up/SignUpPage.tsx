import bgSingIn from '@/assets/images/bg-sign-in.png';
import logo from '@/assets/logo/logo-home.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  return (
    <div className='flex justify-between w-full'>
      <Link to='/'>
        <img
          src={logo}
          alt=''
          className='absolute object-cover w-16 h-16 top-8 left-10'
        />
      </Link>
      <img src={bgSingIn} alt='' className='object-cover w-1/2 h-screen' />
      <div className='flex items-center justify-center w-1/2 mx-auto'>
        <div className='flex flex-col items-center justify-center mx-auto space-y-4'>
          <h1 className='text-3xl font-bold'>Hi, Get Started Now ✌️</h1>
          <p className='text-sm '>
            Enter details to create your Travel Pulse account
          </p>
          <form className='flex flex-col w-full h-full space-y-4'>
            <Input
              type='email'
              className='outline-none'
              placeholder='Email address'
            />
            <Input
              type='password'
              className='outline-none'
              placeholder='Password'
            />
            <Button variant='default' className='bg-blue-500 hover:bg-blue-600'>
              Sign Up
            </Button>
            <p className='font-medium'>
              Already have an account?
              <Link
                to='/login'
                className='text-blue-600 underline cursor-pointer'
              >
                Sign in to account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;