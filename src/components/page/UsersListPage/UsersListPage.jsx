import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { paginate } from "../../../utils/paginate"
import Pagination from "../../common/Pagination"
import GroupList from "../../common/GroupList"
import SearchStatus from "../../ui/SearchStatus"
import UserTable from "../../ui/UsersTable"
import _ from "lodash"
import {useUsers} from "../../../hooks/useUsers";
import {useProfessions} from "../../../hooks/useProfessions";
const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" })
    const [searchQuery, setSearchQuery] = useState('')

    const pageSize = 4
    const {users, getUsers} = useUsers()
    const { professions, isLoading } = useProfessions()

    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId))
        console.log(userId)
    }
    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark }
            }
            return user
        })
        // setUsers(newArray)
        console.log(newArray)
    }

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf, searchQuery])

    const handleProfessionSelect = (item) => {
        if (searchQuery !== '') {
            setSearchQuery('')
        }
        setSelectedProf(item)
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }
    const handleSort = (item) => {
        setSortBy(item)
    }

    const handleSearchQuery = (e) => {
        setSelectedProf(null)
        setSearchQuery(e.target.value)
    }

    if (users) {
        const filteredUsers = searchQuery
            ? users.filter((user) => user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
            : selectedProf
            ? users.filter(
                (user) =>
                    JSON.stringify(user.profession) ===
                    JSON.stringify(selectedProf)
            )
            : users


        const count = filteredUsers.length
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
        const usersCrop = paginate(sortedUsers, currentPage, pageSize)
        const clearFilter = () => {
            setSelectedProf()
        }

        return (
            <div className="d-flex">
                {professions && !isLoading && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <input type="text"
                           name='searchQuery'
                           placeholder='Search...'
                           onChange={handleSearchQuery}
                    />

                    {count > 0 && (
                        <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
    return "Loading..."
}

UsersListPage.propTypes = {
    users: PropTypes.array
}

export default UsersListPage
