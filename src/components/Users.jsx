import 'bootstrap/dist/css/bootstrap.min.css'
import api from '../api'
import {useState} from "react"
import SearchStatus from "./SearchStatus";
import User from "./User";
import Pagination from "./Pagination";
import {paginate} from "../utils/paginate";
const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const [currentPage, setCurrentPage] = useState(1)

    const count = users.length
    const pageSize = 4

    const userCrop = paginate(users, currentPage, pageSize)

    const handleDelete = (id) => {
        const newUsers = users.filter((user) => user._id !== id)
        setUsers(newUsers)
    }
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
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
                            <User users={users}
                                  handleDelete={handleDelete}
                                  userCrop={userCrop}
                            />
                        </tbody>
                    </table>
                )
            }

            <Pagination itemsCount={count}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        currentPage={currentPage}
            />
        </div>
    )
}

export default Users