import React from "react";
import { TextInput, Box, Textarea, Group, Button, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";

const BasicDetails = ({ prevStep, nextStep, propertyDetails, setPropertyDetails }) => {
  const form = useForm({
    initialValues: {
      title: propertyDetails.title,
      description: propertyDetails.description,
      price: propertyDetails.price,
      area:propertyDetails.area,

    },
    validate: {
      title: (value) => validateString(value),
      description: (value) => validateString(value),
      price: (value) =>validateString(value),
          
      area: (value) => validateString(value),
    },
  });

  const {title, description, price,area} = form.values


  const handleSubmit = ()=> {
    const {hasErrors} = form.validate()
    if(!hasErrors) {
     setPropertyDetails((prev)=> ({...prev, title, description, price,area}))
     nextStep()
    }
   }
  return (
    <Box maw="50%" mx="auto" my="md">
      <form  onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Property Name"
          {...form.getInputProps("title")}
        />
        <Textarea
          placeholder="Description"
          label="Description"
          withAsterisk
          {...form.getInputProps("description")}
        />
        <TextInput
          withAsterisk
          label="Price"
          placeholder="1000"
          {...form.getInputProps("price")}
        />
        <TextInput
          withAsterisk
          label="area"
          placeholder="Area in sq.ft"
          {...form.getInputProps("area")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit">
            Next step
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default BasicDetails;
