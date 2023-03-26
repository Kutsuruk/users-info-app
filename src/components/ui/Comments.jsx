import {orderBy} from "lodash";
import {useEffect, useState} from "react";
import api from "../../api";
import {useParams} from "react-router-dom";
import CommentsList, {AddCommentForm} from "../common/comments";
import {useComments} from "../../hooks/useComments";

const Comments = () => {
    const {userId} = useParams()
    const [comments, setComments] = useState([])
    const sortedComments = orderBy(comments, ["created_at"], ["desc"])
    const { createComment } = useComments()

    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data))
    }, [])

    const handleSubmitComments = (data) => {
        // console.log('add', comments)
        // api.comments
        //     .add({ ...data, pageId: userId })
        //     .then((data) => setComments([...comments, data]))
        createComment(data)
    }
    const handleRemoveComments = (id) => {
        console.log('removed', comments)
        api.comments.remove(id).then((id) => {
            setComments(comments.filter((x) => x._id !== id))
        })
    }

    return(
        <>
            <div className='card mb-2'>
                <div className='card-body'>
                    <AddCommentForm onSubmit={handleSubmitComments} />
                </div>
            </div>

            {sortedComments.length > 0 && (
                <div className='card mb-3'>
                    <div className='card-body'>
                        <h2>Comments</h2>
                        <hr />

                        <CommentsList comments={sortedComments}
                                      onRemove={handleRemoveComments}
                        />
                    </div>
                </div>
            )
            }

        </>
    )
}

export default Comments