import { getLocationPagination } from '@/apis/location';
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
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { debounce } from 'lodash';
import axios from 'axios';
import SectionInViewRight from '@/components/SectionInViewRight';

export default function LocationAll() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationType[]>([]);
  const [pagination, setPagination] = useState({ page: 1, totalPage: 1 });
  const { data: queryGetLocation, refetch } = useQuery({
    queryKey: ['getLocation'],
    queryFn: () => getLocationPagination(pagination.page),
  });
  const dispatch = useDispatch();
  const CartProducts = useSelector((state: RootState) => state.cart.CartArr);
  console.log('CartProducts:', CartProducts);
  const handlePageChange = (selectedItem: { selected: number }) => {
    const newPage = selectedItem.selected + 1;
    setPagination({ ...pagination, page: newPage });
    refetch();
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
  };
  const debouncedSearchFunction = debounce(async (query: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/location?search=${query}`
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

  const totalPage = queryGetLocation?.data?.totalPage || 0;
  return (
    <div className='mb-20'>
      <Header className='fixed top-0 z-20 flex items-center justify-between w-full px-10 mx-auto shadow-md bg-gradient-to-r from-purple-600 via-red-300 to-yellow-500' />
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
            placeholder='Search location'
            className='mx-auto w-96 lg:ml-[1.5rem] outline-none'
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        {searchResults.map((location: LocationType) => (
          <div
            className='flex flex-col rounded-t-3xl w-96 h-[28rem] mt-10 space-y-4 border rounded-md'
            key={location.id}
          >
            <img
              src={location.image}
              alt={location.alt}
              className='object-cover transition-all rounded-3xl w-96 h-60 hover:scale-105'
            />
            <p className='h-10 mx-6 truncate'>{location.location}</p>
            <Link to={`/location/details/${location.id}`}>
              <h1 className='mx-6 text-xl font-bold'>{location.country}</h1>
            </Link>
            <span className='pl-6 text-xl font-semibold'>
              Giá: {location.price} $
            </span>
            <Link
              to={`/location/details/${location.id}`}
              className='flex justify-end pr-10 hover:underline hover:text-blue-500'
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
      <h1 className='flex justify-center mx-auto text-3xl font-bold'>
        Location List
      </h1>
      <SectionInViewRight className='flex flex-wrap items-center w-full mx-auto my-10 gap-14 max-w-7xl'>
        {queryGetLocation?.data?.data?.map((location: LocationType) => (
          <div
            className='flex flex-col rounded-t-3xl shadow-md rounded-b-xl transition-all w-96 h-[28rem] space-y-2 border hover:scale-105 mx-auto gap-2 '
            key={location.id}
          >
            <img
              src={location.image}
              alt={location.alt}
              className='object-cover rounded-3xl w-96 h-60 '
            />
            <p className='h-10 mx-6 truncate'>{location.location}</p>
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
                Mua
              </Button>
            </div>
          </div>
        ))}
      </SectionInViewRight>
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
  );
}
