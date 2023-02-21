import PropTypes from "prop-types"
import {useEffect, useState} from "react";
import api from "../api";
import QualitiesList from "./QualitiesList";
import {useHistory} from "react-router-dom";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState()

    const history = useHistory()

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data))
    }, [])

    if (user) {
        return(
            <div>
                <h1>{user.name}</h1>
                <h2>Profession: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <p>Completed Meetings: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}</h2>
                <button type="button"
                        className="btn btn-primary"
                        onClick={() => history.replace('/users')}
                >
                    All Users
                </button>
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