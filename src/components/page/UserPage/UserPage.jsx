import PropTypes from "prop-types"
import {useEffect, useState} from "react";
import api from "../../../api";
import QualitiesList from "../../ui/qualities/QualitiesList";
import {useHistory} from "react-router-dom";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState()
    const history = useHistory()

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data))
    }, [])

    const handleClick = () => {
        history.push(history.location.pathname + "/edit")
    }

    if (user) {
        return(
            <div>
                <h1>{user.name}</h1>
                <h2>Profession: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <p>Completed Meetings: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}</h2>
                <button type="button"
                        className="btn btn-primary m-1"
                        onClick={handleClick}
                >
                    Change
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