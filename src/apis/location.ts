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
  image2,
  image3,
  image4,
  cuisine,
  suitable_subject,
  vchouer,
  time_out,
  ideal_time,
  transport,
  hotel,
  starting_gate,
  sight_seeing,
}: {
  image: string;
  location: string;
  country: string;
  price: number;
  remainingCount: number;
  image2: string;
  image3: string;
  image4: string;
  cuisine: string;
  suitable_subject: string;
  vchouer: string;
  time_out: string;
  ideal_time: string;
  transport: string;
  hotel: string;
  starting_gate: string;
  sight_seeing: string;

}) => {
  return request.post('/location', {
    image,
    location,
    country,
    price,
    remainingCount,
    image2,
    image3,
    image4,
    cuisine,
    suitable_subject,
    vchouer,
    time_out,
    ideal_time,
    transport,
    hotel,
    starting_gate,
    sight_seeing,
  });
};

export const putLocation = ({
  id,
  image,
  location,
  country,
  price,
  remainingCount,
  image2,
  image3,
  image4,
  cuisine,
  suitable_subject,
  vchouer,
  time_out,
  ideal_time,
  transport,
  hotel,
  starting_gate,
  sight_seeing,
}: {
  id: string;
  image: string;
  location: string;
  country: string;
  price: number;
  remainingCount: number;
  image2: string;
  image3: string;
  image4: string;
  cuisine: string;
  suitable_subject: string;
  vchouer: string;
  time_out: string;
  ideal_time: string;
  transport: string;
  hotel: string;
  starting_gate: string;
  sight_seeing: string;

}) => {
  return request.put(`/location/${id}`, {
    image,
    location,
    country,
    price,
    remainingCount,
    image2,
    image3,
    image4,
    cuisine,
    suitable_subject,
    vchouer,
    time_out,
    ideal_time,
    transport,
    hotel,
    starting_gate,
    sight_seeing,
  });
};

export const deteleLocation = (id: string) => {
  return request.delete(`/location/${id}`);
};
