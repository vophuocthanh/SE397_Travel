import { getDetailsLocation } from '@/apis/location';
import { Button } from '@/components/ui/button';
import Header from '@/pages/header/Header';
import { addProduct } from '@/redux/slice/cardSlice';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

export default function DetailsLocation() {
  const { locationId } = useParams();
  const { data: detailsLocation } = useQuery({
    queryKey: ['getDetailsLocation'],
    queryFn: () => getDetailsLocation(locationId as string),
  });
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  return (
    <div>
      <Header className='flex items-center justify-between w-full px-10 py-4 mx-auto bg-blue-400' />
      <Link
        to='/location'
        className='flex justify-end w-20 gap-2 p-2 pr-2 mt-8 ml-auto mr-[1rem] text-white bg-green-500 rounded-md cursor-pointer hover:shadow-lg lg:mr-20'
      >
        <ArrowLeft></ArrowLeft>
        Back
      </Link>
      <h1 className='flex justify-center py-5 text-2xl font-bold lg:text-3xl'>
        Location Details
      </h1>
      {detailsLocation ? (
        <div className='items-center gap-10 mx-auto md:flex max-w-7xl'>
          <img
            src={detailsLocation?.data?.data?.image}
            alt='best trip'
            className='w-[22rem] h-70 object-cover rounded-md border lg:w-[30rem] lg:h-80 lg:ml-[5rem] mx-auto '
          />
          <div className='flex flex-col space-y-4 w-full lg:w-[30rem] p-7 mr-[12rem] gap-10'>
            <div className='flex flex-col gap-5 p-5 mt-3 space-y-4'>
            <li>{detailsLocation?.data?.data?.location}</li>
            <h1 className='text-xl font-bold'>
              {detailsLocation?.data?.data?.country}
            </h1>
            </div>
            {token ? (
              <Button
                className='w-40 ml-auto text-xl bg-yellow-400 hover:bg-yellow-500 hover:shadow-lg max-sm:mx-auto '
                onClick={() =>
                  dispatch(addProduct(detailsLocation?.data?.data))
                }
              >
                {detailsLocation?.data?.data?.price} $
              </Button>
            ) : (
              <Button
                className='w-40 ml-auto text-xl bg-yellow-400 hover:bg-yellow-500 hover:shadow-lg max-sm:mx-auto '
                onClick={() =>
                  dispatch(addProduct(detailsLocation?.data?.data))
                }
                disabled
              >
                {detailsLocation?.data?.data?.price} $
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className='w-20 h-20 mx-auto border-b-4 border-gray-900 rounded-full animate-spin'></div>
      )}
    </div>
  );
}
