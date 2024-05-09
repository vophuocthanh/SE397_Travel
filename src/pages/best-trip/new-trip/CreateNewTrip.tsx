import { createBestTrip } from '@/apis/best-trip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/pages/header/Header';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function CreateNewTrip() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [remainingCount, setRemainingCount] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [suitable_subject, setSuitable_subject] = useState('');
  const [vchouer, setVchouer] = useState('');
  const [time_out, setTime_out] = useState('');
  const [ideal_time, setIdeal_time] = useState('');
  const [transport, setTransport] = useState('');
  const [hotel, setHotel] = useState('');
  const [starting_gate, setStarting_gate] = useState('');
  const [sight_seeing, setSight_seeing] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const createTourQuery = useMutation({
    mutationFn: createBestTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['createBestTrip'],
      });
      toast.success('Create Successfully');
      setLoading(false);
      navigate('/best-trip');
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createTourQuery.mutate({
      name,
      image,
      description,
      location,
      price: Number(price),
      remainingCount: Number(remainingCount),
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

  return (
    <>
      <Header className='flex items-center justify-between w-full px-10 py-4 mx-auto bg-blue-500' />
      <h1 className='flex justify-center mx-auto mt-10 text-3xl font-bold'>
        Create New Trip
      </h1>
      <div className='flex justify-center mx-auto max-w-7xl'>
        <form className='mt-10 space-y-4' onSubmit={handleSubmit}>
          <div className='space-y-2'>
            <label htmlFor='name'>Name</label>
            <Input
              id='name'
              placeholder='Name'
              className='outline-none w-96'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='image'>Image</label>
            <Input
              id='image'
              placeholder='Image'
              className='outline-none w-96'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='desc'>Description</label>
            <Input
              id='desc'
              placeholder='Desc'
              className='outline-none w-96'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='location'>Location</label>
            <Input
              id='location'
              placeholder='Location'
              className='outline-none w-96'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='price'>Price</label>
            <Input
              id='price'
              placeholder='Price'
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
    </>
  );
}
