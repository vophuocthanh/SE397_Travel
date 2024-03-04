import { getLocation } from '@/apis/location';
import { useQuery } from '@tanstack/react-query';
import Header from '../header/Header';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '@/redux/slice/cardSlice';
import { RootState } from '@/redux/store';
import { LocationType } from '@/lib/type';
import { ArrowLeft } from 'lucide-react';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';

export default function LocationAll() {
  const [pagination, setPagination] = useState({ page: 1, totalPage: 1 });
  const { data: queryGetLocation, refetch } = useQuery({
    queryKey: ['getLocation'],
    queryFn: () => getLocation(),
  });
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const CartProducts = useSelector((state: RootState) => state.cart.CartArr);
  console.log('CartProducts:', CartProducts);
  const handlePageChange = (selectedItem: { selected: number }) => {
    const newPage = selectedItem.selected + 1;
    setPagination({ ...pagination, page: newPage });
    refetch();
  };

  const totalPage = queryGetLocation?.data?.totalPage || 0;
  return (
    <div className='mb-20'>
      <Header className='flex items-center justify-between w-full px-10 py-4 mx-auto bg-blue-400' />
      <div className='w-full px-20 mb-10'>
        <Link
          to='/'
          className='flex justify-end w-20 gap-2 p-2 pr-2 mt-10 ml-auto text-white bg-green-500 rounded-md cursor-pointer hover:shadow-lg'
        >
          <ArrowLeft></ArrowLeft>
          Back
        </Link>
        {token ? (
          <Link to='/location/create'>
            <Button className='flex justify-end mt-10 ml-auto text-blue-500 bg-white border border-blue-500 hover:bg-blue-400 hover:text-white hover:border-none hover:shadow-md '>
              Create New Location
            </Button>
          </Link>
        ) : (
          <Button
            className='flex justify-end mt-10 ml-auto text-blue-500 bg-white border border-blue-500 hover:bg-blue-400 hover:text-white hover:border-none hover:shadow-md '
            disabled={!token}
          >
            Create Location
          </Button>
        )}
      </div>
      <h1 className='flex justify-center mx-auto text-3xl font-bold'>
        Location List
      </h1>
      <div className='flex flex-wrap items-center w-full mx-auto my-10 gap-14 max-w-7xl'>
        {queryGetLocation?.data?.data?.map((location: LocationType) => (
          <div
            className='flex flex-col rounded-t-3xl rounded-b-xl transition-all w-96 h-[23.5rem] space-y-2 border hover:scale-105'
            key={location.id}
          >
            <img
              src={location.image}
              alt={location.alt}
              className='object-cover rounded-3xl w-96 h-60'
            />
            <p className='mx-6'>{location.location}</p>
            <div className='flex items-center justify-between'>
              <Link to={`/location/details/${location.id}`}>
                <h1 className='mx-6 text-xl font-bold'>{location.country}</h1>
              </Link>
              <Button
                className='w-20 m-6 bg-yellow-400 hover:bg-yellow-500 hover:shadow-lg'
                onClick={() =>
                  dispatch(addProduct({ ...location, quantity: 1 }))
                }
              >
                $ {location.price}
              </Button>
            </div>
          </div>
        ))}
      </div>
      <ReactPaginate
        breakLabel='...'
        nextLabel='>'
        pageRangeDisplayed={5}
        pageCount={totalPage}
        onPageChange={handlePageChange}
        containerClassName='flex justify-center gap-4'
        previousLabel='<'
        renderOnZeroPageCount={null}
        nextPageRel={'next'}
        activeClassName='font-bold text-blue-500 underline'
      />
    </div>
  );
}
