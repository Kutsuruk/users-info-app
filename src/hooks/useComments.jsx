import React, {useContext, useEffect, useState} from "react"
import {toast} from "react-toastify"
import {useParams} from "react-router-dom"
import {useAuth} from "./useAuth"
import { nanoid } from 'nanoid'

const CommentsContext = React.createContext()

export const useComments = () => {
    return useContext(CommentsContext)
}

export const CommentsProvider = ({ children }) => {
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const { userId } = useParams()
    const { currentUser } = useAuth()

    useEffect(() => {
        setComments(null)
    }, [])

    async function createComment(data) {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUser._id,
        }

        console.log(comment)
    }

    return(
        <CommentsContext.Provider
            value={{
                comments,
                createComment,
        }}>
            { children }
        </CommentsContext.Provider>
    )
}