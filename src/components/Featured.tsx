import NewYork from '@/assets/images/featured/newyork.png';
import Travel from '@/assets/images/featured/travel.png';
import CNN from '@/assets/images/featured/cnn.png';
import Oslo from '@/assets/images/featured/oslo.png';
import Florida from '@/assets/images/featured/visitflorida.png';

const Featureds = [
  {
    id: 1,
    image: NewYork,
    alt: 'New York',
  },
  {
    id: 2,
    image: Travel,
    alt: 'Travel',
  },
  {
    id: 3,
    image: CNN,
    alt: 'CNN',
  },
  {
    id: 4,
    image: Oslo,
    alt: 'Oslo',
  },
  {
    id: 5,
    image: Florida,
    alt: 'Florida',
  },
];

const FeaturedPage = () => {
  return (
    <div className='flex flex-col items-center justify-center mx-auto mb-20 space-y-10 max-w-7xl'>
      <h1 className='text-3xl'>ALSO FEATURED IN</h1>
      <div className='flex items-center gap-28'>
        {Featureds.map((item) => (
          <div className='' key={item.id}>
            <img src={item.image} alt={item.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPage;
