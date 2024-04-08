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
    });
  };

  return (
    <>
      <Header className='flex items-center justify-between w-full px-10 py-4 mx-auto bg-blue-500' />
      <h1 className='text-3xl font-bold mt-10 mx-auto flex justify-center'>
        Create New Trip
      </h1>
      <div className='flex justify-center max-w-7xl mx-auto'>
        <form className='mt-10 space-y-4' onSubmit={handleSubmit}>
          <div className='space-y-2'>
            <label htmlFor='name'>Name</label>
            <Input
              id='name'
              placeholder='Name'
              className='w-96 outline-none'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='image'>Image</label>
            <Input
              id='image'
              placeholder='Image'
              className='w-96 outline-none'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='desc'>Description</label>
            <Input
              id='desc'
              placeholder='Desc'
              className='w-96 outline-none'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='location'>Location</label>
            <Input
              id='location'
              placeholder='Location'
              className='w-96 outline-none'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='price'>Price</label>
            <Input
              id='price'
              placeholder='Price'
              className='w-96 outline-none'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className='flex justify-center items-center mx-auto gap-6'>
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
