import { createLocation } from '@/apis/location';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/pages/header/Header';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function CreateNewLocation() {
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const queryAddLOcation = useMutation({
    mutationFn: createLocation,

    onSuccess: () => {
      setLoading(true);
      queryClient.invalidateQueries({ queryKey: ['getLocation'] });
      toast.success('Create location Successfully');
      setLoading(false);
      navigate('/location');
    },
  });
  console.log('queryAddLOcation:', queryAddLOcation);
  const handleSubmitLocation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    queryAddLOcation.mutate({
      image,
      location,
      country,
      price: Number(price),
    });
  };
  return (
    <div>
      <Header className='flex items-center justify-between w-full px-10 py-4 mx-auto bg-blue-500' />
      <h1 className='flex justify-center mx-auto mt-10 text-3xl font-bold'>
        Create New Location
      </h1>
      <div className='flex justify-center mx-auto max-w-7xl'>
        <form className='mt-10 space-y-4' onSubmit={handleSubmitLocation}>
          <div className='space-y-2'>
            <label htmlFor='image' className='text-xl font-bold'>
              Image
            </label>
            <Input
              id='image'
              placeholder='Enter your image'
              className='outline-none w-96'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='location' className='text-xl font-bold'>
              Location
            </label>
            <Input
              id='location'
              placeholder='Enter your location'
              className='outline-none w-96'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='country' className='text-xl font-bold'>
              Countries
            </label>
            <Input
              id='country'
              placeholder='Enter your country'
              className='outline-none w-96'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='price' className='text-xl font-bold'>
              Price
            </label>
            <Input
              id='price'
              placeholder='Enter your price'
              className='outline-none w-96'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className='flex items-center justify-center gap-6 mx-auto'>
            <Button loading={loading}>Create New Trip</Button>
            <Link to='/best-trip'>
              <Button loading={loading}>Back</Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
