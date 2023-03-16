import React, {useContext, useEffect, useState} from "react"
import qualityService from "../services/quality.service"
import {toast} from "react-toastify"

const QualitiesContext = React.createContext()

export const useQualities = () => {
    return useContext(QualitiesContext)
}

export const QualityProvider = ({children}) => {
    const [qualities, setQualities] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const getQualities = async () => {
        try {
            const {content} = await qualityService.get()
            setQualities(content)
            setIsLoading(false)
        } catch (error) {
            errorCatcher(error)
        }
    }

    const getQuality = (id) => {
        return qualities.find((quality) => quality._id === id)
    }

    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
        setIsLoading(false)
    }

    useEffect(() => {
        getQualities()
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    return(
        <QualitiesContext.Provider
            value={{
                qualities,
                getQuality,
                isLoading
            }}>
            { children }
        </QualitiesContext.Provider>
    )
}