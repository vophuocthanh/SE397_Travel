import FeaturedPage from '@/components/Featured';
import Banner from './banner/Banner';
import Header from './header/Header';
import BestTrip from '@/components/BestTrip';
import LocationSection from '@/pages/location/Locations';
import LocationBasedSearch from '@/components/LocationBasedSearch';
import Footer from './footer/Footer';

const Home = () => {
  return (
    <div className='relative r-0'>
      <Header className='flex items-center justify-between w-full px-10 py-4 mx-auto bg-transparent' />
      <Banner />
      <FeaturedPage />
      <BestTrip />
      <LocationSection />
      <LocationBasedSearch />
      <Footer />
    </div>
  );
};

export default Home;
