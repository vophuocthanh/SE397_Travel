import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getLocation } from '@/apis/location';
import { LocationType } from '@/lib/type';
import SectionInViewRight from '@/components/SectionInViewRight';

const LocationSection = () => {
  const { data: queryGetLocation } = useQuery({
    queryKey: ['getLocation'],
    queryFn: () => getLocation(),
  });
  return (
    <div className='mx-auto mb-20 max-w-7xl'>
      <div className='flex flex-col items-center justify-between w-full mb-10 md:flex-row'>
        <div className='mx-6 mb-4 md:mx-0 md:mr-6 md:mb-0'>
          <h1 className='text-3xl font-bold'>Top Locations to Explore</h1>
          <p>Here are some of the most visited places in 2023</p>
        </div>
        <div className='mx-6'>
          <Link to='/location'>
            <Button
              variant='ghost'
              className='text-blue-500 border border-blue-500 rounded-full hover:bg-white hover:text-blue-500 hover:shadow-md'
            >
              View All Location
            </Button>
          </Link>
        </div>
      </div>

      <SectionInViewRight className='flex flex-wrap items-center justify-center w-full mx-auto my-10 gap-14 max-w-7xl'>
        {queryGetLocation?.data?.data?.map((location: LocationType) => (
          <div
            className='flex flex-col rounded-t-3xl rounded-b-xl transition-all w-96 h-[22rem] space-y-2 border hover:scale-105'
            key={location.id}
          >
            <img
              src={location.image}
              alt={location.alt}
              className='object-cover rounded-3xl w-96 h-60'
            />
            <p className='mx-6'>{location.location}</p>
            <Link to={`/location/details/${location.id}`}>
              <h1 className='mx-6 text-xl font-bold'>{location.country}</h1>
            </Link>
            {/* <Button className='w-20 m-6 bg-yellow-400 hover:bg-yellow-500 hover:shadow-lg'>
                $ {location.price}
              </Button> */}
          </div>
        ))}
      </SectionInViewRight>
    </div>
  );
};

export default LocationSection;
