import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/redux/slice/cardSlice';
import ReactPaginate from 'react-paginate';
import Header from '../header/Header';
import { TripType } from '@/lib/type';
import { getBestTrip } from '@/apis/best-trip';
import debounce from 'debounce';

export default function BestTrip() {
  const [pagination, setPagination] = useState({ page: 1, totalPage: 1 });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<TripType[]>([]);

  const {
    data: queryGetBestTrip,
    error,
    refetch,
  } = useQuery({
    queryKey: ['getBestTrip'],
    queryFn: () => getBestTrip(pagination.page),
    enabled: true,
  });

  const totalPage = queryGetBestTrip?.data?.totalPage || 0;
  const trips = queryGetBestTrip?.data?.data || [];
  const dispatch = useDispatch();

  const debouncedSearchFunction = debounce(async (query: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/tour?search=${query}`
      );
      setSearchResults(response.data.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
  }, 1000);

  useEffect(() => {
    if (searchQuery !== '') {
      debouncedSearchFunction(searchQuery);
    } else {
      setSearchResults([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);
  const handlePageChange = (selectedItem: { selected: number }) => {
    const newPage = selectedItem.selected + 1;
    setPagination({ ...pagination, page: newPage });
    refetch();
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  return (
    <div>
      <Header className='fixed top-0 z-20 flex items-center justify-between w-full px-10 mx-auto bg-blue-400 shadow-md' />
      <div className='w-full mt-32 mb-20 lg:px-20'>
        <Link
          to='/'
          className='flex justify-end w-20 gap-2 p-2 pr-2 mt-10 ml-auto text-white bg-green-500 rounded-md cursor-pointer hover:shadow-lg mr-[1.4rem] lg:mr-[0.4rem]'
        >
          <ArrowLeft></ArrowLeft>
          Back
        </Link>
        <div className='items-center justify-between block mt-10 lg:flex'>
          <Input
            placeholder='Search best trip'
            className='mx-auto w-96 lg:ml-[1.5rem] outline-none'
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {searchResults.map((trip: TripType) => (
          <div
            className='flex flex-col rounded-t-3xl w-96 h-[22rem] mt-10 space-y-4 border rounded-md'
            key={trip.id}
          >
            <img
              src={trip.image}
              alt={trip.alt}
              className='object-cover transition-all rounded-3xl w-96 h-60 hover:scale-105'
            />
            <p className='h-10 px-6 truncate'>{trip.description}</p>
            <Link
              to={`/best-trip/details/${trip.id}`}
              className='flex justify-end pr-10 hover:underline hover:text-blue-500'
            >
              View Details
            </Link>
          </div>
        ))}

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
        </div>
        <ReactPaginate
          breakLabel='...'
          nextLabel='>'
          pageRangeDisplayed={5}
          pageCount={totalPage}
          onPageChange={handlePageChange}
          previousLabel='<'
          renderOnZeroPageCount={null}
          nextPageRel={'next'}
          nextClassName='w-10 h-10 border rounded-md flex justify-center items-center text-2xl font-bold'
          previousClassName='w-10 h-10 border rounded-md flex justify-center items-center text-2xl font-bold'
          className='flex items-center justify-center gap-4'
          pageClassName='w-10 h-10 border rounded-md flex justify-center items-center font-bold'
          activeClassName='font-bold text-blue-500 underline border-2 border-gray-400 px-4 rounded-md'
        />
      </div>
    </div>
  );
}
