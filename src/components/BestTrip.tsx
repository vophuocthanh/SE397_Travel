import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBestTrip } from '@/apis/best-trip';
import { TripType } from '@/lib/type';
import { addProduct } from '@/redux/slice/cardSlice';
import { useDispatch } from 'react-redux';
import SectionInViewRight from '@/components/SectionInViewRight';

const BestTrip = () => {
  // const { tourId } = useParams();
  const { data: queryGetBestTrip } = useQuery({
    queryKey: ['getBestTrip'],
    queryFn: () => getBestTrip(1),
    enabled: true,
  });
  const dispatch = useDispatch();
  // const { data: detailsBestTrip } = useQuery({
  console.log('queryGetBestTrip:', queryGetBestTrip);
  //   queryKey: ['detailsBestTrip'],
  //   queryFn: () => getTripDetails(tourId as string),
  // });

  const trips = queryGetBestTrip?.data?.data || [];
  return (
    <div className='mx-auto mb-20 max-w-7xl '>
      <div className='flex flex-col items-center justify-between w-full mb-10 md:flex-row'>
        <div className='flex flex-col mx-5 space-y-2 md:mx-0 md:mr-5 md:mb-0'>
          <h1 className='text-3xl font-bold'>Plan your best trip ever</h1>
          <p>Making the Most of Your Travel Experience in 2024</p>
        </div>
        <div className='mx-5 mt-6 md:mt-0 md:mb-0'>
          <Link to='/best-trip'>
            <Button
              variant='ghost'
              className='text-blue-500 border border-blue-500 rounded-full md:w-40 w-72 hover:bg-white hover:text-blue-500 hover:shadow-md'
            >
              View All Destination
            </Button>
          </Link>
        </div>
      </div>

      <SectionInViewRight className='flex flex-wrap items-center justify-center w-full mx-auto gap-14'>
        {trips.map((trip: TripType) => (
          <div
            className='flex flex-col rounded-t-3xl w-96 h-[28rem] space-y-4 border rounded-md '
            key={trip.id}
          >
            <img
              src={trip.image}
              alt={trip.alt}
              className='object-cover transition-all rounded-3xl w-96 h-60 hover:scale-105'
            />
            <p className='h-10 px-6 truncate'>{trip.description}</p>
            <Link to={`/best-trip/details/${trip.id}`}>
              <h1 className='px-6 text-xl font-bold'>
                {trip.name} - <span>{trip.location}</span>
              </h1>
            </Link>
            <div className='flex items-center justify-between'>
              <span className='pl-6 text-xl font-semibold'>
                Giá: {trip.price} $
              </span>
              <Button
                className='w-40 m-6 ml-auto text-xl bg-yellow-400 hover:bg-yellow-500 hover:shadow-lg'
                onClick={() => {
                  const product = {
                    id: trip.id,
                    name: trip.name,
                    price: trip.price,
                    quantity: 1,
                    location: trip.location,
                    image: trip.image,
                  };
                  dispatch(addProduct(product));
                }}
              >
                Add to cart
              </Button>
            </div>
          </div>
        ))}
      </SectionInViewRight>
    </div>
  );
};

export default BestTrip;
