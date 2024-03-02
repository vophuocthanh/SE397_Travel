import Header from '../header/Header';
import { useQuery } from '@tanstack/react-query';
import { getBestTrip } from '@/apis/best-trip';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

type TripType = {
  id: number;
  image: string;
  alt: string;
  description: string;
  name: string;
  location: string;
};

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

  return (
    <div>
      <Header className='flex items-center justify-between w-full px-10 py-4 mx-auto bg-blue-400' />
      <div className='w-full px-20 mb-20'>
        {token ? (
          <Link to='/best-trip/create'>
            <Button className='text-blue-500 bg-white border hover:bg-blue-400 hover:text-white hover:border-none hover:shadow-md border-blue-500 ml-auto mt-10 flex justify-end '>
              Create New Trip
            </Button>
          </Link>
        ) : (
          <Button
            className='text-blue-500 bg-white border hover:bg-blue-400 hover:text-white hover:border-none hover:shadow-md border-blue-500 ml-auto mt-10 flex justify-end '
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
          <div className='animate-spin rounded-full h-20 w-20 border-b-4 border-gray-900 mx-auto'></div>
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
                className='object-cover rounded-3xl w-96 h-60 hover:scale-105 transition-all'
              />
              <p className='px-6'>{trip.description}</p>
              <Link to={`/best-trip/details/${trip.id}`}>
                <h1 className='text-xl font-bold px-6'>
                  {trip.name} - <span>{trip.location}</span>
                </h1>
              </Link>
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
        {/* <p className='text-center mt-4'>Page: {pagination.page}</p> */}
      </div>
    </div>
  );
}
