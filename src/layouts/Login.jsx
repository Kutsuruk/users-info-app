import LoginForm from "../components/ui/LoginForm"
import {useState} from "react";
import RegisterForm from "../components/ui/RegisterForm";
import {useParams} from "react-router-dom/cjs/react-router-dom";

const Login = () => {
    const {type} = useParams()
    const [formType, setFormType] = useState(type === 'register' ? type : 'login')

    const toggleFormType = () => {
        setFormType((prevState) => prevState === 'register' ? 'login' : 'register')
    }

    return (

        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 p-4'>
                    {
                        formType  === 'register' ? (
                            <>
                                <h3 className='display-4 mb-4'>Register</h3>
                                <RegisterForm />
                                <p>
                                    Already have account?

                                    <a onClick={toggleFormType}
                                       role='button'
                                    >
                                        Sign-in
                                    </a>
                                </p>
                            </>
                        ) : (
                            <>
                                <h3 className='display-4 mb-4'>Login</h3>
                                <LoginForm />
                                <p>
                                    Dont have account?

                                    <a onClick={toggleFormType}
                                       role='button'
                                    >
                                        Sign-up
                                    </a>
                                </p>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Login