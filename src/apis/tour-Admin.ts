import { request } from "@/lib/request";

export const createTourAdmin = ({
    
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