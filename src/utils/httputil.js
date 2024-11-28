import axios from 'axios';
import { toast } from 'react-toastify';

export const validateToken = async (token) => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/auth/validate', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status === 200 && response.data;
  } catch (error) {
    toast.error('Invalid session. Please log in again.', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    return false;
  }
};

export const fetchStudentsData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authorization token is missing.');
    }
    try {
      const response = await axios.get('http://localhost:8080/api/v1/allstudents', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.status === 401
          ? 'Unauthorized. Please log in again.'
          : 'Failed to fetch student data. Please try again.';
      toast.error(message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      throw new Error(message);
    }
  };

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
      email,
      password,
    });

    if (response.status === 200 && response.data) {
      return response.data; // Return the response data on success
    } else {
      throw new Error('Unexpected response from server');
    }
  } catch (error) {
    // Extract backend error message if available
    const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
    throw new Error(errorMessage);
  }
};