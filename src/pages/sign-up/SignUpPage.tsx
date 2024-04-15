import bgSingIn from '@/assets/images/bg-sign-in.png';
import logo from '@/assets/logo/logo-home.png';
import logosignup from '@/assets/logo/logo_Sigup.png';
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
import IconEyShow from '@/icon/IconEyeShow';
import IconEyeHidden from '@/icon/IconEyeHidden';

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
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
          className='absolute hidden object-cover w-16 h-16 sm:block top-8 left-10'
        />
      </Link>
      <img
        src={bgSingIn}
        alt=''
        className='hidden object-cover w-1/2 sm:w-[48%] h-screen md:block'
      />
      <div className='flex items-center justify-center w-1/2 mx-auto sm:w-2/3 lg:w-1/2'>
        <div className='flex flex-col items-center justify-center mx-auto space-y-4 sm:w-2/3 lg:w-1/2 '>
          <img
            src={logosignup}
            alt=''
            className='visible object-cover mt-6 mb-[50%] sm:mb-0 md:hidden'
          />
          <div className='flex flex-col gap-6 sm:gap-2'>
            <h1 className='py-2 text-2xl font-bold text-center sm:text-3xl'>
              Hi, Get Started Now ✌️
            </h1>
            <p className='text-sm text-center lg:w-full'>
              Enter details to create your Travel Pulse account
            </p>
            <form
              className='flex flex-col h-full space-y-4 w-80 sm:w-full'
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                type='email'
                className='outline-none sm:w-[500px]'
                placeholder='Email address'
                {...register('email')}
              />
              {errors.email && (
                <p className='text-red-500'>{errors.email.message}</p>
              )}
              <Input
                type={show ? 'text' : 'password'}
                className='outline-none sm:w-[500px]'
                placeholder='Password'
                {...register('password')}
              />
              {show ? (
                <IconEyShow
                  className='absolute -translate-y-1/2 cursor-pointer right-12 md:right-40 top-[54.5%] md:top-[53.5%]'
                  onClick={() => setShow(false)}
                />
              ) : (
                <IconEyeHidden
                  className='absolute -translate-y-1/2 cursor-pointer right-12 md:right-40 top-[52.5%] md:top-[52.5%]'
                  onClick={() => setShow(true)}
                />
              )}
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
    </div>
  );
};

export default SignUpPage;
