import { useState, useEffect } from "react";
import * as animalService from "../services/animalService";

export function useAnimals() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAnimals = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await animalService.fetchAnimals();
      setAnimals(data);
    } catch (e) {
      setError("Error al cargar animales");
    } finally {
      setLoading(false);
    }
  };

  const addAnimal = async (spaceId, animal) => {
    await animalService.addAnimal(spaceId, animal);
    await loadAnimals();
  };

  const updateAnimal = async (animalId, data) => {
    await animalService.updateAnimal(animalId, data);
    await loadAnimals();
  };

  const deleteBreed = async (animalId, breedName) => {
    await animalService.deleteBreed(animalId, breedName);
    await loadAnimals();
  };

  useEffect(() => {
    loadAnimals();
  }, []);

  return { animals, loading, error, reload: loadAnimals, addAnimal, updateAnimal, deleteBreed };
}