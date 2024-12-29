import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://api.proodosfiles.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
