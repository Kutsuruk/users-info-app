import 'bootstrap/dist/css/bootstrap.min.css'
import api from '../api'
import {useState} from "react"
const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    console.log(users)
    const handleDelete = (id) => {
        const newUsers = users.filter((user) => user._id !== id)
        setUsers(newUsers)
    }

    const renderPhrase = () => {
        if (users.length > 0) {
            return `Ready to hang-out with you ${users.length} users.`
        } else {
            return 'Nobody wants to hang-out with you.'
        }
    }

    return(
        <div>
            <span className={'badge bg-'+(users.length > 0 ? 'primary' : 'danger')}>
                {renderPhrase()}
            </span>

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
                        </tr>
                        </thead>
                        <tbody>
                        {
                            users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.qualities.map((quality) => (
                                        <span className={'badge m-1 bg-'+quality.color} key={quality._id}>
                                    {quality.name}
                                </span>
                                    ))}</td>
                                    <td>{user.profession.name}</td>
                                    <td>{user.completedMeetings}</td>
                                    <td>{user.rate}</td>
                                    <td>
                                        <button
                                            onClick={ () => handleDelete(user._id) }
                                            type="button"
                                            className="btn btn-danger"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-x-circle-fill"
                                                viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                )
            }

        </div>
    )
}

export default Users