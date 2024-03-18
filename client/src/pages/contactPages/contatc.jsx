import { useRef, useState } from "react";
import "./contact.css"; // Import your CSS file
import React from "react";
import { Modal, Button, TextInput } from "@mantine/core";
import { useMutation } from "react-query";
import { ContactDeltails } from "../../utils/api.js";
import { toast } from "react-toastify";

const Contact = () => {
  const [message, setMessage] = useState('');
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setMail] = useState(null);

  const handleBookingSuccess = () => {
    toast.success("We will get in touch with you as soon as possible!", {
      position: "bottom-right",
    });
  };


  const { mutate, isLoading } = useMutation({
    mutationFn: () => ContactDeltails(name, phone, email,subject, message),
    onSuccess: () => handleBookingSuccess(),
    onError: (error) => toast.error(error.message),
  });


  return (
    <div className="wrapper1">
    <div className="flexColCenter paddings innerWidth properties-container">
    <section className="py-16">
      <div className="contact-container max-w-7xl mx-auto px-4 lg:px-8 xl:max-w-full lg:flex lg:items-center lg:gap-4">
        <div className="mx-auto lg:w-6/12 lg:text-center">
          <h2 className="contact-heading text-base font-semibold leading-7 text-myblue">Contact</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Contact us
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 lg:mx-auto lg:max-w-[50ch]">
            We're here to help! If you have any questions or need assistance, feel free to
            reach out to us. Our team is always ready to assist you.
          </p>
        </div>
        <div className="mx-auto mt-4 lg:w-6/12 lg:flex-1 lg:mt-0">
  <div className="input-container">
    <div className="input-label">Name</div>
    <TextInput
      className="input-field"
      placeholder="John Doe"
      value={name}
      onChange={(event) => setName(event.target.value)}
    />
  </div>
  <div className="input-container">
    <div className="input-label">Phone</div>
    <TextInput
      className="input-field"
      placeholder="123-456-7890"
      value={phone}
      onChange={(event) => setPhone(event.target.value)}
    />
  </div>
  <div className="input-container">
    <div className="input-label">Mail</div>
    <TextInput
      className="input-field"
      placeholder="name@example.com"
      value={email}
      onChange={(event) => setMail(event.target.value)}
    />
  </div>
  <div className="input-container">
    <div className="input-label">Subject</div>
    <TextInput
      className="input-field"
      placeholder="Let us know how we can help you"
      value={subject}
      onChange={(event) => setSubject(event.target.value)}
    />
  </div>
  <div className="input-container">
    <div className="input-label">Message</div>
    <TextInput
      className="input-field"
      placeholder="Leave a comment..."
      value={message}
      onChange={(event) => setMessage(event.target.value)}
    />
  </div>
  <button 
    disabled={!name || !phone || !subject || isLoading}
    onClick={() => mutate()}
    className="submit-button flex justify-center items-center gap-2 rounded-md bg-myblue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    Send message
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <path fill="currentColor" d="M3 20v-6l8-2l-8-2V4l19 8l-19 8Z"/>
    </svg>
  </button>
 
</div>
</div>
      
    </section>
    </div>
    </div>
  );
};

export default Contact;
