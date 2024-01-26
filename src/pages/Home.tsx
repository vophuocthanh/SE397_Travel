import FeaturedPage from '@/components/Featured';
import Banner from './banner/Banner';
import Header from './header/Header';
import BestTrip from '@/components/BestTrip';

const Home = () => {
  return (
    <div className='h-[150rem] relative'>
      <Header />
      <Banner />
      <FeaturedPage />
      <BestTrip />
    </div>
  );
};

export default Home;
