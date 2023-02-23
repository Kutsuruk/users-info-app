import {useEffect, useState} from "react"
// import {validator} from "../../utils/validator"
import TextField from "../common/form/TextField"
import CheckBoxField from "../common/form/CheckBoxField"
import * as yup from 'yup'

const LoginForm = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        stayOn: false,
    })
    const [errors, setErrors] = useState({})

    const isValid = Object.keys(errors).length === 0

    // const validatorConfig = {
    //     email: {
    //         isRequired: {
    //             message: 'Email обязательно для заполнения'
    //         },
    //         isEmail: {
    //             message: 'Email введен некорректно'
    //         }
    //     },
    //     password: {
    //         isRequired: {
    //             message: 'Password обязательно для заполнения'
    //         },
    //         isCapitalistSymbol: {
    //             message: 'Password должен содержать заглавную букву'
    //         },
    //         isContainDigit: {
    //             message: 'Password должен содержать хотя бы одно число'
    //         },
    //         isMin: {
    //             message: 'Password должен содержать минимум 8 символов'
    //         }
    //     },
    // }

    let validateSchema = yup.object().shape({
        password: yup.string()
            .required('Password обязательно для заполнения')
            .matches(/^(?=.*[A-Z])/, 'Password должен содержать заглавную букву')
            .matches(/(?=.*[0-9])/, 'Password должен содержать хотя бы одно число')
            .matches(/(?=.*[!@$%^&*])/, 'Password должен содержать один из символов !@$%^&*')
            .matches(/(?=.{8,})/, 'Password должен содержать минимум 8 символов'),
        email: yup.string()
            .required('Email обязательно для заполнения')
            .email('Email введен некорректно'),

    })

    const handleChange = (target) => {
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
        // const errors = validator(data, validatorConfig)

        validateSchema.validate(data)
            .then(() => setErrors({}))
            .catch((error) => {setErrors({[error.path]: error.message})})

        return Object.keys(errors).length === 0
    }


    useEffect(() => {
        validate()
    }, [data])

    return(
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
            <CheckBoxField onChange={handleChange}
                           name='stayOn'
                           value={data.stayOn}
            >
                Remember me
            </CheckBoxField>

            <button className="btn btn-primary w-100 mx-auto"
                    type='submit'
                    disabled={!isValid}
            >
                Login
            </button>
        </form>
    )
}

export default LoginForm