import 'bootstrap/dist/css/bootstrap.min.css'
import Users from "./layout/Users"
import Navbar from "./components/Navbar"
import {Switch, Route, Redirect} from 'react-router-dom'

import Main from "./layout/Main";
import Login from "./layout/Login";

function App() {
    return(
        <>
            <Navbar />
            <Switch>
                <Route exact path='/' component={Main} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/users' component={Users} />

                <Redirect to='/' />
            </Switch>
        </>
    )
}

export default App
