import React, {useContext, useEffect, useState} from "react"
import {toast} from "react-toastify"

const CommentsContext = React.createContext()

export const useComments = () => {
    return useContext(CommentsContext)
}

export const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setComments(null)
    }, [])

    return(
        <CommentsContext.Provider
            value={{
                comments,
        }}>
            { children }
        </CommentsContext.Provider>
    )
}