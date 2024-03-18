import React, { useState } from "react";
import { Modal, Button, TextInput } from "@mantine/core";
import { useMutation } from "react-query";
import { bookVisit } from "../../utils/api.js";
import { toast } from "react-toastify";
import "./BookingModal.css";

const BookingModal = ({ opened, setOpened, email, propertyId }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState(null);

  const handleBookingSuccess = () => {
    toast.success("You have booked your visit", {
      position: "bottom-right",
    });
    setOpened(false); // Close the modal upon successful booking
  };

  const handleCancel = () => {
    setOpened(false); // Close the modal upon cancellation
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(name, date, phone, city, propertyId),
    onSuccess: () => handleBookingSuccess(),
    onError: (error) => toast.error(error.message),
  });

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)} // Close the modal when clicking outside
      centered
    >
      <div className="booking-modal">
        <div className="booking-modal-title">Book Your Visit</div>
        <div className="input-container">
          <div className="input-label">Name</div>
          <TextInput
            className="input-field"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="input-container">
          <div className="input-label">Phone</div>
          <TextInput
            className="input-field"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <div className="input-container">
          <div className="input-label">Date</div>
          <input
            className="date-input"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div className="input-container">
          <div className="input-label">City</div>
          <TextInput
            className="input-field"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </div>
        <div className="button-container">
          <Button
            className="submit-button"
            disabled={!name || !phone || !date || isLoading}
            onClick={() => mutate()}
          >
            Book Visit
          </Button>
          <Button
            className="cancel-button"
            variant="light"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BookingModal;
