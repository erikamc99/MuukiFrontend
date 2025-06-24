import { createContext, useState, useContext, useEffect } from "react";
import { getUser, clearAuth } from "../utils/token";
import { useAuth as useAuthHook } from "../hooks/useAuth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const {
    login: authLogin,
    register: authRegister,
    logout: authLogout,
    loading,
    error,
  } = useAuthHook();

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const load = async () => {
      const u = await getUser();
      setUser(u);
      setLoadingUser(false);
    };
    load();
  }, []);

  const login = async (userOrEmail, password) => {
    console.log("UserContext login llamado");
    await authLogin(userOrEmail, password);
    const u = await getUser();
    setUser(u);
    return u;
  };

  const register = async (userData) => {
    await authRegister(userData);
    const u = await getUser();
    setUser(u);
    return u;
  };

  const logout = async () => {
    await authLogout();
    await clearAuth();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      loading: loading || loadingUser,
      error,
      login,
      register,
      logout,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);