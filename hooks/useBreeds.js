import { useState, useEffect } from "react";
import { fetchBreeds } from "../services/constantsService";

export function useBreeds() {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBreeds()
      .then((data) => setBreeds(data))
      .finally(() => setLoading(false));
  }, []);

  return { breeds, loading };
}