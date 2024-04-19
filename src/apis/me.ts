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

export const getUserTotal = () => {
  return request.get('/users');
};

export const deleleUserMe = (id: string) => {
  return request.delete(`/users/${id}`);
};

export const getUserDetailsAdmin = (id: string) => {
  return request.get(`/users/${id}`);
};
