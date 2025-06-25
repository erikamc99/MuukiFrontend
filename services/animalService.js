import api from "./api";

export const fetchAnimals = (spaceId) =>
  api.get(`/animals`).then(res => res.data);

export const addAnimal = (spaceId, animal) =>
  api.post(`/animals/${spaceId}`, animal).then(res => res.data);

export const updateAnimal = (animalId, data) =>
  api.put(`/animals/${animalId}`, data).then(res => res.data);

export const deleteBreed = (animalId, breedName) =>
  api.delete(`/animals/${animalId}/breed/${breedName}`).then(res => res.data);