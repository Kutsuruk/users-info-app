import React, { useContext, useState, useEffect } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import userService from "../services/user.service"
import localStorageService, { setTokens } from "../services/localStorage.service"

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: 'AIzaSyDkCGPovXq2ADPPQnaXMbQL0yApVYH0Tj4',
    }
})

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState()
    const [error, setError] = useState(null)

    async function logIn({ email, password }) {
        try {
            const { data } = await httpAuth.post(
                `accounts:signInWithPassword`,
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            )
            setTokens(data)
            getUserData()
        } catch (error) {
            errorCatcher(error)
            const { code, message } = error.response.data.error
            console.log(code, message)
            if (code === 400) {
                switch (message) {
                    case "INVALID_PASSWORD":
                        throw new Error("Email or password not valid")
                    default:
                        throw new Error(
                            "Too many attempts. Попробуйте позже"
                        )
                }
            }
        }
    }

    function randomInt(min, max) {
        return  Math.floor(Math.random() * (max - min + 1) + min)
    }

    async function signUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post(`accounts:signUp`, {
                email,
                password,
                returnSecureToken: true
            })
            setTokens(data)

            await createUser({
                _id: data.localId,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                email,
                ...rest,
            })

        } catch (error) {
            errorCatcher(error)
            const { code, message } = error.response.data.error
            console.log(code, message)
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "User with this Email already exist"
                    }
                    throw errorObject
                }
            }
        }
    }
    async function createUser(data) {
        try {
            const { content } = await userService.create(data)
            console.log(content)
            setUser(content)
        } catch (error) {
            errorCatcher(error)
        }
    }
    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
    }

    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser()
            setUser(content)
        } catch (error) {
            errorCatcher(error)
        }
    }

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData()
        }
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    return (
        <AuthContext.Provider value={{ signUp, logIn, currentUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
