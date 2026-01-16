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
export const getProducts = (params) => API.get("/products", { params });
export const getProductById = (id) => API.get(`/products/${id}`);
export const getFeaturedProducts = () => API.get("/products/featured");
export const getCategories = () => API.get("/products/categories");
export const createProduct = (productData) =>
  API.post("/products", productData);
export const updateProduct = (id, productData) =>
  API.put(`/products/${id}`, productData);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const createReview = (id, reviewData) =>
  API.post(`/products/${id}/reviews`, reviewData);

// Orders API calls
export const createOrder = (orderData) => API.post("/orders", orderData);
export const getOrderById = (id) => API.get(`/orders/${id}`);
export const getMyOrders = () => API.get("/orders/myorders");
export const getAllOrders = () => API.get("/orders");
export const updateOrderToPaid = (id) => API.put(`/orders/${id}/pay`);
export const updateOrderToDelivered = (id) => API.put(`/orders/${id}/deliver`);

export default API;
