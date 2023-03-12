import 'bootstrap/dist/css/bootstrap.min.css'
import {Switch, Route, Redirect} from 'react-router-dom'

import Main from "./layouts/Main"
import Login from "./layouts/Login"
import Users from "./layouts/Users"
import Navbar from "./components/ui/Navbar"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {ProfessionProvider} from "./hooks/useProfessions";

function App() {
    return(
        <>
            <Navbar />
            <Switch>
                <ProfessionProvider>
                    <Route exact path='/users/:userId?/:edit?' component={Users} />
                    <Route exact path='/login/:type?' component={Login} />
                </ProfessionProvider>

                <Route exact path='/' component={Main} />

                <Redirect to='/' />
            </Switch>
            <ToastContainer />
        </>
    )
}

export default App
