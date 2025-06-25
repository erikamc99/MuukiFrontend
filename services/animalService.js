import api from "./api";

export const fetchAnimals = (spaceId) =>
  api.get(`/animals/${spaceId}`).then(res => res.data);

export const addAnimal = (spaceId, animal) =>
  api.post(`/animals/${spaceId}`, animal).then(res => res.data);