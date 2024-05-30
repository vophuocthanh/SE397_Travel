import { useEffect, useState } from 'react';
import { ChevronsUp } from 'lucide-react';

export const ScrollTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', scrollToTop);
    return function cleanup() {
      window.removeEventListener('scroll', scrollToTop);
    };
  });

  const scrollToTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };
  window.addEventListener('scroll', scrollToTop);
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div className='flex items-center justify-center '>
      <div
        style={{
          display: showScroll ? 'flex' : 'none',
        }}
        className='absolute z-50 items-center justify-center w-16 h-16 text-2xl rounded-full cursor-pointer right-6 scrollToTop bottom-32 bg-slate-300 hover:shadow-md hover:scale-105'
        onClick={scrollTop}
      >
        <ChevronsUp className='w-10 h-10 text-white' />
      </div>
    </div>
  );
};
