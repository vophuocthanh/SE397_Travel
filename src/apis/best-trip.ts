import { request } from '@/lib/request';

export const getBestTrip = (page?: number) => {
  return request.get(`/tour?page=${page}&limit=3`);
};
