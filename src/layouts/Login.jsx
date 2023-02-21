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

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data)
    }

    return(
        <>
            <h1 className='display-4'>Login</h1>
            <form onSubmit={handleSubmit}>
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

                <button type='submit'>Login</button>
            </form>
        </>
    )
}

export default Login