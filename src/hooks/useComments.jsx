import React, {useContext, useEffect, useState} from "react"
import {toast} from "react-toastify"
import {useParams} from "react-router-dom"
import {useAuth} from "./useAuth"
import { nanoid } from 'nanoid'
import commentService from "../services/comment.service";

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
        getComments()
    }, [userId])

    async function createComment(data) {
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUser._id,
        }

        try {
            const { content } = await commentService.createComment(comment)
            setComments(prevState => [...prevState, content])
        } catch (error) {
            errorCatcher(error)
        }
    }

    async function getComments() {
        try {
            const { content } = await commentService.getComments(userId)
            setComments(content)
        } catch (error) {
            errorCatcher(error)
        }  finally {
            setIsLoading(false)
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
        setIsLoading(false)
    }

    async function removeComment(id) {
        try {
            const { content } = await  commentService.removeComment(id)
            if (content === null) {
                setComments(prevState => prevState.filter((comment) => comment._id !== id))
            }
        } catch (error) {
            errorCatcher(error)
        }
    }

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    return(
        <CommentsContext.Provider
            value={{
                comments,
                createComment,
                removeComment
        }}>
            { children }
        </CommentsContext.Provider>
    )
}