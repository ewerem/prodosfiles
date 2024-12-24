import axios from "axios";

const apiWithToken = axios.create({
  baseURL: "https://proodoosfiles.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

//dynamically set the Authorization header
apiWithToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiWithToken;
