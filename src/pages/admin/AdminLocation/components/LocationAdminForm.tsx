import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { getToken } from "@/lib/storage";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createLocation } from "@/apis/location";
import { LocationSchemaType } from "@/lib/shcema";

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
  fetchLocation: () => Promise<void>;
}

const LocationAdminForm = ({
  type,
  onClose,
  fetchLocation,
}: TourFormProps & TourFormConditionProps) => {
  console.log(type);
  const [image, setImage] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [remainingCount, setRemainingCount] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [suitable_subject, setSuitable_subject] = useState("");
  const [vchouer, setVchouer] = useState("");
  const [time_out, setTime_out] = useState("");
  const [ideal_time, setIdeal_time] = useState("");
  const [transport, setTransport] = useState("");
  const [hotel, setHotel] = useState("");
  const [starting_gate, setStarting_gate] = useState("");
  const [sight_seeing, setSight_seeing] = useState("");

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
      fetchLocation();
      navigate("/admin/location");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!image || !country || !location || !price) {
      return;
    }
    createLocationQuery.mutate({
      image,
      country,
      location,
      price: Number(price),
      remainingCount: Number(remainingCount),
      image2,
      image3,
      image4,
      cuisine,
      suitable_subject,
      vchouer,
      time_out,
      ideal_time,
      transport,
      hotel,
      starting_gate,
      sight_seeing,
    });
    onClose();
  };
  const handleClose = () => {
    onClose();
  };

  return (
    <form className="mt-4 space-y-4 " onSubmit={handleSubmit}>
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
      <div className="space-y-2">
        <label htmlFor="price">RemainingCount</label>
        {formSubmitted && !remainingCount && (
          <span className="ml-5 text-red-500">
            * RemainingCount is required
          </span>
        )}
        <Input
          id="remainingCount"
          placeholder="RemainingCount"
          className="outline-none w-96"
          value={remainingCount}
          onChange={(e) => setRemainingCount(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="price">Image2</label>
        {formSubmitted && !image2 && (
          <span className="ml-5 text-red-500">* Image2 is required</span>
        )}
        <Input
          id="image2"
          placeholder="Image2"
          className="outline-none w-96"
          value={image2}
          onChange={(e) => setImage2(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="price">Image3</label>
        {formSubmitted && !image3 && (
          <span className="ml-5 text-red-500">* Image3 is required</span>
        )}
        <Input
          id="image3"
          placeholder="Image3"
          className="outline-none w-96"
          value={image3}
          onChange={(e) => setImage3(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="price">Image4</label>
        {formSubmitted && !image4 && (
          <span className="ml-5 text-red-500">* Image4 is required</span>
        )}
        <Input
          id="image4"
          placeholder="Image4"
          className="outline-none w-96"
          value={image4}
          onChange={(e) => setImage4(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="price">Cuisine</label>
        {formSubmitted && !cuisine && (
          <span className="ml-5 text-red-500">* Cuisine is required</span>
        )}
        <Input
          id="cuisine"
          placeholder="Cuisine"
          className="outline-none w-96"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="price">Cuisine</label>
        {formSubmitted && !suitable_subject && (
          <span className="ml-5 text-red-500">
            * Suitable_subject is required
          </span>
        )}
        <Input
          id="suitable_subject"
          placeholder="Suitable_subject"
          className="outline-none w-96"
          value={suitable_subject}
          onChange={(e) => setSuitable_subject(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="price">Vchouer</label>
        {formSubmitted && !vchouer && (
          <span className="ml-5 text-red-500">* Vchouer is required</span>
        )}
        <Input
          id="vchouer"
          placeholder="Vchouer"
          className="outline-none w-96"
          value={vchouer}
          onChange={(e) => setVchouer(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="price">Time_out</label>
        {formSubmitted && !time_out && (
          <span className="ml-5 text-red-500">* Time_out is required</span>
        )}
        <Input
          id="time_out"
          placeholder="Time_out"
          className="outline-none w-96"
          value={time_out}
          onChange={(e) => setTime_out(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="price">Ideal_time</label>
        {formSubmitted && !ideal_time && (
          <span className="ml-5 text-red-500">* Ideal_time is required</span>
        )}
        <Input
          id="ideal_time"
          placeholder="Ideal_time"
          className="outline-none w-96"
          value={ideal_time}
          onChange={(e) => setIdeal_time(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="price">Transport</label>
        {formSubmitted && !ideal_time && (
          <span className="ml-5 text-red-500">* Transport is required</span>
        )}
        <Input
          id="transport"
          placeholder="Transport"
          className="outline-none w-96"
          value={ideal_time}
          onChange={(e) => setTransport(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="price">Hotel</label>
        {formSubmitted && !hotel && (
          <span className="ml-5 text-red-500">* Hotel is required</span>
        )}
        <Input
          id="hotel"
          placeholder="Hotel"
          className="outline-none w-96"
          value={hotel}
          onChange={(e) => setHotel(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="price">Starting_gate</label>
        {formSubmitted && !starting_gate && (
          <span className="ml-5 text-red-500">* Starting_gate is required</span>
        )}
        <Input
          id="starting_gate"
          placeholder="Starting_gate"
          className="outline-none w-96"
          value={starting_gate}
          onChange={(e) => setStarting_gate(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="price">setSight_seeing</label>
        {formSubmitted && !sight_seeing && (
          <span className="ml-5 text-red-500">* Sight_seeing is required</span>
        )}
        <Input
          id="sight_seeing"
          placeholder="Sight_seeing"
          className="outline-none w-96"
          value={sight_seeing}
          onChange={(e) => setSight_seeing(e.target.value)}
        />
      </div>

      <Button loading={loading} className="bg-blue-600">
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
  );
};

export default LocationAdminForm;
