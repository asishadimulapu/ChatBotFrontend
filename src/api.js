import axios from 'axios';

const API = axios.create({
  baseURL: 'https://chatbotgemini-6kem.onrender.com/api', // Replace with your deployed backend URL
});

// Request interceptor to add Authorization header with token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Forgot Password API Call
export const forgotPassword = async (email) => {
  try {
    const response = await API.post('/auth/forgot-password', { email });
    return response.data; // Handle success response
  } catch (error) {
    throw error; // Handle error
  }
};

export default API;
