import FeaturedPage from '@/components/Featured';
import Banner from './banner/Banner';
import Header from './header/Header';
import BestTrip from '@/components/BestTrip';
import LocationSection from '@/components/Locations';
import LocationBasedSearch from '@/components/LocationBasedSearch';
import Footer from './footer/Footer';

const Home = () => {
  return (
    <div className='relative'>
      <Header />
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
