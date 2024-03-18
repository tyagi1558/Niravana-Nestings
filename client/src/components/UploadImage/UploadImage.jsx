import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./UploadImage.css";
import { Button, Group } from "@mantine/core";

const UploadImage = ({
  propertyDetails,
  setPropertyDetails,
  nextStep,
  prevStep,
}) => {
  const [imageURLs, setImageURLs] = useState(propertyDetails.images || []);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const handleNext = () => {
    setPropertyDetails((prev) => ({ ...prev, images: imageURLs }));
    nextStep();
  };

  const handleAddMorePhotos = () => {
    widgetRef.current?.open();
  };

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dcdhklrjc",
        uploadPreset: "vx0dyjgc",
        maxFiles: 10, // Allow up to 6 files to be uploaded
        multiple: true, // Enable multiple file upload
      },
      (err, result) => {
        if (result.event === "success") {
          setImageURLs((prev) => [...prev, result.info.secure_url]);
        }
      }
    );
  }, []);

  return (
    <div className="flexColCenter uploadWrapper">
      <div
        className="flexColCenter uploadZone"
        onClick={() => widgetRef.current?.open()}
      >
        <AiOutlineCloudUpload size={50} color="grey" />
        <span>Upload Image</span>
      </div>
      <div className="uploadedImages">
        {imageURLs.map((imageURL, index) => (
          <div className="uploadedImage" key={index}>
            <img src={imageURL} alt="" />
          </div>
        ))}
      </div>

      <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={imageURLs.length < 5}>
          Next
        </Button>
      </Group>
    </div>
  );
};

export default UploadImage;
