import axios from "axios";
import { API_BASE } from "../constants/endpoints";
import { getToken } from "../utils/token";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 8000,
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;