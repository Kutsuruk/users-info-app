import User from "./User";
import PropTypes from "prop-types";
import TableHeader from "./TableHeader";

const UsersTable = ({users, handleDelete, userCrop, onSort, selectedSort}) => {
    const column = {
        name: {iter: 'name', name: 'Имя'},
        qualities: {name: 'Качества'},
        profession: {iter: 'profession.name', name: 'Профессия'},
        completedMeetings: {iter: 'completedMeetings', name: 'Встретился, раз'},
        rate: {iter: 'rate', name: 'Оценка'},
        bookmark: {iter: 'bookmark', name: 'Избранное'},
        delete: {},
    }

    return(
        <table className="table">
            <TableHeader selectedSort={selectedSort}
                         onSort={onSort}
                         columns={column}
            />
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
    selectedSort: PropTypes.object.isRequired,
}

export default UsersTable