import { useState, useEffect } from "react";
import * as animalService from "../services/animalService";

export function useAnimals(spaceId) {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAnimals = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await animalService.fetchAnimals(spaceId);
      setAnimals(data);
    } catch (e) {
      setError("Error al cargar animales");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (spaceId) loadAnimals();
  }, [spaceId]);

  const addAnimal = async (animal) => {
    try {
      await animalService.addAnimal(spaceId, animal);
      await loadAnimals();
      return true;
    } catch {
      return false;
    }
  };

  return { animals, loading, error, reload: loadAnimals, addAnimal };
}