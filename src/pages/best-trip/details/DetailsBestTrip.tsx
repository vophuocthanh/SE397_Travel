import { Button } from '@/components/ui/button';
import Header from '@/pages/header/Header';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getTripDetails } from '@/apis/best-trip';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/redux/slice/cardSlice';
// import { RootState } from '@/redux/store';

export default function DetailsBestTrip() {
  const { tourId } = useParams();
  const { data: detailsBestTrip } = useQuery({
    queryKey: ['detailsBestTrip'],
    queryFn: () => getTripDetails(tourId as string),
  });

  const dispatch = useDispatch();
  // const CartProducts = useSelector((state: RootState) => state.cart.CartArr);
  // console.log('CartProducts:', CartProducts.length);
  return (
    <div>
      <Header className='flex items-center justify-between w-full px-10 py-4 mx-auto bg-blue-400' />
      <h1 className='flex justify-center my-10 text-3xl font-bold'>
        Best Trip Details
      </h1>
      {detailsBestTrip ? (
        <div className='flex items-center gap-10 mx-auto max-w-7xl'>
          <img
            src={detailsBestTrip?.data?.data?.image}
            alt='best trip'
            className='w-[30rem] h-80 object-cover rounded-md border'
          />
          <div className='flex flex-col space-y-4 w-[30rem]'>
            <li>{detailsBestTrip?.data?.data?.description}</li>
            <li>{detailsBestTrip?.data?.data?.name}</li>
            <h1 className='text-xl font-bold'>
              {detailsBestTrip?.data?.data?.location}
            </h1>
            <Button
              className='w-40 ml-auto text-xl bg-yellow-400 hover:bg-yellow-500 hover:shadow-lg'
              onClick={() => dispatch(addProduct(detailsBestTrip?.data?.data))}
            >
              {detailsBestTrip?.data?.data?.price} $
            </Button>
          </div>
        </div>
      ) : (
        <div className='w-20 h-20 mx-auto border-b-4 border-gray-900 rounded-full animate-spin'></div>
      )}
    </div>
  );
}
