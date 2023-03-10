import {useParams} from "react-router-dom/cjs/react-router-dom";
import UsersListPage from "../components/page/UsersListPage/UsersListPage";
import UserPage from "../components/page/UserPage/UserPage";
import EditUserPage from "../components/page/EditUserPage";
import {UserProvider} from "../hooks/useUsers";

const Users = () => {
    const params = useParams()
    const {userId, edit} = params

    return(
        <>
            <UserProvider>
                {
                    userId ? (
                        edit ? (
                            <EditUserPage />
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