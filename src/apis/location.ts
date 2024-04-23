import { request } from '@/lib/request';

export const getLocation = () => {
  return request.get('/location');
};

export const getLocationPagination = (page?: number) => {
  return request.get(`/location?page=${page}&limit=3`);
};

export const getDetailsLocation = (id: string) => {
  return request.get(`/location/${id}`);
};

export const createLocation = ({
  image,
  location,
  country,
  price,
  remainingCount,
}: {
  image: string;
  location: string;
  country: string;
  price: number;
  remainingCount: number;
}) => {
  return request.post('/location', {
    image,
    location,
    country,
    price,
    remainingCount,
  });
};

export const putLocation = ({
  id,
  image,
  location,
  country,
  price,
  remainingCount,
}: {
  id: string;
  image: string;
  location: string;
  country: string;
  price: number;
  remainingCount: number;
}) => {
  return request.put(`/location/${id}`, {
    image,
    location,
    country,
    price,
    remainingCount,
  });
};

export const deteleLocation = (id: string) => {
  return request.delete(`/location/${id}`);
};
