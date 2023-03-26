import {useAuth} from "../../hooks/useAuth";
import {useState} from "react";
import {Link} from "react-router-dom";

const NavProfile = () => {
    const { currentUser } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => setIsOpen(prevState => !prevState)

    return(
        <div className='dropdown' onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className='me-2'>{currentUser.name}</div>
                <img className='img-responsive rounded-circle'
                     src={currentUser.image}
                     height='50'
                />
            </div>

            <div className={isOpen ? "w-100 dropdown-menu show" : "w-100 dropdown-menu"}>
                <Link to={ `/users/${currentUser._id}` } className='dropdown-item'>Profile</Link>
                <Link to='/logout' className='dropdown-item'>
                    Log out
                    <svg xmlns="http://www.w3.org/2000/svg"
                         width="16"
                         height="16"
                         fill="currentColor"
                         style={{marginLeft: '10px'}}
                         className="bi bi-box-arrow-right mb-1"
                         viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                    </svg>
                </Link>
            </div>
        </div>
    )
}

export default NavProfile