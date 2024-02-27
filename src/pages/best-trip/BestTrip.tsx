import Header from '../header/Header';
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
export default function BestTrip() {
  return (
    <div>
      <Header className='flex items-center justify-between w-full px-10 py-4 mx-auto bg-blue-400' />
      <div className='w-full px-20'>
        <h1 className='flex justify-center my-10 text-3xl font-bold'>
          Best Trip
        </h1>
        <div className='flex flex-wrap gap-16'>
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
              <h1 className='text-xl font-bold'>{trip.name}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
