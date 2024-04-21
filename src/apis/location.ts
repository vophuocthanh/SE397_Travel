import { request } from '@/lib/request';

export const getLocation = () => {
  return request.get('/location');
};

interface LocationAdmin {
  id?: string;
  image: string;
  location: string;
  country: string;
  price: number;
}

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
export const deleleLocation = (id: string) => {
  return request.delete(`/location/${id}`);
};

export const putLocationAdmin = (id: string, data: LocationAdmin) => {
  return request.put(`/location/${id}`, data);
};

export const searchLocation = (keyword: string) => {
  return request.get(`/tour?search=${keyword}`);
};