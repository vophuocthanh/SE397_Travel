import { Button } from './ui/button';
import Croatia from '@/assets/images/trip/croatia.png';
import Morocco from '@/assets/images/trip/morocco.png';
import Mexico from '@/assets/images/trip/mexico.png';

const Trips = [
  {
    id: 1,
    image: Croatia,
    alt: 'Croatia',
    name: 'Croatia',
  },
  {
    id: 2,
    image: Morocco,
    alt: 'Morocco',
    name: 'Morocco',
  },
  {
    id: 3,
    image: Mexico,
    alt: 'Mexico',
    name: 'Mexico',
  },
];

const BestTrip = () => {
  return (
    <div className='mx-auto max-w-7xl'>
      <div className='flex items-center justify-between w-full mb-10'>
        <div className='flex flex-col space-y-2'>
          <h1 className='text-3xl font-bold'>Plan your best trip ever</h1>
          <p>Making the Most of Your Travel Experience in 2024</p>
        </div>
        <Button
          variant='ghost'
          className='text-blue-500 border border-blue-500 rounded-full hover:bg-white hover:text-blue-500 hover:shadow-md'
        >
          View All Destination
        </Button>
      </div>
      <div className='flex items-center justify-between w-full'>
        {Trips.map((trip) => (
          <div
            className='flex flex-col rounded-t-3xl w-96 h-[26rem] space-y-4'
            key={trip.id}
          >
            <img
              src={trip.image}
              alt={trip.alt}
              className='object-cover rounded-3xl'
            />
            <h1 className='text-3xl font-bold'>{trip.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestTrip;
