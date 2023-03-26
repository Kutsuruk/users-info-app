import {useHistory} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";

const UserCard = ({ user }) => {
    const history = useHistory()
    const { currentUser } = useAuth()
    const handleClick = () => {
        history.push(history.location.pathname + '/edit')
    }

    return(
        <div className='card mb-3'>
            <div className='card-body'>
                {
                    currentUser._id === user._id && (
                        <button className='position-absolute top-0 end-0 btn btn-light btn-sm'
                                onClick={handleClick}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 width="16"
                                 height="16"
                                 fill="currentColor"
                                 className="bi bi-gear"
                                 viewBox="0 0 16 16">
                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                            </svg>
                        </button>
                    )
                }
            </div>

            <div className='d-flex flex-column align-items-center text-center position-relative'>
                <img
                    src={user.image}
                    className='rounded-circle'
                    width='150'
                    alt='User avatar'
                />
                <div className='mt-3'>
                    <h4>{user.name}</h4>
                    <p className='text-secondary mb-1'>
                        {user.profession.name}
                    </p>
                    <div className='text-muted'>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             width="16"
                             height="16"
                             fill="currentColor"
                             className="bi bi-caret-up"
                             viewBox="0 0 16 16">
                            <path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             width="16"
                             height="16"
                             fill="currentColor"
                             className="bi bi-caret-down"
                             viewBox="0 0 16 16">
                            <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
                        </svg>
                        <span className='ms-2'>{user.rate}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard