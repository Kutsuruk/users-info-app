import {useEffect, useState} from "react"
import {validator} from "../../utils/validator"
import TextField from "../common/form/TextField"

const LoginForm = () => {
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

    const isValid = Object.keys(errors).length === 0

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
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 p-4'>
                    <h3 className='display-4 mb-4'>Login form</h3>

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

                        <button className="btn btn-primary w-100 mx-auto"
                                type='submit'
                                disabled={!isValid}
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm