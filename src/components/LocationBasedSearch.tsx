import Dubai from '@/assets/images/locationBasedSearch/dubai.png';
import Canada from '@/assets/images/locationBasedSearch/canada.png';
import Ecuador from '@/assets/images/locationBasedSearch/ecuador.png';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const locationBasedSearch = [
  {
    id: 1,
    image: Dubai,
    alt: 'Dubai',
    name: 'Dubai, UAE',
    location: 'Burj Khalifa',
  },
  {
    id: 2,
    image: Canada,
    alt: 'Canada',
    name: 'Vancouver, Canada',
    location: 'Vancouver, Canada',
  },
  {
    id: 3,
    image: Ecuador,
    alt: 'Ecuador',
    name: 'Baños de Agua Santa, Ecuador',
    location: 'The Hot Springs of Baños',
  },
];

const LocationBasedSearch = () => {
  return (
    <div className='mx-auto mb-20 max-w-7xl'>
      <div className='flex items-center justify-between w-full mb-10'>
        <div className='flex flex-col space-y-2'>
          <h1 className='text-3xl font-bold'>Locations based on search</h1>
          <p>Check out fun places based on your searches </p>
        </div>
        <div className='flex items-center gap-4'>
          <ChevronLeft className='w-10 h-10 cursor-pointer' />
          <ChevronRight className='w-10 h-10 cursor-pointer' />
        </div>
      </div>
      <div className='flex flex-wrap items-center w-full gap-14'>
        {locationBasedSearch.map((location) => (
          <div
            className='flex flex-col rounded-t-3xl w-96 h-[28rem] space-y-4'
            key={location.id}
          >
            <img
              src={location.image}
              alt={location.alt}
              className='object-cover rounded-3xl'
            />
            <p>{location.location}</p>
            <h1 className='text-xl font-bold'>{location.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationBasedSearch;
