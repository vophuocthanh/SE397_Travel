import Japan from '@/assets/images/location/janpan.png';
import Italy from '@/assets/images/location/italy.png';
import SouthAfrica from '@/assets/images/location/africa.png';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Locations = [
  {
    id: 1,
    image: Japan,
    alt: 'Japan',
    name: 'Japan',
    location: 'Tokyo, Japan',
  },
  {
    id: 2,
    image: Italy,
    alt: 'Italy',
    name: 'Italy',
    location: 'Rome, Italy',
  },
  {
    id: 3,
    image: SouthAfrica,
    alt: 'SouthAfrica',
    name: 'SouthAfrica',
    location: 'Cape Town, South Africa',
  },
  {
    id: 4,
    image: SouthAfrica,
    alt: 'SouthAfrica',
    name: 'SouthAfrica',
    location: 'Cape Town, South Africa',
  },
  {
    id: 5,
    image: SouthAfrica,
    alt: 'SouthAfrica',
    name: 'SouthAfrica',
    location: 'Cape Town, South Africa',
  },
];

const LocationSection = () => {
  return (
    <div className='mx-auto mb-20 max-w-7xl'>
      <div className='flex items-center justify-between w-full mb-10'>
        <div className='flex flex-col space-y-2'>
          <h1 className='text-3xl font-bold'>Top Locations to Explore</h1>
          <p>Here are some of the most visited places in 2023</p>
        </div>
        <div className='flex items-center gap-4'>
          <ChevronLeft className='w-10 h-10' />
          <ChevronRight className='w-10 h-10' />
        </div>
      </div>
      <div className='flex flex-wrap items-center w-full gap-14'>
        {Locations.map((location) => (
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

export default LocationSection;
