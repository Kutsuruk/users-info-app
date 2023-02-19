import 'bootstrap/dist/css/bootstrap.min.css'
import api from '../api'
import {useState, useEffect} from "react"
import User from "./User"
import Pagination from "./Pagination"
import {paginate} from "../utils/paginate"
import GroupList from "./GroupList"

const Users = ({users, setUsers}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState([])
    const [selectedProf, setSelectedProf] = useState()

    const count = users.length
    const pageSize = 4
    const filteredUsers = selectedProf
        ? users.filter(user => user.profession === selectedProf)
        : users
    const userCrop = paginate(filteredUsers, currentPage, pageSize)

    const handleDelete = (id) => {
        const newUsers = users.filter((user) => user._id !== id)
        setUsers(newUsers)
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const handleProfessionSelect = (item) => {
        setSelectedProf(item)
    }

    const clearFilter = () => {
        setSelectedProf(undefined)
    }

    useEffect(() => {
        api.professions.fetchAll()
            .then((data) =>
                setProfessions(data)
            )
    }, [])

    return(
        <div>
            {professions && (
                <>
                    <GroupList items={professions}
                               onItemSelect={handleProfessionSelect}
                               selectedItem={selectedProf}
                    />
                    <button className='btn btn-secondary mt-2' onClick={clearFilter}>Clear filter</button>
                </>
            )}

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
                </table>)
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