import axios from "axios";

const api = axios.create({
  baseURL: "https://sidi-be.onrender.com/api",
});

export default api;
