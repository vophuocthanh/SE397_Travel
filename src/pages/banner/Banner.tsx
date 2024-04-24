import { CarouselPlugin } from '@/components/CarouselAnimation';
import { useEffect, useState } from 'react';

const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(100);
  const [, setIndex] = useState(1);
  const toRotate = [
    'Discovering the wonders of our planet, one adventure at a time',
    'Travel Stories from different people globally',
  ];
  const period = 1000;

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    const i = loopNum % toRotate.length;
    const fullText = toRotate[i];
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };
  return (
    <div className='mb-[48rem]'>
      <div className='absolute top-0 flex md:w-full z-[-1]'>
        <CarouselPlugin></CarouselPlugin>
      </div>
      <div className='relative'>
        <h1 className='absolute inset-0 items-center justify-center text-white z-1 top-[16rem] text-7xl font-bold text-center left-0 leading-tight md:block hidden'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-red-500 to-yellow-300'>
            {text}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Banner;
