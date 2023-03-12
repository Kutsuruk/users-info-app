import React, {useContext, useEffect, useState} from "react"
import professionService from "../services/profession.service"
import {toast} from "react-toastify"

const ProfessionContext = React.createContext()

export const useProfessions = () => {
    return useContext(ProfessionContext)
}

export const ProfessionProvider = ({children}) => {
    const [professions, setProfessions] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const getProfessionsList = async () => {
        try {
            const { content } = await professionService.get()
            setProfessions(content)
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

    function getProfession(id) {
        return professions.find((profession) => profession._id === id)
    }

    useEffect(() => {
        getProfessionsList()
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    return(
        <ProfessionContext.Provider
            value={{
                isLoading,
                professions,
                getProfessionsList,
                getProfession
            }}>
            {/*{ !isLoading ? children : 'Loading...' }*/}
            {children}
        </ProfessionContext.Provider>
    )
}