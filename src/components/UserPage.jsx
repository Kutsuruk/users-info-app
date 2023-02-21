import PropTypes from "prop-types"

const UserPage = ({ userId }) => {
    return(
        <>
            <h1>UserPage {userId}</h1>
        </>
    )
}

UserPage.propTypes = {
    userId: PropTypes.string.isRequired,
}

export default UserPage