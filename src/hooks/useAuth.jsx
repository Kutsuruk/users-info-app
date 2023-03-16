import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import userService from "../services/user.service";
import {toast} from "react-toastify";
import {setTokens} from "../services/localStorage.service";

const httpAuth = axios.create()
const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null)
    const [currentUser, setCurrentUser] = useState({})


    async function signUp({ email, password }) {
        const API_TOKEN = 'AIzaSyDkCGPovXq2ADPPQnaXMbQL0yApVYH0Tj4'
        const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_TOKEN}`

        try {
            const { data } = await httpAuth.post(URL, { email, password, returnSecureToken: true })

            setTokens(data)
            await createUser({ _id: data.localId, email })
            console.log(data)
        } catch (error) {
            errorCatcher(error)
            const { code, message } = error.response.data.error
            console.log(code, error)
            if (code === 400) {
                if (message === 'EMAIL_EXIST') {
                    const errorObject ={ email: 'User with current email exist!' }
                    throw errorObject
                }
            }

        }
    }
    async function createUser(data) {
        try {
            const { content } = userService.create(data)
            setCurrentUser(content)
        } catch (error) {
            errorCatcher(error)
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
    }

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    return(
        <AuthContext.Provider value={{signUp, currentUser}}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider