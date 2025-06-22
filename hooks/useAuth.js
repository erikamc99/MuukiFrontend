import { useState } from "react";
import * as authService from "../services/authService";
import { saveAuth, clearAuth, getUser } from "../utils/token";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const { token, user } = await authService.login(email, password);
      await saveAuth(token, user);
      setUser(user);
      return user;
    } catch (e) {
      setError("Credenciales incorrectas");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError("");
    try {
      const { token, user } = await authService.register(userData);
      await saveAuth(token, user);
      setUser(user);
      return user;
    } catch (e) {
      setError("Error en registro");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await clearAuth();
    setUser(null);
  };

  const loadUser = async () => {
    const u = await getUser();
    setUser(u);
    return u;
  };

  return {
    user, loading, error,
    login,
    register,
    logout,
    loadUser,
  };
}