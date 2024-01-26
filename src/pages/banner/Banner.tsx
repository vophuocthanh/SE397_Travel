import banner1 from '@/assets/images/banner-1.png';
import banner2 from '@/assets/images/banner-2.png';
import banner3 from '@/assets/images/banner-3.png';

const Banner = () => {
  return (
    <div className='mb-[60rem]'>
      <div className='absolute top-0 flex w-full z-[-1]'>
        <div className='relative w-1/3'>
          <img src={banner1} alt='' className='object-cover w-full h-full' />
          <div className='absolute inset-0 bg-black opacity-50'></div>
        </div>
        <div className='relative w-1/3'>
          <img src={banner2} alt='' className='object-cover w-full h-full' />
          <div className='absolute inset-0 bg-black opacity-50'></div>
        </div>
        <div className='relative w-1/3'>
          <img src={banner3} alt='' className='object-cover w-full h-full' />
          <div className='absolute inset-0 bg-black opacity-50'></div>
        </div>
      </div>
      <div className='relative'>
        <h1 className='absolute inset-0 flex items-center justify-center text-white z-1 top-[16rem] text-7xl font-bold text-center left-[7rem] leading-tight'>
          Discover New Places and Create <br /> Unforgettable Memories
        </h1>
      </div>
    </div>
  );
};

export default Banner;
