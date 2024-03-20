import { useState, useContext } from "react";
import Select from "react-select";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import UserDetailContext from "../../context/UserDetailContext";
import useProperties from "../../hooks/useProperties.jsx";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createResidency } from "../../utils/api";
import { validateString } from "../../utils/common";

const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
}) => {
  const [amenities, setAmenities] = useState(propertyDetails.amenities || []);
  const [newAmenity, setNewAmenity] = useState("");

  const form = useForm({
    initialValues: {
      bedrooms: propertyDetails.facilities.bedrooms,
      parkings: propertyDetails.facilities.parkings,
      bathrooms: propertyDetails.facilities.bathrooms,
    },
    validate: {
      // Custom validation for bedrooms, parkings, bathrooms based on property type
      bedrooms: (value) =>
        propertyDetails.type === "rent" || propertyDetails.type === "sale"
          ? validateString(value)
          : undefined,
      parkings: (value) =>
        propertyDetails.type === "rent" || propertyDetails.type === "sale"
          ? validateString(value)
          : undefined,
      bathrooms: (value) =>
        propertyDetails.type === "rent" || propertyDetails.type === "sale"
          ? validateString(value)
          : undefined,
    },
  });

  const { bedrooms, parkings, bathrooms } = form.values;

  const handleAmenitiesChange = (selectedOptions) => {
    setAmenities(selectedOptions || []);
  };

  const handleNewAmenityChange = (event) => {
    setNewAmenity(event.target.value);
  };

  const handleAddNewAmenity = () => {
    if (newAmenity.trim() !== "") {
      setAmenities((prevAmenities) => [
        ...prevAmenities,
        { label: newAmenity, value: newAmenity },
      ]);
      setNewAmenity("");
    }
  };

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: { bedrooms, parkings, bathrooms },
        amenities: amenities.map((amenity) => amenity.value),
      }));
      mutate();
    }
  };

  // ==================== upload logic
  const { user } = useAuth0();
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useProperties();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      createResidency(
        {
          ...propertyDetails,
          facilities: { bedrooms, parkings, bathrooms },
          amenities: amenities.map((amenity) => amenity.value),
        },
        token
      ),
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSettled: () => {
      toast.success("Added Successfully", { position: "bottom-right" });
      setPropertyDetails({
        title: "",
        description: "",
        price: 0,
        type: "",
        country: "",
        city: "",
        address: "",
        area: "",
        facilities: {
          bedrooms: 0,
          parkings: 0,
          bathrooms: 0,
        },
        amenities: [], // Reset amenities after successful addition
      });
      setOpened(false);
      setActiveStep(0);
      refetchProperties();
    },
  });
  const amenitiesOptions = [
    { label: "Gym", value: "Gym" },
    { label: "Jogging", value: "Jogging" },
    { label: "Garden", value: "Garden" },
    { label: "Kids Play Area", value: "Kids Play Area" },
    { label: "24 Hrs Hot Water Supply", value: "24 Hrs Hot Water Supply" },
    { label: "24 hrs Security", value: "24 hrs Security" },
    { label: "Car Parking", value: "Car Parking" },
    { label: "Club House", value: "Club House" },
    { label: "Amphitheatre", value: "Amphitheatre" },
    { label: "Badminton Court", value: "Badminton Court" },
    { label: "Basketball Court", value: "Basketball Court" },
    { label: "Cafe Lounge", value: "Cafe Lounge" },
    { label: "Cycling Track", value: "Cycling Track" },
    { label: "High Speed Elevator", value: "High Speed Elevator" },
    { label: "Indoor Games", value: "Indoor Games" },
    { label: "Mini Theatre", value: "Mini Theatre" },
    { label: "Multi-Purpose Court", value: "Multi-Purpose Court" },
    { label: "Pet Garden", value: "Pet Garden" },
    { label: "Play Hills mound", value: "Play Hills mound" },
    { label: "Power Back-up", value: "Power Back-up" },
    { label: "Restaurant", value: "Restaurant" },
    { label: "Salon", value: "Salon" },
    { label: "Sandpit for Toddlers", value: "Sandpit for Toddlers" },
    { label: "Sports club", value: "Sports club" },
    { label: "Squash Court", value: "Squash Court" },
    { label: "other", value: "other" },
  ];


  return (
    <Box maxWidth="30%" mx="auto" my="sm" className="facilities-container">
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <NumberInput
        withAsterisk
        label="No of Bedrooms"
        min={0}
        {...form.getInputProps("bedrooms")}
      />
      <NumberInput
        label="No of Parkings"
        min={0}
        {...form.getInputProps("parkings")}
      />
      <NumberInput
        withAsterisk
        label="No of Bathrooms"
        min={0}
        {...form.getInputProps("bathrooms")}
      />
      <NumberInput
        label="Carpet Area"
        // min={0}
        {...form.getInputProps("area")}
      />
      <label htmlFor="amenities" className="amenities-label">
        Amenities:
      </label>
      <Select
        id="amenities"
        isMulti
        options={amenitiesOptions.concat(amenities)}
        value={amenities}
        onChange={handleAmenitiesChange}
        placeholder="Select Amenities..."
        className="amenities-select"
      />
      <input
        type="text"
        value={newAmenity}
        onChange={handleNewAmenityChange}
        placeholder="Enter new amenity..."
        className="new-amenity-input"
      />
      <Button
        type="button"
        onClick={handleAddNewAmenity}
        className="add-amenity-button"
      >
        Add Amenity
      </Button>
      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button type="submit" color="green" disabled={isLoading}>
          {isLoading ? "Submitting" : "Add Property"}
        </Button>
      </Group>
    </form>
  </Box>
);
};

export default Facilities;