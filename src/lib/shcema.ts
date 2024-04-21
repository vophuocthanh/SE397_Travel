import * as z from 'zod';
import { validator } from './validator';

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email('Email must be valid'),
  password: z
    .string()
    .min(1, {
      message: 'Password is required',
    })
    .regex(
      validator.password,
      'Password must contain at least 8 characters, 1 letter and 1 number'
    ),
});

export const SignUpSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email('Email must be valid'),
  password: z
    .string()
    .min(1, {
      message: 'Password is required',
    })
    .regex(
      validator.password,
      'Password must contain at least 8 characters, 1 letter and 1 number'
    ),
});

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email('Email must be valid'),
});

export const ResetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, {
      message: 'Password is required',
    })
    .regex(
      validator.password,
      'Password must contain at least 8 characters, 1 letter and 1 number'
    ),
});

export const TourAdminSchema = z.object({
  id: z.string().min(1, {
    message: 'Tour ID is required',
  }),
  name: z.string().min(1, {
    message: 'Tour name is required',
  }),
  image: z.string().url({
    message: 'Tour image must be a valid URL',
  }),
  description: z.string().min(1, {
    message: 'Tour description is required',
  }),
  location: z.string().min(1, {
    message: 'Tour location is required',
  }),
  price: z.number().positive({
    message: 'Tour price must be a positive number',
  }),
});
export type TourSchemaType = {
  id: string|undefined;
  name: string;
  image?: string;
  description?: string;
  location?: string;
  price?: string;
  remainingCount?: string;
  
};
