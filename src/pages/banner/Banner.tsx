import banner1 from '@/assets/images/banner-1.png';
import banner2 from '@/assets/images/banner-2.png';
import banner3 from '@/assets/images/banner-3.png';

const Banner = () => {
  return (
    <div className=''>
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
    </div>
  );
};

export default Banner;
