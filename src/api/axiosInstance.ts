import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL_Local,
  baseURL: import.meta.env.VITE_API_BASE_URL_ONLINE,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    const language = localStorage.getItem("i18nextLng") || "en";
    if (language) config.headers["lang"] = language;
    if (token) config.headers["authorization"] = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosInstance;