import { getUserDetailsAdmin } from '@/apis/me';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

export default function UserAdminDetails() {
  const { id } = useParams();

  const usersAdminDetailsQuery = useQuery({
    queryKey: ['usersAdminDetails'],
    queryFn: () => getUserDetailsAdmin(id as string),
  });
  console.log(usersAdminDetailsQuery);
  return (
    <div className='flex justify-center w-full mx-auto'>
      <form className='mt-10 space-y-6'>
        <div className='space-y-2 w-80'>
          <label htmlFor='name' className='text-xl font-bold'>
            Name
          </label>
          <Input
            id='name'
            placeholder='Name'
            className='outline-none lg:w-96'
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
            value={usersAdminDetailsQuery.data?.data?.data?.role}
          />
        </div>

        <div className='flex items-center justify-center gap-6 pt-8 mx-auto'>
          <Button type='submit'>Update Profile</Button>
          <Link to='/admin/user'>
            <Button>Back</Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
