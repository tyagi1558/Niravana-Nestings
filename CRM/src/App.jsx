import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDetailContext from "./context/UserDetailContext";
import Login from "./pages/login/login"; // Import the Login component
import Website from "./pages/Website";
import Profile from "./pages/profile/profile";
import ContactDetails from "./pages/contactDetails/contactDetails";
import BookVisit from "./pages/bookVisit/bookVisit";
import Header from "../src/components/Header/Header";


const App = () => {
  const queryClient = new QueryClient();

  return (
    
    <QueryClientProvider client={queryClient}>
      
      <BrowserRouter>
      

        <Routes>
        <Route path="/" element={<Login />} /> {/* Add the Login route */}

          <Route path="/Home" element={<Website />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contactDetails" element={<ContactDetails />} />
          <Route path="/bookVisit" element={<BookVisit />} />

        </Routes>
      </BrowserRouter>
      <ToastContainer />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
