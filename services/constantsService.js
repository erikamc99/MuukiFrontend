import api from "./api";

export const fetchSpaceTypes = () =>
  api.get("/constants/space-types").then(res => res.data);

export const fetchAnimalTypes = () =>
  api.get("/constants/animal-types").then(res => res.data);

export const fetchBreeds = () =>
  api.get("/constants/breeds").then(res => res.data);