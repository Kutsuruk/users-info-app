import PropTypes from "prop-types"
import UserCard from "../../ui/UserCard";
import QualitiesCard from "../../ui/QualitiesCard";
import MeetingsCard from "../../ui/MeetingsCard";
import Comments from "../../ui/Comments";
import {useUsers} from "../../../hooks/useUsers";
import {CommentsProvider} from "../../../hooks/useComments";

const UserPage = ({ userId }) => {
    const { getUserById } = useUsers()
    const user = getUserById(userId)

    if (user) {
        return(
            <div className='container'>
                <div className='row gutters-sm'>
                    <div className='col-md-4 mb-3'>
                        <UserCard user={user} />
                        <QualitiesCard data={user.qualities} />
                        <MeetingsCard value={user.completedMeetings} />
                    </div>
                    <div className='col-md-8'>
                        <CommentsProvider>
                            <Comments />
                        </CommentsProvider>
                    </div>
                </div>
            </div>
        )
    } else {
        return <h1>Loading...</h1>
    }
}

UserPage.propTypes = {
    userId: PropTypes.string.isRequired,
}

export default UserPage