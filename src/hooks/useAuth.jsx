import React, {useContext} from "react";
import axios from "axios";

const httpAuth = axios.create()
const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    async function signUp({ email, password }){
        const KEY = 'AIzaSyDkCGPovXq2ADPPQnaXMbQL0yApVYH0Tj4'
        const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${KEY}`

        const { data } = await httpAuth.post(URL, { email, password, returnSecureToken: true })
        console.log(data)
    }

    return(
        <AuthContext.Provider value={{signUp}}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider