import { request } from '@/lib/request';

export const getBestTrip = (page?: number) => {
  return request.get(`/tour?page=${page}&limit=3`);
};

export const createBestTrip = ({
  name,
  image,
  description,
  location,
  price,
}: {
  name: string;
  image: string;
  description: string;
  location: string;
  price: number;
}) => {
  return request.post('/tour', { name, image, description, location, price });
};

export const getTripDetails = (id: string) => {
  return request.get(`/tour/${id}`);
};

export const searchBestTrip = (keyword: string) => {
  return request.get(`/tour?search=${keyword}`);
};
