import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface TourDetail {
  id: string;
  name: string;
  image: string;
  description: string;
  location: string;
  price: number;
}

const TourAdminDetail = () => {
  const { tourId } = useParams();
  const [tour, setTour] = useState<TourDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTourDetail = async () => {
      try {
        if (!tourId) {
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/tour/${tourId}`
        );
        setTour(response.data.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tour details:', error);
        setLoading(false);
      }
    };

    fetchTourDetail();
  }, [tourId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!tour) {
    return <div>Tour not found!</div>;
  }

  return (
    <div>
      <h1 className='mb-4 text-2xl text-3xl font-bold text-center'>
        Tour Admin Details
      </h1>
      <div className='flex items-center justify-center '>
        <div className='max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg'>
          <img
            className='w-full border-b shadow-md black'
            src={tour.image}
            alt={tour.name}
          />
          <div className='p-4 text-xl'>
            <p className='text-gray-700 '>
              <b>ID:</b> {tour.id}
            </p>
            <p className='text-gray-700'>
              <b>Name:</b> {tour.name}
            </p>
            <p className='text-gray-700'>
              <b>Description:</b> {tour.description}
            </p>
            <p className='text-gray-700'>
              <b>Location:</b> {tour.location}
            </p>
            <p className='text-gray-700'>
              <b>Price:</b> {tour.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourAdminDetail;
