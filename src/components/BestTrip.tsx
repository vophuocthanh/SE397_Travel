import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBestTrip } from '@/apis/best-trip';
import { TripType } from '@/lib/type';

const BestTrip = () => {
  // const { tourId } = useParams();
  const { data: queryGetBestTrip } = useQuery({
    queryKey: ['getBestTrip'],
    queryFn: () => getBestTrip(1),
    enabled: true,
  });

  // const { data: detailsBestTrip } = useQuery({
  //   queryKey: ['detailsBestTrip'],
  //   queryFn: () => getTripDetails(tourId as string),
  // });

  const trips = queryGetBestTrip?.data?.data || [];
  return (
    <div className='mx-auto mb-20 max-w-7xl'>
      <div className='flex items-center justify-between w-full mb-10'>
        <div className='flex flex-col space-y-2'>
          <h1 className='text-3xl font-bold'>Plan your best trip ever</h1>
          <p>Making the Most of Your Travel Experience in 2024</p>
        </div>
        <Link to='/best-trip'>
          <Button
            variant='ghost'
            className='text-blue-500 border border-blue-500 rounded-full hover:bg-white hover:text-blue-500 hover:shadow-md'
          >
            View All Destination
          </Button>
        </Link>
      </div>
      <div className='flex flex-wrap items-center w-full gap-14'>
        {trips.map((trip: TripType) => (
          <div
            className='flex flex-col rounded-t-3xl rounded-b-lg w-96 h-[20rem] space-y-4 border hover:scale-105 transition-all'
            key={trip.id}
          >
            <img
              src={trip.image}
              alt={trip.alt}
              className='justify-around object-cover rounded-3xl w-96 h-60'
            />
            <Link to={`/best-trip/details/${trip.id}`}>
              <h1 className='mx-6 text-xl font-bold'>{trip.name}</h1>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestTrip;
