import axios from "axios";

const api = axios.create({
  baseURL: "https://lms-be-sqpa.onrender.com/api",
});

export default api;
