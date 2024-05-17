import { IBestTrip } from '@/interface/best-trip';
import { request } from '@/lib/request';

export const getBestTrip = (page?: number) => {
  return request.get(`/tour?page=${page}&limit=3`);
};
export const getBestTripHome = (page?: number) => {
  return request.get(`/tour?page=${page}&limit=6`);
};
export const getBestTripAdmin = () => {
  return request.get(`/tour`);
};

export const createBestTrip = ({
  name,
  image,
  description,
  location,
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
  name: string;
  image: string;
  description: string;
  location: string;
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
  return request.post('/tour', {
    name,
    image,
    description,
    location,
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

export const getTripDetails = (id: string) => {
  return request.get(`/tour/${id}`);
};

export const searchBestTrip = (keyword: string) => {
  return request.get(`/tour?search=${keyword}`);
};

export const putBestTrip = ({
  id,
  name,
  image,
  description,
  location,
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
}: IBestTrip) => {
  return request.put(`/tour/${id}`, {
    name,
    image,
    description,
    location,
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

export const deteleBestTrip = (id: string) => {
  return request.delete(`/tour/${id}`);
};
