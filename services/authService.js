import api from "./api";
import { ENDPOINTS } from "../constants/endpoints";

export const login = (email, password) =>
  api.post(ENDPOINTS.LOGIN, { email, password }).then(res => res.data);

export const register = (userData) =>
  api.post(ENDPOINTS.REGISTER, userData).then(res => res.data);