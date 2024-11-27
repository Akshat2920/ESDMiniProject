import axios from 'axios';
import { toast } from 'react-toastify';

/**
 * Validates the JWT token by calling the backend API.
 * @param {string} token - JWT token to validate.
 * @returns {Promise<boolean>} - Resolves to true if the token is valid, false otherwise.
 */
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

/**
 * Fetches all students data from the API.
 * @returns {Promise<Array>} - Resolves to the array of students.
 */
export const fetchStudentsData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authorization token is missing.');
    }
    //const isValidToken = await validateToken(token);
    //if (!isValidToken) {
    //  throw new Error('Invalid token. Please log in again.');
    //}
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