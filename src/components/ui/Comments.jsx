import {orderBy} from "lodash";
import CommentsList, {AddCommentForm} from "../common/comments";
import {useComments} from "../../hooks/useComments";
import commentService from "../../services/comment.service";

const Comments = () => {
    const { createComment, comments, removeComment } = useComments()
    const sortedComments = orderBy(comments, ["created_at"], ["desc"])

    const handleSubmitComments = (data) => {
        // console.log('add', comments)
        // api.comments
        //     .add({ ...data, pageId: userId })
        //     .then((data) => setComments([...comments, data]))
        createComment(data)
    }
    const handleRemoveComments = (id) => {
        removeComment(id)
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