import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.proodosfiles.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
