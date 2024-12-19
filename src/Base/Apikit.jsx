import axios from "axios";

let Apikit = axios.create({
  baseURL: "https://proodoosfiles.onrender.com/api",

  headers: {
    "Content-Type": "application/json"
  },
});

export default Apikit;
