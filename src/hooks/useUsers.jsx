import React, {useContext, useEffect, useState} from "react";
import userService from "../services/user.service";
import {toast} from "react-toastify";
import {useAuth} from "./useAuth";

const UserContext = React.createContext()

export const useUsers = () => {
    return useContext(UserContext)
}

export const UserProvider = ({children}) => {
    const [users, setUsers] = useState([])
    const { currentUser } = useAuth()
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

    useEffect(() => {
        if (!isLoading) {
            const newUsers = [...users, ]
            const indexUser = newUsers.findIndex(user => user._id === currentUser._id )
            newUsers[indexUser] = currentUser
            setUsers(newUsers)
        }
    }, [currentUser])

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

    function getUserById(userId) {
        return users.find((user) => user._id === userId)
    }

    return(
        <UserContext.Provider
            value={{
                users,
                getUsers,
                getUserById,
        }}>
            { !isLoading ? children : 'Loading...' }
        </UserContext.Provider>
    )
}

