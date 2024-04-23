import { request } from '@/lib/request';

export const getLocation = () => {
  return request.get('/location');
};



export const createLocation = ({
  image,
  location,
  country,
  price,
}: {
  image: string;
  location: string;
  country: string;
  price: number;
}) => {
  return request.post(`/location`, { image, location, country, price });
};

export const getDetailsLocation = (id: string) => {
  return request.get(`/location/${id}`);
};


