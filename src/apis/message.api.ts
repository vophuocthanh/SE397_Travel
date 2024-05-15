import { request } from '@/lib/request';

export interface IMessage {
  message: string;
  tourId?: string;
  userId?: string;
}

export const messageTourApi = () => {
  return request.get('/message');
};

export const createMessageApi = (data: IMessage) => {
  return request.post('/message', data);
};
