import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const registerUser = async (username: string, password: string, name: string, surname: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/register`, {
      username,
      password,
      name,
      surname
    });
    return response.data; // get a response from the server api
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to register user.',
    );
  }
};

const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password,
    });

    // handle userId
    localStorage.setItem('userId', response?.data?.userId || 0);

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to login user.',
    );
  }
};

export const authService = {
  registerUser,
  loginUser
};