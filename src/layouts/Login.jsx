import {useEffect, useState} from "react";
import TextField from "../components/TextField";
import {validator} from "../utils/validator";

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})

    const handleChange = ({target}) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        console.log(data)
    }

    const validate = () => {
        const errors = validator(data, validatorConfig)

        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Email обязательно для заполнения'
            },
            isEmail: {
                message: 'Email введен некорректно'
            }
        },
        password: {
            isRequired: {
                message: 'Password обязательно для заполнения'
            },
            isCapitalistSymbol: {
                message: 'Password должен содержать заглавную букву'
            },
            isContainDigit: {
                message: 'Password должен содержать хотя бы одно число'
            },
            isMin: {
                message: 'Password должен содержать минимум 8 символов'
            }
            },
    }


    useEffect(() => {
        validate()
    }, [data])

    return(
        <>
            <h1 className='display-4'>Login</h1>
            <form onSubmit={handleSubmit}>
                <TextField label='Email'
                           value={data.email}
                           onChange={handleChange}
                           name='email'
                           error={errors.email}
                />
                <TextField label='Password'
                           type='password'
                           value={data.password}
                           onChange={handleChange}
                           name='password'
                           error={errors.password}
                />

                <button className="btn btn-primary mt-3" type='submit'>Login</button>
            </form>
        </>
    )
}

export default Login