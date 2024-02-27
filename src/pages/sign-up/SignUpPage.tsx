import bgSingIn from '@/assets/images/bg-sign-in.png';
import logo from '@/assets/logo/logo-home.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { setToken } from '@/lib/storage';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema } from '@/lib/shcema';
import { signUp } from '@/apis/auth';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import * as z from 'zod';

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof SignUpSchema>> = async ({
    email,
    password,
  }) => {
    try {
      setIsLoading(true);
      const res = await signUp(email, password);
      setToken(res.data.accessToken);
      navigate('/login');
      toast.success('Create account successfully!');
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
      <img src={bgSingIn} alt='' className='object-cover w-1/2 h-screen' />
      <div className='flex items-center justify-center w-1/2 mx-auto'>
        <div className='flex flex-col items-center justify-center mx-auto space-y-4'>
          <h1 className='text-3xl font-bold'>Hi, Get Started Now ✌️</h1>
          <p className='text-sm '>
            Enter details to create your Travel Pulse account
          </p>
          <form
            className='flex flex-col w-full h-full space-y-4'
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type='email'
              className='outline-none'
              placeholder='Email address'
              {...register('email')}
            />
            {errors.email && (
              <p className='text-red-500'>{errors.email.message}</p>
            )}
            <Input
              type='password'
              className='outline-none'
              placeholder='Password'
              {...register('password')}
            />
            {errors.password && (
              <p className='text-red-500'>{errors.password.message}</p>
            )}
            <Button
              loading={isLoading}
              variant='default'
              className='bg-blue-500 hover:bg-blue-600'
            >
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
