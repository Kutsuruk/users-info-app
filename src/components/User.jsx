import Qualities from "./Qualities";
import Bookmark from "./Bookmark";
const User = ({users, handleDelete}) => {
    return(
        <>
            {
                users.map((user) => (
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>
                            <Qualities user={user} />
                        </td>
                        <td>{user.profession.name}</td>
                        <td>{user.completedMeetings}</td>
                        <td>{user.rate}</td>
                        <td>
                            <Bookmark />
                        </td>
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
        </>
    )
}

export default User