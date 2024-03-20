import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";
import { Button, Group, Select, TextInput } from "@mantine/core";
import useCountries from "../../hooks/useCountries";
import Map from "../Map/Map";

const AddLocation = ({ propertyDetails, setPropertyDetails, nextStep }) => {
  const { getAll } = useCountries();
  const [selectedType, setSelectedType] = useState(null);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const [showPropertySubtype, setShowPropertySubtype] = useState(false);
  const [propertySubtypeOptions, setPropertySubtypeOptions] = useState([]);

  const form = useForm({
    initialValues: {
      country: propertyDetails?.country,
      city: propertyDetails?.city,
      address: propertyDetails?.address,
      type: propertyDetails?.type,
      propertySubtype: propertyDetails?.propertySubtype
    },

    validate: {
      country: (value) => validateString(value),
      city: (value) => validateString(value),
      address: (value) => validateString(value),
      type: (value) => validateString(value),
      propertySubtype: (value) => validateString(value)
    },
  });

  const { country, city, address, type, propertySubtype } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({ ...prev, city, address, country, type, propertySubtype }));
      nextStep();
    }
  };

  const handleSelectChange = (value) => {
    setSelectedType(value);
    form.setFieldValue("type", value);
    setShowWelcomeMessage(false);

    if (value === "Residential") {
      setPropertySubtypeOptions([
        { value: "Upcoming projects", label: "Upcoming projects" },
        { value: "Ready to move", label: "Ready to move" },
        { value: "Luxury Living", label: "Luxury Living" },
        { value: "Builder Floors", label: "Builder Floors" },
        { value: "Affordable Living", label: "Affordable Living" },
        { value: "Plots", label: "Plots" }
      ]);
    } else if (value === "Commercial") {
      setPropertySubtypeOptions([
        { value: "Shops", label: "Shops" },
        { value: "Offices", label: "Offices" }
      ]);
    }
    setShowPropertySubtype(true);
  };

  const handlePropertySubtypeChange = (value) => {
    form.setFieldValue("propertySubtype", value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div
        className="flexCenter"
        style={{
          justifyContent: "space-between",
          gap: "3rem",
          marginTop: "3rem",
          flexDirection: "row",
        }}
      >
        <div className="flexColStart" style={{ flex: 1, gap: "1rem", marginTop: "3rem" }}>
          {showWelcomeMessage && (
            <div style={{ marginBottom: "1rem", color: "#333", textAlign: "center", fontSize: "1.2rem" }}>
              <p>Welcome! Please select the type of property you want to add.</p>
            </div>
          )}

          <Select
            style={{ width: "100%", marginBottom: "1rem" }}
            withAsterisk
            label="Property Type"
            data={[
              { value: "Residential", label: "Residential" },
              { value: "Commercial", label: "Commercial" }
            ]}
            onChange={handleSelectChange}
          />

          {showPropertySubtype && (
            <Select
              style={{ width: "100%", marginBottom: "1rem" }}
              withAsterisk
              label="Property Subtype"
              data={propertySubtypeOptions}
              onChange={handlePropertySubtypeChange}
            />
          )}

          <Select
            style={{ width: "100%", marginBottom: "1rem" }}
            withAsterisk
            label="Country"
            clearable
            searchable
            data={getAll()}
            {...form.getInputProps("country", { type: "input" })}
          />
          <TextInput style={{ width: "100%", marginBottom: "1rem" }} withAsterisk label="City" {...form.getInputProps("city", { type: "input" })} />
          <TextInput style={{ width: "100%", marginBottom: "1rem" }} withAsterisk label="Address" {...form.getInputProps("address", { type: "input" })} />
        </div>

        <div style={{ flex: 1 }}>
          <Map address={address} city={city} country={country} />
        </div>
      </div>

      <Group position="center" mt={"xl"}>
        <Button type="submit">Next Step</Button>
      </Group>
    </form>
  );
};

export default AddLocation;
