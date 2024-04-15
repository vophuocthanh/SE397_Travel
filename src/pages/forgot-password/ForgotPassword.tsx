import { forgotPassword } from '@/apis/auth';
import bgAuth from '@/assets/images/bg-forgot-password.jpg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ForgotPasswordSchema } from '@/lib/shcema';
import { getToken } from '@/lib/storage';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, redirect } from 'react-router-dom';
import { toast } from 'sonner';
import * as z from 'zod';

export function Loader() {
  const isAuth = getToken();
  if (isAuth) {
    return redirect('/');
  }
  return null;
}

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: 'example@gmail.com',
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof ForgotPasswordSchema>> = async ({
    email,
  }) => {
    try {
      setIsLoading(true);
      await forgotPassword(email);
      toast.success(
        'Your password has been sent to your email! Please check your email'
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className='relative w-full h-screen'>
      <img alt='' src={bgAuth} className='object-cover w-full h-full' />
      <div className='absolute w-full max-w-xl p-2 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:max-w-3xl'>
        <div className='flex w-full gap-20 p-8 text-white bg-gray-800 rounded-sm'>
          <div className='w-full'>
            <Link to='/login' className='inline-flex mb-4'>
              <ChevronLeft /> Go back
            </Link>
            <h1 className='text-2xl font-bold text-center'>Forgot Password</h1>
            <form className='mt-5 text-start' onSubmit={handleSubmit(onSubmit)}>
              <Input
                placeholder='Email Or Phone Number'
                className='text-black bg-white outline-none'
                {...register('email')}
              />
              {errors.email && (
                <p className='mt-1 text-red-500'>{errors.email.message}</p>
              )}
              <Button
                className='w-full mt-4 mb-3'
                type='submit'
                loading={isLoading}
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
