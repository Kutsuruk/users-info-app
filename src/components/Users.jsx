import 'bootstrap/dist/css/bootstrap.min.css'
import api from '../api'
import {useState, useEffect} from "react"
import Pagination from "./Pagination"
import {paginate} from "../utils/paginate"
import GroupList from "./GroupList"
import SearchStatus from "./SearchStatus"
import UsersTable from "./UsersTable"
import _ from 'lodash'

const Users = ({users, setUsers}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState([])
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({iter: 'name', order: 'asc'})

    const pageSize = 8
    const filteredUsers = selectedProf
        ? users.filter(user => user.profession === selectedProf)
        : users
    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order])
    const userCrop = paginate(sortedUsers, currentPage, pageSize)

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

    const handleSort = (item) => {
        setSortBy(item)
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
                        <UsersTable users={users}
                                    userCrop={userCrop}
                                    handleDelete={handleDelete}
                                    onSort={handleSort}
                                    selectedSort={sortBy}
                        />
                    )
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