import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth API calls
export const register = (userData) => API.post("/auth/register", userData);
export const login = (userData) => API.post("/auth/login", userData);
export const getProfile = () => API.get("/auth/profile");
export const updateProfile = (userData) => API.put("/auth/profile", userData);

// Products API calls
export const getProducts = () => API.get("/products");
export const getProductById = (id) => API.get(`/products/${id}`);

// Orders API calls
export const createOrder = (orderData) => API.post("/orders", orderData);
export const getOrderById = (id) => API.get(`/orders/${id}`);
export const getMyOrders = () => API.get("/orders/myorders");

export default API;
