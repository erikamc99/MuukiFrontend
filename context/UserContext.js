import { createContext, useState, useContext, useEffect } from "react";
import { getUser, clearAuth } from "../utils/token";
import { useAuth } from "../hooks/useAuth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user: authUser, loadUser, logout: authLogout } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const u = await getUser();
      setUser(u);
      setLoading(false);
    };
    init();
  }, []);

  const logout = async () => {
    await authLogout();
    await clearAuth();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);