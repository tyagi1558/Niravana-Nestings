import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/allresd", {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data.residencies;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const getAllContactDetails = async () => {
  try {
    const response = await api.post("/contact/allContacts", {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};



export const getAllBookVisit = async () => {
  try {
    const response = await api.post("/bookVisit/allBookings", {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};




export const createUser = async (email, token) => {
  try {
    await api.post(
      `/user/register`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};



export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/user/login", { email, password });
    return response.data; // Assuming your API returns user data upon successful login
  } catch (error) {
    toast.error("Failed to login. Please try again.");
    throw error;
  }
};



export const logoutUser = async () => {
  try {
    // You may need to send a request to invalidate the user's session or token
    // This depends on your backend implementation
    // For example:
    // const response = await api.post("/user/logout");
    // console.log("Logout successful", response);
    // Perform any client-side cleanup if necessary
    // Redirect the user to the login page after logout
  } catch (error) {
    toast.error("Failed to logout. Please try again.");
    throw error;
  }
};

// for update the book  Visit 
export const updateBookVisit = async (id, editedValues) => {
  try {
    console.log("id:", id, "editedValues:", editedValues);

    const { followUp, reason, response, nextFollowUp, calendarCondition, updatedAt } = editedValues;

    // Create the JSON body
    const requestBody = {
      id,
      data: {
        followUp,
        reason,
        response,
        nextFollowUp,
        calendarCondition,
        updatedAt
      }
    };

    console.log("requestBody:", requestBody);

    // Make sure you have access to the `api` object

    const result = await api.put(
      `/bookVisit/edit/${id}`, // Pass the ID in the URL query parameters
      requestBody,
     
    );

    return result.data; // Return the response data if needed
  } catch (e) {
    throw e;
  }
};

