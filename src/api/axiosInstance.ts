import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL_Local,
  baseURL: import.meta.env.VITE_API_BASE_URL_ONLINE,
  withCredentials: true,
});
let accessToken: string | null = null;

export const setAuthToken = (token: string) => {
  accessToken = token ?? "";
};

export const clearAuthToken = () => {
  accessToken = null;
};

axiosInstance.interceptors.request.use(
  (config) => {
    console.log(accessToken);
    const language = localStorage.getItem("i18nextLng") || "en";
    if (language) config.headers["lang"] = language;
    if (accessToken) config.headers["authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosInstance;
