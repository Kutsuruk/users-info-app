import React, {useContext} from "react";


const UserContext = React.createContext()

export const useUsers = () => {
    return useContext(UserContext)
}

export const UserProvider = ({children}) => {

    return(
        <UserContext.Provider value=''>
            {children}
        </UserContext.Provider>
    )
}

