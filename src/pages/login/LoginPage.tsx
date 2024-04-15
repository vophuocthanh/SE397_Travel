import bgLogin from '@/assets/images/bg-login.png';
import logo from '@/assets/logo/logo-home.png';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getToken, setToken } from '@/lib/storage';
import { useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/lib/shcema';
import { signIn } from '@/apis/auth';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import * as z from 'zod';
import IconEyShow from '@/icon/IconEyeShow';
import IconEyeHidden from '@/icon/IconEyeHidden';

export function Loader() {
  const isAuth = getToken();
  if (isAuth) {
    return redirect('/');
  }
  return null;
}

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = async ({
    email,
    password,
  }) => {
    try {
      setIsLoading(true);
      const res = await signIn(email, password);
      setToken(res.data.accessToken);
      navigate('/');
      toast.success('Login successfully!');
    } catch (error) {
      toast.error('Invalid email or password');
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='flex justify-between w-full'>
      <Link to='/'>
        <img
          src={logo}
          alt=''
          className='absolute object-cover w-16 h-16 top-8 left-10'
        />
      </Link>
      <img
        src={bgLogin}
        alt=''
        className='hidden object-cover w-1/2 sm:w-[61%] h-screen lg:block'
      />
      <div className='flex items-center justify-center w-full h-screen mx-auto sm:w-2/3 '>
        <div className='flex flex-col items-center justify-center mx-auto space-y-4 sm:w-2/3 lg:w-1/2'>
          <h1 className='text-2xl font-bold sm:text-3xl'>Welcome Back ✌️</h1>
          <p className='text-sm text-center lg:w-full'>
            Continue with Google or Enter Login Details
          </p>
          <form
            className='flex flex-col w-full h-full space-y-4'
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type='email'
              className='outline-none '
              placeholder='Email'
              {...register('email')}
            />
            {errors.email && (
              <p className='text-red-500'>{errors.email.message}</p>
            )}
            <Input
              type={show ? 'text' : 'password'}
              className='outline-none '
              placeholder='Password'
              {...register('password')}
            />
            {show ? (
              <IconEyShow
                className='absolute -translate-y-1/2 cursor-pointer right-72 top-[49.5%]'
                onClick={() => setShow(false)}
              />
            ) : (
              <IconEyeHidden
                className='absolute -translate-y-1/2 cursor-pointer right-72 top-[48.5%]'
                onClick={() => setShow(true)}
              />
            )}
            {errors.password && (
              <p className='text-red-400'>{errors.password.message}</p>
            )}
            <div className='flex justify-between'>
              <div className='flex items-center space-x-2'>
                <Checkbox id='terms' className='w-4 h-4' />
                <Label htmlFor='terms' className='text-base'>
                  Remember me
                </Label>
              </div>
              <Link to='/forgot-password' className='text-blue-600 underline'>
                Forgot Password
              </Link>
            </div>
            <Button
              variant='default'
              className='bg-blue-500 hover:bg-blue-600'
              type='submit'
              loading={isLoading}
            >
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
