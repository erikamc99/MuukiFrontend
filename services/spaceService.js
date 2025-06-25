import api from "./api";

export const fetchSpaces = () =>
  api.get("/Space").then(res => res.data);
export const createSpace = (data) =>
  api.post("/Space", data).then(res => res.data);
export const fetchSpace = (id) =>
  api.get(`/Space/${id}`).then(res => res.data);