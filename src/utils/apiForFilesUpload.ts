import axios from "axios";

const apiForFilesUpload = axios.create({
  baseURL: "http://api.proodosfiles.com/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

//dynamically set the Authorization header
apiForFilesUpload.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") ?? "";
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiForFilesUpload;
