import { createContext } from "react";
import { UserType } from "../types/user.types";

type AuthContextType = {
    isAuthenticated : boolean
    isLoading : boolean
    user : UserType | undefined
}

const AuthContextValue = {
    isAuthenticated : false,
    isLoading : false,
    user : undefined,
}

const AuthContext = createContext<AuthContextType>(AuthContextValue)

export default AuthContext

