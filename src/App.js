import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "./components/Navbar"
import {Switch, Route, Redirect} from 'react-router-dom'

import Main from "./layouts/Main"
import Login from "./layouts/Login"
import Users from "./layouts/Users"

function App() {
    return(
        <>
            <Navbar />
            <Switch>
                <Route exact path='/' component={Main} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/users/:userId?' component={Users} />

                <Redirect to='/' />
            </Switch>
        </>
    )
}

export default App
