import axios from 'axios';

const API = axios.create({
  baseURL: 'https://chatbotgemini-6kem.onrender.com/api', // Replace with your deployed backend URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
