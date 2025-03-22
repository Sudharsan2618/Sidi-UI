import axios from "axios";

const api = axios.create({
  baseURL: "https://lms-be-sqpa.onrender.comapi",
});

export default api;
