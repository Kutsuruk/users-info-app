import 'bootstrap/dist/css/bootstrap.min.css'
import {Switch, Route, Redirect} from 'react-router-dom'

import Main from "./layouts/Main"
import Login from "./layouts/Login"
import Users from "./layouts/Users"
import Navbar from "./components/ui/Navbar"

function App() {
    return(
        <>
            <Navbar />
            <Switch>
                <Route exact path='/' component={Main} />
                <Route exact path='/login/:type?' component={Login} />
                <Route exact path='/users/:userId?/:edit?' component={Users} />

                <Redirect to='/' />
            </Switch>
        </>
    )
}

export default App
