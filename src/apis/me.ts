import { request } from '@/lib/request';

export const getMe = () => {
  return request.get('/users/me');
};
