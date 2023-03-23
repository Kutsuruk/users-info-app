import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import NavProfile from "./NavProfile";

const Navbar = () => {
    const { currentUser } = useAuth()

    return(
        <nav className='navbar bg-light mb-3'>
            <div className='container-fluid'>
                <ul className="nav">
                    <li className="nav-item">
                        <Link to='/' className="nav-link" aria-current="page">Main</Link>
                    </li>
                    {
                        currentUser && (
                            <li className="nav-item">
                                <Link to='/users' className="nav-link" >Users</Link>
                            </li>
                        )
                    }
                </ul>
                <div className='d-flex'>
                    {
                        currentUser ? (
                            <NavProfile />
                        ) : (
                            <Link to='/login' className="nav-link">Login</Link>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar