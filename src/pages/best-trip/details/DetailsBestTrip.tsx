import { Button } from '@/components/ui/button';
import Header from '@/pages/header/Header';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { getTripDetails } from '@/apis/best-trip';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/redux/slice/cardSlice';
import { ArrowLeft } from 'lucide-react';
// import { RootState } from '@/redux/store';

export default function DetailsBestTrip() {
  const { tourId } = useParams();
  const { data: detailsBestTrip } = useQuery({
    queryKey: ['detailsBestTrip'],
    queryFn: () => getTripDetails(tourId as string),
  });
  console.log('detailsBestTrip:', detailsBestTrip);
  const token = localStorage.getItem('token');

  const dispatch = useDispatch();
  // const CartProducts = useSelector((state: RootState) => state.cart.CartArr);
  // console.log('CartProducts:', CartProducts.length);
  return (
    <div>
      <Header className='flex items-center justify-between w-full px-10 py-4 mx-auto bg-blue-400' />
      <Link
        to='/best-trip'
        className='flex justify-end w-20 gap-2 p-2 pr-2 mt-10 ml-auto mr-20 text-white bg-green-500 rounded-md cursor-pointer max-sm:mr-[30px] hover:shadow-lg'
      >
        <ArrowLeft></ArrowLeft>
        Back
      </Link>
      <h1 className='flex justify-center my-10 text-3xl font-bold'>
          Best Trip Details
        </h1>
        {/* flex-wrap */}
      <div className='flex '>
        {detailsBestTrip ? (
          <div className='items-center gap-10 mx-auto max-w-7xl md:flex '>
            <img
              src={detailsBestTrip?.data?.data?.data?.image}
              alt='best trip'
              className='w-[25rem] h-80 object-cover rounded-md border lg:w-[30rem]  '
            />
            <div className='flex flex-col space-y-4 w-[25rem]  lg:w-[30rem]  mt-[4rem] max-md:items-center '>
              <li>{detailsBestTrip?.data?.data?.data?.description}</li>
              <li>{detailsBestTrip?.data?.data?.data?.name}</li>
              <h1 className='text-xl font-bold'>
                {detailsBestTrip?.data?.data?.data?.location}
              </h1>
              <p>
                {detailsBestTrip?.data?.data?.data?.remainingCount} sản phẩm có
                sẵn
              </p>
              <span className='text-2xl font-bold'>
                Giá: {detailsBestTrip?.data?.data?.data?.price} $
              </span>
              {token ? (
                <Button
                  className='w-40 ml-auto text-xl bg-yellow-400 hover:bg-yellow-500 hover:shadow-lg max-md:mx-auto'
                  onClick={() =>
                    dispatch(addProduct(detailsBestTrip?.data?.data?.data))
                  }
                >
                  Mua
                </Button>
              ) : (
                <Button
                  className='w-40 ml-auto text-xl bg-yellow-400 hover:bg-yellow-500 hover:shadow-lg'
                  onClick={() =>
                    dispatch(addProduct(detailsBestTrip?.data?.data?.data))
                  }
                  disabled
                >
                  {detailsBestTrip?.data?.data?.data?.price} $
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className='w-20 h-20 mx-auto border-b-4 border-gray-900 rounded-full animate-spin'></div>
        )}
      </div>
    </div>
  );
}
