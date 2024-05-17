import { request } from '@/lib/request';

export interface IMessage {
  message: string;
  tourId?: string;
  userId?: string;
  realTime?: string;
}

export const messageTourApi = () => {
  return request.get('/message');
};

export const createMessageApi = (data: IMessage, tourId: string) => {
  return request.post(`/${tourId}/message`, data);
};
