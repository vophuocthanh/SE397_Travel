import { getDetailsLocation } from '@/apis/location';
import { Button } from '@/components/ui/button';
import Header from '@/pages/header/Header';
import { addProduct } from '@/redux/slice/cardSlice';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import thoigian from '@/assets/images/besttrip/thoi gian (1).webp';
import amthuc from '@/assets/images/besttrip/am thuc.webp';
import thamquan from '@/assets/images/besttrip/diem tham quan.webp';
import doituong from '@/assets/images/besttrip/doi tuong thich hop.webp';
import khachsan from '@/assets/images/besttrip/khach san.webp';
import phuongtien from '@/assets/images/besttrip/phuong tien di chuyen.webp';
import lytuong from '@/assets/images/besttrip/thoi gian ly tuong.webp';
import uudai from '@/assets/images/besttrip/uu dai.webp';
import LocationComment from '@/pages/comment-location/LocationComment';


export default function DetailsLocation() {
  const { locationId } = useParams();
  const { data: detailsLocation } = useQuery({
    queryKey: ['getDetailsLocation'],
    queryFn: () => getDetailsLocation(locationId as string),
  });
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  console.log('data', detailsLocation?.data.data);

  const giaFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(detailsLocation?.data?.data?.data?.price);

  return (
    <div>
      <Header className='flex items-center justify-between w-full px-10 mx-auto bg-gradient-to-r from-purple-600 via-red-300 to-yellow-500' />
      <Link
        to='/location'
        className='flex justify-end w-20 gap-2 p-2 pr-2 mt-8 ml-auto mr-[1rem] text-white bg-green-500 rounded-md cursor-pointer hover:shadow-lg lg:mr-20'
      >
        <ArrowLeft></ArrowLeft>
        Back
      </Link>
      <div className='flex m-[45px] max-sm:mb-[8rem] max-lg:space-around  '>
        {detailsLocation ? (
          <div className='w-full gap-10 '>
            <p className='mb-4 text-4xl font-bold text-slate-600'>
              {detailsLocation?.data?.data?.data?.location}
            </p>
            <p className='mb-4 text-2xl font-bold text-slate-600'>
              Quốc gia:{' '}
              <span className='text-2xl font-bold '>
                {detailsLocation?.data?.data?.data?.country}
              </span>
            </p>
            <div className='flex w-full h-[38rem]'>
              <div className='w-0.8/2'>
                <img
                  src={detailsLocation?.data?.data?.data?.image}
                  alt='best trip'
                  className='object-cover w-[98%] h-full border rounded-md '
                />
              </div>
              <div className='w-1/2 h-full'>
                <div className='flex justify-between h-[16rem] '>
                  <img
                    src={detailsLocation?.data?.data?.data?.image2}
                    alt='best trip'
                    className='object-cover border rounded-md w-[48.5%] '
                  />
                  <img
                    src={detailsLocation?.data?.data?.data?.image3}
                    alt='best trip'
                    className='object-cover border rounded-md w-[48.5%]  '
                  />
                </div>
                <div className='mt-4 '>
                  <img
                    src={detailsLocation?.data?.data?.data?.image4}
                    alt='best trip'
                    className='object-cover w-full border rounded-md h-[21rem]'
                  />
                </div>
              </div>
            </div>
            <div className='mt-10 '>
              <div className='flex '>
                <div className='w-[40rem] mr-8 '>
                  <div className='h-24 mb-20 overflow-hidden overflow-y-auto'>
                    <p className='mb-6'>
                      {detailsLocation?.data?.data?.data?.description}
                    </p>
                  </div>
                  <div className='p-4 rounded-md shadow-md bg-slate-200'>
                    <p>
                      Thời gian:{' '}
                      <span className='text-base font-bold'>
                        {detailsLocation?.data?.data?.data?.time_out}
                      </span>
                    </p>
                    <p className=''>
                      {' '}
                      Nơi khởi hành:{' '}
                      <span className='text-base font-bold'>
                        {detailsLocation?.data?.data?.data?.starting_gate}
                      </span>
                    </p>
                    <p>
                      Số chỗ còn nhận:{' '}
                      <span className='text-base font-bold'>
                        {detailsLocation?.data?.data?.data?.remainingCount}
                      </span>
                    </p>
                    <p>
                      Giá:{' '}
                      <span className='text-base font-bold'>
                        {giaFormatted} $
                      </span>
                    </p>
                  </div>
                </div>
                <div className='p-2 pb-8 border-b-2 col-md-7 col-12 right'>
                  <div className='w-[50rem]'>
                    <div className='flex justify-between '>
                      <div className='w-40'>
                        <img
                          src={thoigian}
                          className='w-[25px] h-[25px] mb-3'
                        />
                        <label className='font-bold'>Thời gian</label>
                        <p className='mt-3'>
                          {detailsLocation?.data?.data?.data?.time_out}
                        </p>
                      </div>
                      <div className='w-40'>
                        <img
                          src={phuongtien}
                          className='w-[25px] h-[25px] mb-3'
                        />
                        <label className='font-bold'>
                          Phương tiện di chuyển
                        </label>
                        <p className='mt-3'>
                          {detailsLocation?.data?.data?.data?.transport}
                        </p>
                      </div>
                      <div className='w-40'>
                        <img
                          src={thamquan}
                          className='w-[25px] h-[25px] mb-3'
                        />
                        <label className='font-bold'>Điểm tham quan</label>
                        <p className='mt-3'>
                          {detailsLocation?.data?.data?.data?.sight_seeing}
                        </p>
                      </div>
                      <div className='w-40'>
                        <img
                          src={amthuc}
                          className='w-[25px] h-[25px] mb-3'
                        />
                        <label className='font-bold'>Ẩm thực</label>
                        <p className='mt-3'>
                          {detailsLocation?.data?.data?.data?.cuisine}
                        </p>
                      </div>
                    </div>
                    <div className='flex justify-between mt-5'>
                      <div className='w-40'>
                        <img
                          src={khachsan}
                          className='w-[25px] h-[25px] mb-3'
                        />
                        <label className='font-bold'>Khách sạn</label>
                        <p className='mt-3'>
                          {detailsLocation?.data?.data?.data?.hotel}
                        </p>
                      </div>
                      <div className='w-40'>
                        <img
                          src={lytuong}
                          className='w-[25px] h-[25px] mb-3'
                        />
                        <label className='font-bold'>Thời gian lý tưởng</label>
                        <p className='mt-3'>
                          {detailsLocation?.data?.data?.data?.ideal_time}
                        </p>
                      </div>
                      <div className='w-40'>
                        <img
                          src={doituong}
                          className='w-[25px] h-[25px] mb-3'
                        />
                        <label className='font-bold'>Đối tượng thích hợp</label>
                        <p className='mt-3'>
                          {detailsLocation?.data?.data?.data?.suitable_subject}
                        </p>
                      </div>
                      <div className='w-40'>
                        <img
                          src={uudai}
                          className='w-[25px] h-[25px] mb-3'
                        />
                        <label className='font-bold'>Ưu đãi</label>
                        <p className='mt-3'>
                          {detailsLocation?.data?.data?.data?.vchouer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {token ? (
                <Button
                  className='flex w-40 mt-8 ml-auto text-xl bg-yellow-400 hover:bg-yellow-500 hover:shadow-lg max-md:mx-auto'
                  onClick={() =>
                    dispatch(addProduct(detailsLocation?.data?.data?.data))
                  }
                >
                  Mua
                </Button>
              ) : (
                <Button
                  className='w-40 ml-auto text-xl bg-yellow-400 hover:bg-yellow-500 hover:shadow-lg '
                  onClick={() =>
                    dispatch(addProduct(detailsLocation?.data?.data?.data))
                  }
                  disabled
                >
                  {detailsLocation?.data?.data?.data?.price} $
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className='w-20 h-20 mx-auto border-b-4 border-gray-900 rounded-full animate-spin'></div>
        )}
      </div>
      <div>
        <LocationComment/>
      </div>
    </div>
  );
}
