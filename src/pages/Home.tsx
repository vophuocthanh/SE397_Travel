import FeaturedPage from '@/components/Featured';
import Banner from './banner/Banner';
import Header from './header/Header';
import BestTrip from '@/components/BestTrip';
import LocationSection from '@/pages/location/Locations';
import LocationBasedSearch from '@/components/LocationBasedSearch';
import Footer from './footer/Footer';
import CrispProvider from '@/components/crisp-provirde';
import WhyChosseTravel from '@/components/why-chosse-travel';

const Home = () => {
  return (
    <div className='relative r-0'>
      <Header className='flex items-center justify-between w-full px-6 py-2 mx-auto bg-transparent' />
      <Banner />
      <FeaturedPage />
      <BestTrip />
      <LocationSection />
      <LocationBasedSearch />
      <WhyChosseTravel />
      <Footer />
      <CrispProvider />
    </div>
  );
};

export default Home;
