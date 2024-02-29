import { request } from '@/lib/request';

export const getBestTrip = (page?: number) => {
  return request.get(`/tour?page=${page}&limit=3`);
};

export const createBestTrip = ({
  name,
  image,
  description,
  location,
}: {
  name: string;
  image: string;
  description: string;
  location: string;
}) => {
  return request.post('/tour', { name, image, description, location });
};

export const getTripDetails = (id: string) => {
  return request.get(`/tour/${id}`);
};
