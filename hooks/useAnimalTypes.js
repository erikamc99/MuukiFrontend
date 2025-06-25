import { useState, useEffect } from "react";
import { fetchAnimalTypes } from "../services/constantsService";

export function useAnimalTypes() {
  const [animalTypes, setAnimalTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnimalTypes()
      .then((data) => setAnimalTypes(data))
      .finally(() => setLoading(false));
  }, []);

  return { animalTypes, loading };
}