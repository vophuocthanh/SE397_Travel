import { CarouselPlugin } from '@/components/CarouselAnimation';

const Banner = () => {
  return (
    <div className='mb-[48rem]'>
      <div className='absolute top-0 flex w-full z-[-1]'>
        <CarouselPlugin></CarouselPlugin>
      </div>
      <div className='relative'>
        <h1 className='absolute inset-0 flex items-center justify-center text-white z-1 top-[16rem] text-7xl font-bold text-center left-[7rem] leading-tight md:block hidden'>
          Discover New Places and Create <br /> Unforgettable Memories
        </h1>
      </div>
    </div>
  );
};

export default Banner;
