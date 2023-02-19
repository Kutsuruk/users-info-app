import User from "./User";
import PropTypes from "prop-types";

const UsersTable = ({users, handleDelete, userCrop, onSort}) => {
    return(
        <table className="table">
            <thead>
            <tr>
                <th onClick={() => onSort('name')} scope="col">Name</th>
                <th scope="col">Qualities</th>
                <th onClick={() => onSort('profession.name')} scope="col">Profession</th>
                <th onClick={() => onSort('completedMeetings')} scope="col">Meet/times</th>
                <th onClick={() => onSort('rate')} scope="col">Rating</th>
                <th onClick={() => onSort('bookmark')} scope="col">Bookmark</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <User users={users}
                  handleDelete={handleDelete}
                  userCrop={userCrop}
            />
            </tbody>
        </table>
    )
}

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired,
    userCrop: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
}

export default UsersTable