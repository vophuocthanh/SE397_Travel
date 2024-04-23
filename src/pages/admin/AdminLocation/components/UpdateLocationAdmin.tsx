
import { getDetailsLocation } from '@/apis/location';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {  useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';


export const UpdateLocationAdmin = () => {
    const { id } = useParams();
    const locationAdminDetailsQuery = useQuery({
        queryKey: ['locationAdminDetails'],
        queryFn: () => getDetailsLocation(id as string),
    });
    
    const [loading, setLoading] = useState(false);
    const initImage = locationAdminDetailsQuery.data?.data?.data?.image || '' ;
    const initCountry = locationAdminDetailsQuery.data?.data?.data?.country || '' ;    
    const initLocation = locationAdminDetailsQuery.data?.data?.data?.location || '' ;
    const initialPrice = locationAdminDetailsQuery.data?.data?.data?.price || '' ;
    const [image, setImage] = useState("");
    const [country, setCountry] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");

    console.log(initImage,initCountry,initLocation,initialPrice);
    console.log(id,"34567");
    
    console.log(image,country,location,price);
    console.log(locationAdminDetailsQuery.data?.data?.data?.id === id,"134");
    useEffect(()=> {
        setImage(initImage);
        setCountry(initCountry);
        setLocation(initLocation);
        setPrice(initialPrice);
    },[locationAdminDetailsQuery.data?.data?.data])

    const handleUpdateMe = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
        const res = await axios.put(
            `http://localhost:3000/api/location/${id}`,
            {
                image:image,
                country:country,
                location:location,
                price:+price,
            
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
        <div className='flex justify-center w-full mx-auto'>
            <form className='mt-10 space-y-6' onSubmit={handleUpdateMe}>
            <div className='space-y-2 w-80'>
            <label htmlFor='name' className='text-xl font-bold'>
                Image
            </label>
            <Input
                id="image"
                placeholder="Image"
                className="outline-none w-96"
                value={ image}
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
                value={ location}
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
                value={ price}
                onChange={(e) => setPrice(e.target.value)}
            />
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
        
        </div>
    )
}
