import { createContext, useContext, useState, useEffect } from "react";
import { useSpaces } from "../hooks/useSpaces";

const SpaceContext = createContext();

export const SpaceProvider = ({ children }) => {
  const { spaces, loading, error, reload, addSpace } = useSpaces();
  const [selectedSpaceId, setselectedSpaceId] = useState(null);

  useEffect(() => {
    if (!selectedSpaceId && spaces.length > 0) {
      setselectedSpaceId(spaces[0].id || spaces[0]._id);
    }
  }, [spaces]);

  const selectedSpace = spaces.find(s => (s.id || s._id) === selectedSpaceId) || null;

  return (
    <SpaceContext.Provider
      value={{
        spaces,
        loading,
        error,
        selectedSpaceId,
        setselectedSpaceId,
        selectedSpace,
        reloadSpaces: reload,
        addSpace,
      }}
    >
      {children}
    </SpaceContext.Provider>
  );
};

export const useSpace = () => useContext(SpaceContext);