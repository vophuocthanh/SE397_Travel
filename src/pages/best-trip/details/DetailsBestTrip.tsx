import { getTripDetails } from '@/apis/best-trip';
import Header from '@/pages/header/Header';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function DetailsBestTrip() {
  const { tourId } = useParams();
  const { data: detailsBestTrip } = useQuery({
    queryKey: ['detailsBestTrip'],
    queryFn: () => getTripDetails(tourId as string),
  });
  return (
    <div>
      <Header className='flex items-center justify-between w-full px-10 py-4 mx-auto bg-blue-400' />
      <h1 className='flex justify-center my-10 text-3xl font-bold'>
        Best Trip Details
      </h1>
      {detailsBestTrip ? (
        <div className='flex gap-10 max-w-7xl mx-auto items-center'>
          <img
            src={detailsBestTrip?.data?.data?.image}
            alt='best trip'
            className='w-[30rem] h-80 object-cover rounded-md'
          />
          <div className='flex flex-col space-y-4'>
            <li>{detailsBestTrip?.data?.data?.description}</li>
            <li>{detailsBestTrip?.data?.data?.name}</li>
            <h1 className='text-xl font-bold'>
              {detailsBestTrip?.data?.data?.location}
            </h1>
          </div>
        </div>
      ) : (
        <div className='animate-spin rounded-full h-20 w-20 border-b-4 border-gray-900 mx-auto'></div>
      )}
    </div>
  );
}
