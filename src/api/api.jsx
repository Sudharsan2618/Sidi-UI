import axios from "axios";

const api = axios.create({
  baseURL: "https://lms-be-do05.onrender.com/api",
});

export default api;
