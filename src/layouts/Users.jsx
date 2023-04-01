import {useParams} from "react-router-dom/cjs/react-router-dom";
import UsersListPage from "../components/page/UsersListPage/UsersListPage";
import UserPage from "../components/page/UserPage/UserPage";
import EditUserPage from "../components/page/EditUserPage";
import {UserProvider} from "../hooks/useUsers";
import {useAuth} from "../hooks/useAuth";
import {Redirect} from "react-router-dom";

const Users = () => {
    const params = useParams()
    const {userId, edit} = params
    const { currentUser } = useAuth()

    return(
        <>
            <UserProvider>
                {
                    userId ? (
                        edit ? (userId === currentUser._id ? (
                            <EditUserPage />
                            ) : (
                                <Redirect to={`/users/${currentUser._id}/edit`} />
                            )
                        ) : (
                            <UserPage userId={userId} />
                        )
                    ) : <UsersListPage />
                }
            </UserProvider>
        </>
    )
}

export default Users