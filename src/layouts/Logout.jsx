import {useAuth} from "../hooks/useAuth";
import {useEffect} from "react";

const Logout = () => {
    const {logout} = useAuth()

    useEffect(() => {
        logout()
    }, [])

    return(<h1>Loading...</h1>)
}

export default Logout