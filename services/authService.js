import api from "./api";
import { ENDPOINTS } from "../constants/endpoints";

export const login = (userOrEmail, password) =>
  api.post(ENDPOINTS.LOGIN, { userOrEmail, password }).then(res => res.data);

export const register = (userData) =>
  api.post(ENDPOINTS.REGISTER, userData).then(res => res.data);