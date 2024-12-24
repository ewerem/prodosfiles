import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://proodoosfiles.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
