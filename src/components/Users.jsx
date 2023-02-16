import 'bootstrap/dist/css/bootstrap.min.css'
import api from '../api'
import {useState} from "react"
import SearchStatus from "./SearchStatus";
import User from "./User";
const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (id) => {
        const newUsers = users.filter((user) => user._id !== id)
        setUsers(newUsers)
    }

    return(
        <div>
            <SearchStatus users={users} />

            {
                users.length > 0 && (
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Qualities</th>
                            <th scope="col">Profession</th>
                            <th scope="col">Meet/times</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Bookmark</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            <User users={users} handleDelete={handleDelete} />
                        </tbody>
                    </table>
                )
            }

        </div>
    )
}

export default Users