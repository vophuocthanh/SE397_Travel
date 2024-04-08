import { request } from '@/lib/request';

export const getMe = () => {
  return request.get('/users/me');
};

export const updateMe = ({
  username,
  fullName,
}: {
  username: string;
  fullName: string;
}) => {
  return request.put('/users/me', { username, fullName });
};
