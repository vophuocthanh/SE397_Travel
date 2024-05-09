import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getLocation } from '@/apis/location';
import { LocationType } from '@/lib/type';
import { addProduct } from '@/redux/slice/cardSlice';
import { useDispatch } from 'react-redux';
import SectionInViewRight from '@/components/SectionInViewRight';

const LocationSection = () => {
  const { data: queryGetLocation } = useQuery({
    queryKey: ['getLocation'],
    queryFn: () => getLocation(),
  });
  const dispatch = useDispatch();

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
            className='flex flex-col rounded-t-3xl rounded-b-xl transition-all w-96 h-[28rem] space-y-2 border hover:scale-105 mx-auto gap-2 '
            key={location.id}
          >
            <img
              src={location.image}
              alt={location.alt}
              className='object-cover rounded-3xl w-96 h-60 '
            />
            <p className='mx-6 textContainerLocation'>{location.location}</p>
            <div className='flex items-center justify-between'>
              <Link to={`/location/details/${location.id}`}>
                <h1 className='mx-6 text-xl font-bold'>{location.country}</h1>
              </Link>
            </div>

            <div className='flex items-center justify-between'>
              <span className='pl-6 text-xl font-semibold'>
                Giá: {location.price} $
              </span>

              <Button
                className='w-40 m-6 ml-auto text-xl bg-yellow-400 hover:bg-yellow-500 hover:shadow-lg'
                onClick={() =>
                  dispatch(addProduct({ ...location, quantity: 1 }))
                }
              >
                Add To Cart
              </Button>
            </div>
          </div>
        ))}
      </SectionInViewRight>
    </div>
  );
};

export default LocationSection;
