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
      });
    }
    setFormSubmitted(true);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <form className="mt-10 space-y-4" onSubmit={handleSubmit}>
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
