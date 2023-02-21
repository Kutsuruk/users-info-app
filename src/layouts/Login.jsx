import {useState} from "react";
import TextField from "../components/TextField";

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const handleChange = ({target}) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    return(
        <>
            <h1 className='display-4'>Login</h1>
            <form action="post">
                <TextField label='Email'
                           value={data.email}
                           onChange={handleChange}
                           name='email'
                />
                <TextField label='Password'
                           type='password'
                           value={data.password}
                           onChange={handleChange}
                           name='password'
                />
            </form>
        </>
    )
}

export default Login