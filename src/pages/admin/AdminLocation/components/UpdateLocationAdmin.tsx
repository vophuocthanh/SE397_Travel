import { getDetailsLocation } from '@/apis/location';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export const UpdateLocationAdmin = () => {
  const { id } = useParams();
  const locationAdminDetailsQuery = useQuery({
    queryKey: ['locationAdminDetails'],
    queryFn: () => getDetailsLocation(id as string),
  });

  const [loading, setLoading] = useState(false);
  const initImage =
    locationAdminDetailsQuery.data?.data?.data?.data?.image || '';
  const initCountry =
    locationAdminDetailsQuery.data?.data?.data?.data?.country || '';
  const initLocation =
    locationAdminDetailsQuery.data?.data?.data?.data?.location || '';
  const initialPrice =
    locationAdminDetailsQuery.data?.data?.data?.data?.price || '';
  const initialRemainingCount =
    locationAdminDetailsQuery.data?.data?.data?.data?.remainingCount || '';

  const initImage2 =
    locationAdminDetailsQuery.data?.data?.data?.data?.image2 || '';
  const initImage3 =
    locationAdminDetailsQuery.data?.data?.data?.data?.image3 || '';
  const initImage4 =
    locationAdminDetailsQuery.data?.data?.data?.data?.image4 || '';
  const initCuisine =
    locationAdminDetailsQuery.data?.data?.data?.data?.cuisine || '';
  const initSuitable_subject =
    locationAdminDetailsQuery.data?.data?.data?.data?.suitable_subject || '';
  const initVchouer =
    locationAdminDetailsQuery.data?.data?.data?.data?.vchouer || '';
  const initTime_out =
    locationAdminDetailsQuery.data?.data?.data?.data?.time_out || '';
  const initIdeal_time =
    locationAdminDetailsQuery.data?.data?.data?.data?.ideal_time || '';
  const initTransport =
    locationAdminDetailsQuery.data?.data?.data?.data?.transport || '';
  const initHotel =
    locationAdminDetailsQuery.data?.data?.data?.data?.hotel || '';
  const initStarting_gate =
    locationAdminDetailsQuery.data?.data?.data?.data?.starting_gate || '';
  const initSight_seeing =
    locationAdminDetailsQuery.data?.data?.data?.data?.sight_seeing || '';

  const [image, setImage] = useState(initImage);
  const [country, setCountry] = useState(initCountry);
  const [location, setLocation] = useState(initLocation);
  const [price, setPrice] = useState(initialPrice);
  const [remainingCount, setRemainingCount] = useState(initialRemainingCount);
  const [image2, setImage2] = useState(initImage2);
  const [image3, setImage3] = useState(initImage3);
  const [image4, setImage4] = useState(initImage4);
  const [cuisine, setCuisine] = useState(initCuisine);
  const [suitable_subject, setSuitable_subject] =
    useState(initSuitable_subject);
  const [vchouer, setVchouer] = useState(initVchouer);
  const [time_out, setTime_out] = useState(initTime_out);
  const [ideal_time, setIdeal_time] = useState(initIdeal_time);
  const [transport, setTransport] = useState(initTransport);
  const [hotel, setHotel] = useState(initHotel);
  const [starting_gate, setStarting_gate] = useState(initStarting_gate);
  const [sight_seeing, setSight_seeing] = useState(initSight_seeing);

  useEffect(() => {
    setImage(initImage);
    setCountry(initCountry);
    setLocation(initLocation);
    setPrice(initialPrice);
    setRemainingCount(initialRemainingCount);
    setImage2(initImage2);
    setImage3(initImage3);
    setImage4(initImage4);
    setCuisine(initCuisine);
    setSuitable_subject(initSuitable_subject);
    setVchouer(initVchouer);
    setTime_out(initTime_out);
    setIdeal_time(initIdeal_time);
    setTransport(initTransport);
    setHotel(initHotel);
    setStarting_gate(initStarting_gate);
    setSight_seeing(initSight_seeing);
  }, [locationAdminDetailsQuery.data?.data?.data?.data]);

  const handleUpdateMe = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/location/${id}`,
        {
          image: image,
          country: country,
          location: location,
          price: +price,
          remainingCount: +remainingCount,
          image2: image2,
          image3: image3,
          image4: image4,
          cuisine: cuisine,
          suitable_subject: suitable_subject,
          vchouer: vchouer,
          time_out: time_out,
          ideal_time: ideal_time,
          transport: transport,
          hotel: hotel,
          starting_gate: starting_gate,
          sight_seeing: sight_seeing,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success('Update successfully!');
        // navigate('/admin/user');
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      className='flex flex-wrap max-w-4xl mx-auto mt-10 space-y-6'
      onSubmit={handleUpdateMe}
    >
      <div className='w-full space-y-2 lg:w-1/2'>
        <div className='space-y-2 w-80'>
          <label htmlFor='name' className='text-xl font-bold'>
            Image
          </label>
          <Input
            id='image'
            placeholder='Image'
            className='outline-none w-96'
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className='space-y-2'>
          <label htmlFor='country' className='text-xl font-bold'>
            Country
          </label>
          <Input
            id='country'
            placeholder='country'
            value={country}
            className='outline-none lg:w-96'
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className='space-y-2'>
          <label htmlFor='price' className='text-xl font-bold'>
            Location
          </label>
          <Input
            id='location'
            placeholder='location'
            value={location}
            className='outline-none lg:w-96'
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className='space-y-2'>
          <label htmlFor='price' className='text-xl font-bold'>
            Price
          </label>
          <Input
            id='price'
            placeholder='price'
            className='outline-none lg:w-96'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className='space-y-2'>
          <label htmlFor='remainingCount' className='text-xl font-bold'>
            RemainingCount
          </label>
          <Input
            id='remainingCount'
            placeholder='remainingCount'
            className='outline-none lg:w-96'
            value={remainingCount}
            onChange={(e) => setRemainingCount(e.target.value)}
          />
        </div>
        <div className='space-y-2 '>
          <label htmlFor='name' className='text-xl font-bold'>
            Image2
          </label>
          <Input
            id='image2'
            placeholder='Image2'
            className='outline-none w-96'
            value={image2}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className='space-y-2'>
          <label htmlFor='name' className='text-xl font-bold'>
            Image3
          </label>
          <Input
            id='image3'
            placeholder='Image3'
            className='outline-none w-96'
            value={image3}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className='space-y-2'>
          <label htmlFor='name' className='text-xl font-bold'>
            Image4
          </label>
          <Input
            id='image4'
            placeholder='Image4'
            className='outline-none w-96'
            value={image4}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
      </div>

      <div className='w-full space-y-2 lg:w-1/2' style={{ marginTop: 0 }}>
        <div className='space-y-2 w-80'>
          <label htmlFor='suitable_subject' className='text-xl font-bold'>
            suitable_subject
          </label>
          <Input
            id='suitable_subject'
            placeholder='suitable_subject'
            className='outline-none lg:w-96'
            value={suitable_subject}
            onChange={(e) => setSuitable_subject(e.target.value)}
          />
        </div>
        <div className='space-y-2'>
          <label htmlFor='cuisine' className='text-xl font-bold'>
            Cuisine
          </label>
          <Input
            id='cuisine'
            placeholder='Cuisine'
            className='outline-none lg:w-96'
            value={remainingCount}
            onChange={(e) => setCuisine(e.target.value)}
          />
        </div>
        <div className='space-y-2'>
          <label htmlFor='vchouer' className='text-xl font-bold'>
            Vchouer
          </label>
          <Input
            id='vchouer'
            placeholder='Vchouer'
            className='outline-none lg:w-96'
            value={vchouer}
            onChange={(e) => setVchouer(e.target.value)}
          />
        </div>
        <div className='space-y-2'>
          <label htmlFor='time_out' className='text-xl font-bold'>
            Time_out
          </label>
          <Input
            id='time_out'
            placeholder='time_out'
            className='outline-none lg:w-96'
            value={time_out}
            onChange={(e) => setTime_out(e.target.value)}
          />
        </div>
        <div className='space-y-2'>
          <label htmlFor='transport' className='text-xl font-bold'>
            Transport
          </label>
          <Input
            id='transport'
            placeholder='transport'
            className='outline-none lg:w-96'
            value={transport}
            onChange={(e) => setTransport(e.target.value)}
          />
        </div>
        <div className='space-y-2'>
          <label htmlFor='hotel' className='text-xl font-bold'>
            Hotel
          </label>
          <Input
            id='hotel'
            placeholder='Hotel'
            className='outline-none lg:w-96'
            value={hotel}
            onChange={(e) => setHotel(e.target.value)}
          />
        </div>
        <div className='space-y-2'>
          <label htmlFor='starting_gate' className='text-xl font-bold'>
            Starting_gate
          </label>
          <Input
            id='starting_gate'
            placeholder='Starting_gate'
            className='outline-none lg:w-96'
            value={starting_gate}
            onChange={(e) => setStarting_gate(e.target.value)}
          />
        </div>
        <div className='space-y-2'>
          <label htmlFor='sight_seeing' className='text-xl font-bold'>
            Sight_seeing
          </label>
          <Input
            id='sight_seeing'
            placeholder='Sight_seeing'
            className='outline-none lg:w-96'
            value={sight_seeing}
            onChange={(e) => setSight_seeing(e.target.value)}
          />
        </div>
      </div>

      <div className='flex items-center justify-center gap-6 pt-8 mx-auto'>
        <Button type='submit' loading={loading}>
          Update Profile
        </Button>

        <Link to='/admin/location'>
          <Button>Back</Button>
        </Link>
      </div>
    </form>
  );
};
