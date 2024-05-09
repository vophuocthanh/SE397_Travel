import { TourSchemaType } from "@/lib/shcema";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBestTrip, putBestTrip } from "@/apis/best-trip";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Tour } from "../TourAdmin";

export type TourFormConditionProps =
  | {
      type: "create";
      data?: never;
    }
  | {
      type: "edit";
      data?: TourSchemaType;
    };

interface TourFormProps {
  onSubmit: (data: TourSchemaType) => void;
  isLoading?: boolean;
  onClose: () => void;
  tour: Tour;
  fetchTours: () => Promise<void>;
}

const TourAdminForm = ({
  type,
  onClose,
  tour,
  fetchTours,
}: TourFormProps & TourFormConditionProps) => {
  console.log(type);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
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

  useEffect(() => {
    if (tour) {
      setName(tour.name);
      setImage(tour.image);
      setDescription(tour.description);
      setLocation(tour.location);
      setPrice(String(tour.price));
      setRemainingCount(tour.remainingCount);
      setCuisine(tour.cuisine);
      setSuitable_subject(tour.suitable_subject);
      setVchouer(tour.vchouer);
      setTime_out(tour.time_out);
      setIdeal_time(tour.ideal_time);
      setImage2(tour.image2);
      setImage3(tour.image3);
      setImage4(tour.image4);
      setTransport(tour.transport);
      setHotel(tour.hotel);
      setStarting_gate(tour.starting_gate);
      setSight_seeing(tour.sight_seeing);
    }
  }, [tour]);

  const createTourQuery = useMutation({
    mutationFn: createBestTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["createBestTrip"],
      });
      toast.success("Create Successfully");
      setLoading(false);
      fetchTours();
      resetForm();
      navigate("/admin/tour");
    },
  });
  const updateTourQuery = useMutation({
    mutationFn: putBestTrip,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["updateBestTrip"],
      });
      fetchTours();
      toast.success("Update Successfully");
      setLoading(false);
      resetForm();
      onClose();
    },
  });

  const resetForm = () => {
    console.log("success");
    setName("");
    setImage("");
    setDescription("");
    setLocation("");
    setPrice("");
    setRemainingCount("");
    setCuisine("");
    setSuitable_subject("");
    setVchouer("");
    setTime_out("");
    setIdeal_time("");
    setImage2("");
    setImage4("");
    setTransport("");
    setHotel("");
    setStarting_gate("");
    setSight_seeing("");
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose();
    if (
      !name ||
      !image ||
      !description ||
      !location ||
      !price ||
      !remainingCount
    ) {
      return;
    }
    if (type === "create") {
      createTourQuery.mutate({
        name,
        image,
        description,
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
    } else if (type === "edit") {
      updateTourQuery.mutate({
        id: tour.id,
        name,
        image,
        description,
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
    }
    setFormSubmitted(true);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label htmlFor="name">Name</label>
        {formSubmitted && !name && (
          <span className="ml-5 text-red-500 ">Name is required</span>
        )}
        <Input
          id="name"
          placeholder="Name"
          className="outline-none w-96"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
        <label htmlFor="image">Image2</label>
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
        <label htmlFor="image3">Image3</label>
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
        <label htmlFor="image4">Image4</label>
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
        <label htmlFor="desc">Description</label>
        {formSubmitted && !description && (
          <span className="ml-5 text-red-500">* Description is required</span>
        )}
        <Input
          id="desc"
          placeholder="Desc"
          className="outline-none w-96"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          id="price"
          placeholder="Price"
          className="outline-none w-96"
          value={remainingCount}
          onChange={(e) => setRemainingCount(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="cuisine">Cuisine</label>
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
        <label htmlFor="subject">Suitable Subject</label>
        {formSubmitted && !suitable_subject && (
          <span className="ml-5 text-red-500">
            * Suitable Subject is required
          </span>
        )}
        <Input
          id="subject"
          placeholder="Suitable Subject"
          className="outline-none w-96"
          value={suitable_subject}
          onChange={(e) => setSuitable_subject(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="vchouer">Voucher</label>
        {formSubmitted && !vchouer && (
          <span className="ml-5 text-red-500">* Voucher is required</span>
        )}
        <Input
          id="vchouer"
          placeholder="Voucher"
          className="outline-none w-96"
          value={vchouer}
          onChange={(e) => setVchouer(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="time_out">Time Out</label>
        {formSubmitted && !time_out && (
          <span className="ml-5 text-red-500">* Time Out is required</span>
        )}
        <Input
          id="time_out"
          placeholder="Time Out"
          className="outline-none w-96"
          value={time_out}
          onChange={(e) => setTime_out(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="ideal_time">Ideal Time</label>
        {formSubmitted && !ideal_time && (
          <span className="ml-5 text-red-500">* Ideal Time is required</span>
        )}
        <Input
          id="ideal_time"
          placeholder="Ideal Time"
          className="outline-none w-96"
          value={ideal_time}
          onChange={(e) => setIdeal_time(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="transport">Transport</label>
        {formSubmitted && !transport && (
          <span className="ml-5 text-red-500">* Transport is required</span>
        )}
        <Input
          id="transport"
          placeholder="Transport"
          className="outline-none w-96"
          value={transport}
          onChange={(e) => setTransport(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="hotel">Hotel</label>
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
        <label htmlFor="starting_gate">Starting Gate</label>
        {formSubmitted && !starting_gate && (
          <span className="ml-5 text-red-500">* Starting Gate is required</span>
        )}
        <Input
          id="starting_gate"
          placeholder="Starting Gate"
          className="outline-none w-96"
          value={starting_gate}
          onChange={(e) => setStarting_gate(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="sight_seeing">Sight Seeing</label>
        {formSubmitted && !sight_seeing && (
          <span className="ml-5 text-red-500">* Sight Seeing is required</span>
        )}
        <Input
          id="sight_seeing"
          placeholder="Sight Seeing"
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

export default TourAdminForm;
