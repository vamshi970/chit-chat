import { ReactNode, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useUserQuery } from "../hooks/user";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const { getItem } = useLocalStorage();
  const token = getItem("accessToken");

  const { isError, isLoading, isSuccess, user } = useUserQuery();

  useEffect(() => {
    if (!token || !token.token) {
      setAuthenticated(false);
    } else if (isSuccess && user) {
      setAuthenticated(true);
    } else if (isError) {
      setAuthenticated(false);
    }
  }, [user, isError, isSuccess]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
