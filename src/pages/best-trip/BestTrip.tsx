import Header from '../header/Header';
import { useQuery } from '@tanstack/react-query';
import { getBestTrip } from '@/apis/best-trip';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/redux/slice/cardSlice';
import { TripType } from '@/lib/type';
import { ArrowLeft } from 'lucide-react';

export default function BestTrip() {
  const [pagination, setPagination] = useState({ page: 1, totalPage: 1 });
  const {
    data: queryGetBestTrip,
    error,
    refetch,
  } = useQuery({
    queryKey: ['getBestTrip'],
    queryFn: () => getBestTrip(pagination.page),
    enabled: true,
  });

  const handlePageChange = (selectedItem: { selected: number }) => {
    const newPage = selectedItem.selected + 1;
    setPagination({ ...pagination, page: newPage });
    refetch();
  };

  const totalPage = queryGetBestTrip?.data?.totalPage || 0;
  const trips = queryGetBestTrip?.data?.data || [];
  const token = localStorage.getItem('token') || '';

  const dispatch = useDispatch();

  return (
    <div>
      <Header className='flex items-center justify-between w-full px-10 py-4 mx-auto bg-blue-400' />
      <div className='w-full px-20 mb-20'>
        <Link
          to='/'
          className='flex justify-end w-20 gap-2 p-2 pr-2 mt-10 ml-auto text-white bg-green-500 rounded-md cursor-pointer hover:shadow-lg'
        >
          <ArrowLeft></ArrowLeft>
          Back
        </Link>
        {token ? (
          <Link to='/best-trip/create'>
            <Button className='flex justify-end mt-10 ml-auto text-blue-500 bg-white border border-blue-500 hover:bg-blue-400 hover:text-white hover:border-none hover:shadow-md '>
              Create New Trip
            </Button>
          </Link>
        ) : (
          <Button
            className='flex justify-end mt-10 ml-auto text-blue-500 bg-white border border-blue-500 hover:bg-blue-400 hover:text-white hover:border-none hover:shadow-md '
            disabled={!token}
          >
            Create New Trip
          </Button>
        )}
        <h1 className='flex justify-center my-10 text-3xl font-bold'>
          Best Trip
        </h1>
        {error && <p>Đã xảy ra lỗi khi tải dữ liệu.</p>}
        {trips.length === 0 && !error && (
          <div className='w-20 h-20 mx-auto border-b-4 border-gray-900 rounded-full animate-spin'></div>
        )}
        <div className='flex flex-wrap justify-around gap-16 mb-10'>
          {trips.map((trip: TripType) => (
            <div
              className='flex flex-col rounded-t-3xl w-96 h-[26rem] space-y-4 border rounded-md'
              key={trip.id}
            >
              <img
                src={trip.image}
                alt={trip.alt}
                className='object-cover transition-all rounded-3xl w-96 h-60 hover:scale-105'
              />
              <p className='px-6'>{trip.description}</p>
              <Link to={`/best-trip/details/${trip.id}`}>
                <h1 className='px-6 text-xl font-bold'>
                  {trip.name} - <span>{trip.location}</span>
                </h1>
              </Link>
              <Button
                className='w-40 m-6 text-xl bg-yellow-400 hover:bg-yellow-500 hover:shadow-lg'
                onClick={() => {
                  const product = {
                    id: trip.id,
                    name: trip.name,
                    price: trip.price,
                    quantity: 1,
                    location: trip.location,
                  };
                  dispatch(addProduct(product));
                }}
              >
                {trip.price} $
              </Button>
            </div>
          ))}
        </div>
        <ReactPaginate
          breakLabel='...'
          nextLabel='next >'
          pageRangeDisplayed={5}
          pageCount={totalPage}
          onPageChange={handlePageChange}
          containerClassName='flex justify-center gap-4'
          previousLabel='< previous'
          renderOnZeroPageCount={null}
          nextPageRel={'next'}
          activeClassName='font-bold text-blue-500 underline'
        />
        {/* <p className='mt-4 text-center'>Page: {pagination.page}</p> */}
      </div>
    </div>
  );
}
