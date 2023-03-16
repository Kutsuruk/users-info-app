import 'bootstrap/dist/css/bootstrap.min.css'
import {Switch, Route, Redirect} from 'react-router-dom'

import Main from "./layouts/Main"
import Login from "./layouts/Login"
import Users from "./layouts/Users"
import Navbar from "./components/ui/Navbar"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {ProfessionProvider} from "./hooks/useProfessions"
import {QualityProvider} from "./hooks/useQualitites"
import AuthProvider from "./hooks/useAuth";

function App() {
    return(
        <>
            <AuthProvider>
                <Navbar />
                <QualityProvider>
                    <ProfessionProvider>
                        <Switch>
                            <Route exact path='/users/:userId?/:edit?' component={Users} />
                            <Route exact path='/login/:type?' component={Login} />
                            <Route exact path='/' component={Main} />
                            <Redirect to='/' />
                        </Switch>
                    </ProfessionProvider>
                </QualityProvider>
            </AuthProvider>
            <ToastContainer />
        </>
    )
}

export default App
