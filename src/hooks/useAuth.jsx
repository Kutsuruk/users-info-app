import React, {useContext} from "react";

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    return(
        <AuthContext.Provider value=''>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider