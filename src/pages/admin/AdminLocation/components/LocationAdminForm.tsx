import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { getToken } from "@/lib/storage";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createLocation } from '@/apis/location';
import { LocationSchemaType } from '@/lib/shcema';

export type TourFormConditionProps =
    | {
        type: "create";
        data?: never;
        }
    | {
        type: "edit";
        data: LocationSchemaType;
        };

    interface TourFormProps {
    onSubmit: (data: LocationSchemaType) => void;
    isLoading?: boolean;
    onClose: () => void;
}

const LocationAdminForm = ({
    type,
    onClose,
}: TourFormProps & TourFormConditionProps) => {
    console.log(type);
    const [image, setImage] = useState("");
    const [country, setCountry] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);




    const createLocationQuery = useMutation({
    mutationFn: createLocation,
    onSuccess: () => {
        queryClient.invalidateQueries({
        queryKey: ["createLocation"],
        });
        toast.success("Create Successfully");
        setLoading(false);
        navigate("/admin/location");
    },
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (
        !image ||
        !country ||
        !location ||
        !price 
    ) {
        return;
    }
    createLocationQuery.mutate({
        image,
        country,
        location,        
        price: Number(price),
    });
    onClose();
    };
    const handleClose = () => {
    onClose();
    };


return (
    <form className="mt-10 space-y-4" onSubmit={handleSubmit}>
    <div className="space-y-2">
        <label htmlFor="image">Image</label>
        {formSubmitted && !image && (
        <span className="ml-5 text-red-500">* Image is required</span>
        )}
        <Input
        id="image"
        placeholder="Image"
        className="outline-none w-96"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        />
    </div>
    <div className="space-y-2">
        <label htmlFor="desc">Country</label>
        {formSubmitted && !country && (
        <span className="ml-5 text-red-500">* Country is required</span>
        )}
        <Input
        id="desc"
        placeholder="Desc"
        className="outline-none w-96"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        />
    </div>
    <div className="space-y-2">
        <label htmlFor="location">Location</label>
        {formSubmitted && !location && (
        <span className="ml-5 text-red-500">* Location is required</span>
        )}
        <Input
        id="location"
        placeholder="Location"
        className="outline-none w-96"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        />
    </div>
    <div className="space-y-2">
        <label htmlFor="price">Price</label>
        {formSubmitted && !price && (
        <span className="ml-5 text-red-500">* Price is required</span>
        )}
        <Input
        id="price"
        placeholder="Price"
        className="outline-none w-96"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        />
    </div>
    <Button loading={loading}   className="bg-blue-600">
        Submit
    </Button>
    <Button
        className="ml-6 bg-gray-600"
        loading={loading}
        onClick={handleClose}
    >
        Close
    </Button>
    </form>
)
}

export default LocationAdminForm