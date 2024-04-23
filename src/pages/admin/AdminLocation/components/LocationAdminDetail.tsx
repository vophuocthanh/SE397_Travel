import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';
import { getDetailsLocation } from '@/apis/location';

export default function LocationAdminDetail() {
  const { id } = useParams();
  console.log(id, 'bettrip');

  const { data: DetailsLocation } = useQuery({
    queryKey: ['detailsLocationTrip'],
    queryFn: () => getDetailsLocation(id as string),
  });
  console.log('detailsBestTrip:', DetailsLocation);

  return (
    <div>
      <Link
        to='/admin/location'
        className='flex justify-end w-20 gap-2 p-2 pr-2 mt-10 ml-auto mr-20 text-white bg-green-500 rounded-md cursor-pointer max-sm:mr-[30px] hover:shadow-lg'
      >
        <ArrowLeft></ArrowLeft>
        Back
      </Link>
      <h1 className='flex justify-center my-10 text-3xl font-bold'>
        Location Details
      </h1>
      {/* flex-wrap */}
      <div className='flex m-[45px] max-sm:mb-[8rem] max-lg:space-around  items-center justify-around '>
        {DetailsLocation && (
          <div className='gap-10 md:flex'>
            <img
              src={DetailsLocation?.data?.data?.data?.image}
              alt='location'
              className='  max-sm:h-30 max-lg:w-[25rem] sm:h-80 object-cover rounded-md border lg:w-[30rem]  '
            />
            <div className='flex flex-col space-y-4 md:w-[20rem]  lg:w-[30rem] mt-[6rem] max-md:items-center '>
              <p>Country:{DetailsLocation?.data?.data?.data?.country}</p>
              <p>Location:{DetailsLocation?.data?.data?.data?.location}</p>
              <span className='text-2xl font-bold'>
                Giá: {DetailsLocation?.data?.data?.data?.price} $
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
