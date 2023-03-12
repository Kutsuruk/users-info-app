import React, {useContext, useEffect, useState} from "react";
import userService from "../services/user.service";
import {toast} from "react-toastify";


const UserContext = React.createContext()

export const useUsers = () => {
    return useContext(UserContext)
}

export const UserProvider = ({children}) => {
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const getUsers = async () => {
        try {
            const {content} = await userService.get()
            setUsers(content)
            setIsLoading(false)
        } catch (error) {
            errorCatcher(error)
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
        setIsLoading(false)
    }

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    return(
        <UserContext.Provider
            value={{
                users,
                getUsers,
        }}>
            { !isLoading ? children : 'Loading...' }
        </UserContext.Provider>
    )
}

