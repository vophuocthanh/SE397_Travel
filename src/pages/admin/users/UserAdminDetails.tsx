import { getUserDetailsAdmin } from '@/apis/me';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

export default function UserAdminDetails() {
  const { id } = useParams();
  const usersAdminDetailsQuery = useQuery({
    queryKey: ['usersAdminDetails'],
    queryFn: () => getUserDetailsAdmin(id as string),
  });
  const initialFullName =
    usersAdminDetailsQuery.data?.data?.data?.fullName || '';
  const initName = usersAdminDetailsQuery.data?.data?.data?.username || '';
  const [loading, setLoading] = useState(false);
  const initRole = usersAdminDetailsQuery.data?.data?.data?.role || 'USER';
  const [role, setRole] = useState(initRole);
  const [name, setName] = useState(initName);
  const [fullName, setFullName] = useState(initialFullName);

  console.log('usersAdminDetailsQuery:', usersAdminDetailsQuery);

  const handleUpdateMe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/api/users/${id}`,
        {
          username: name,
          role: role,
          fullName: fullName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success('Update successfully!');
        // navigate('/admin/user');
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex justify-center w-full mx-auto'>
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
            value={usersAdminDetailsQuery.data?.data?.data?.email}
            onChange={(e) => setName(e.target.value)}
            disabled
          />
        </div>
        <div className='space-y-2'>
          <label htmlFor='fullName' className='text-xl font-bold'>
            FullName
          </label>
          <Input
            id='fullName'
            placeholder='fullName'
            value={fullName}
            className='outline-none lg:w-96'
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className='space-y-2'>
          <label htmlFor='role' className='text-xl font-bold'>
            Role
          </label>
          <Input
            id='role'
            placeholder='role'
            className='outline-none lg:w-96'
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        {/* <div className='space-y-2'>
          <label htmlFor='role' className='text-xl font-bold'>
            Role
          </label>
          <Select
            defaultValue={role}
            // value={role}
          >
            <SelectTrigger className='outline-none lg:w-96'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='USER'>USER</SelectItem>
              <SelectItem value='ADMIN'>ADMIN</SelectItem>
            </SelectContent>
          </Select>
        </div> */}

        <div className='flex items-center justify-center gap-6 pt-8 mx-auto'>
          <Button type='submit' loading={loading}>
            Update Profile
          </Button>
          <Link to='/admin/user'>
            <Button>Back</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
