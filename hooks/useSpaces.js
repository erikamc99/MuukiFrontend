import { useState, useEffect } from "react";
import * as spaceService from "../services/spaceService";

export function useSpaces() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSpaces = async () => {
  setLoading(true);
  setError(null);
  try {
    const data = await spaceService.fetchSpaces();
    setSpaces(data);
  } catch (e) {
    console.log("Error cargando espacios:", e, e.response?.data);
    setError("Error al cargar espacios");
  } finally {
    setLoading(false);
  }
};

const addSpace = async (spaceData) => {
  try {
    const result = await spaceService.createSpace(spaceData);
    console.log("Respuesta al crear espacio:", result);
    await loadSpaces();
    return true;
  } catch (e) {
    console.log("Error creando espacio:", e, e.response?.data);
    return false;
  }
};


  useEffect(() => {
    loadSpaces();
  }, []);

  return {
    spaces,
    loading,
    error,
    reload: loadSpaces,
    addSpace,
  };
}