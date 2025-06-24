import api from "./api";
import { ENDPOINTS } from "../constants/endpoints";

export const login = async (userOrEmail, password) => {
  try {
    const res = await api.post(ENDPOINTS.LOGIN, { userOrEmail, password });
    console.log("RESPUESTA DEL BACKEND", res);
    return res.data;
  } catch (e) {
    console.log("Error real de axios", e?.response?.status, e?.response?.data, e?.message);
    throw e;
  }
};

export const register = (userData) =>
  api.post(ENDPOINTS.REGISTER, userData).then(res => res.data);