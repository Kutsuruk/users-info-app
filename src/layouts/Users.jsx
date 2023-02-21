import {useParams} from "react-router-dom/cjs/react-router-dom";
import UsersListPage from "../components/page/UsersListPage/UsersListPage";
import UserPage from "../components/page/UserPage/UserPage";

const Users = () => {
    const params = useParams()
    const {userId} = params

    return(
        <>
            {
                userId ? <UserPage userId={userId} /> : <UsersListPage />
            }
        </>
    )
}

export default Users