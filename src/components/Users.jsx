import 'bootstrap/dist/css/bootstrap.min.css'
import api from '../api'
import {useState, useEffect} from "react"
import User from "./User"
import Pagination from "./Pagination"
import {paginate} from "../utils/paginate"
import GroupList from "./GroupList"
import SearchStatus from "./SearchStatus";

const Users = ({users, setUsers}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState([])
    const [selectedProf, setSelectedProf] = useState()

    const pageSize = 2
    const filteredUsers = selectedProf
        ? users.filter(user => user.profession === selectedProf)
        : users
    const count = filteredUsers.length
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

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf])

    return(
        <div className='d-flex'>
            {
                professions && (
                    <div className='d-flex flex-column flex-shrink-0 p-3'>
                        <GroupList items={professions}
                                   onItemSelect={handleProfessionSelect}
                                   selectedItem={selectedProf}
                        />
                        <button className='btn btn-secondary mt-2' onClick={clearFilter}>Clear filter</button>
                    </div>
                )
            }

            <div className='d-flex flex-column'>
                <SearchStatus users={filteredUsers} />
                {
                    filteredUsers.length > 0 && (
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

                <div className='d-flex justify-content-center'>
                    <Pagination itemsCount={count}
                                pageSize={pageSize}
                                onPageChange={handlePageChange}
                                currentPage={currentPage}
                    />
                </div>
            </div>
        </div>
    )
}

export default Users