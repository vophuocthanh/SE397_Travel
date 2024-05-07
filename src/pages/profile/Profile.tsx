import { useEffect, useState } from 'react';
import Header from '../header/Header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMe, updateMe } from '@/apis/me';
import { toast } from 'sonner';

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const meQuery = useQuery({
    queryKey: ['me'],
    queryFn: () => getMe(),
  });
  const initialFullName = meQuery.data?.data?.data?.fullName || '';
  const initName = meQuery.data?.data?.data?.username || '';
  const [name, setName] = useState(initName);
  const [fullName, setFullName] = useState(initialFullName);

  useEffect(() => {
    if (meQuery.data?.data?.data?.fullName) {
      setFullName(meQuery.data.data.data.fullName);
    }
    if (meQuery.data?.data?.data?.username) {
      setName(meQuery.data.data.data.username);
    }
  }, [meQuery.data?.data?.data?.fullName, meQuery.data?.data?.data?.username]);

  const updateMeQuery = useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['updateMe'],
      });
    },
  });

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleUpdateMe = (e: React.FormEvent) => {
    e.preventDefault();
    updateMeQuery.mutate({
      username: name,
      fullName: fullName,
    });
    toast.success('Update successfully!');
    setLoading(false);
  };
  return (
    <div>
      <Header className='flex items-center justify-between w-full px-10 py-4 mx-auto bg-gradient-to-r from-purple-600 via-red-300 to-yellow-500' />
      <h1 className='flex justify-center my-10 text-3xl font-bold'>Profile</h1>
      <div className='flex justify-center mx-auto max-w-7xl'>
        <form className='mt-10 space-y-6' onSubmit={handleUpdateMe}>
          <div className='space-y-2 w-80'>
            <label htmlFor='name' className='text-xl font-bold'>
              Name
            </label>
            <Input
              id='name'
              placeholder='Name'
              className='outline-none lg:w-96'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='email' className='text-xl font-bold'>
              Email
            </label>
            <Input
              id='email'
              readOnly
              placeholder='email'
              className='outline-none lg:w-96'
              value={meQuery.data?.data?.data?.email}
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='fullName' className='text-xl font-bold'>
              FullName
            </label>
            <Input
              id='fullName'
              placeholder='fullName'
              className='outline-none lg:w-96'
              value={fullName}
              onChange={handleFullNameChange}
            />
          </div>

          <div className='flex items-center justify-center gap-6 pt-8 mx-auto'>
            <Button loading={loading}>Update Profile</Button>
            <Link to='/'>
              <Button loading={loading}>Back</Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
