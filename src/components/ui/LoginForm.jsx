import {useEffect, useState} from "react"
// import {validator} from "../../utils/validator"
import TextField from "../common/form/TextField"
import CheckBoxField from "../common/form/CheckBoxField"
import * as yup from 'yup'
import {useAuth} from "../../hooks/useAuth";
import {useHistory} from "react-router-dom";

const LoginForm = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        stayOn: false,
    })
    const [errors, setErrors] = useState({})
    const [enterError, setEnterError] = useState(null)

    const history = useHistory()

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
            .required('Password обязательно для заполнения'),
        email: yup.string()
            .required('Email обязательно для заполнения')
    })

    const { logIn } = useAuth()

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))

        setEnterError(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const isValid = validate()

        if (!isValid) return
        console.log(data)


        try {
            await logIn(data)
            history.push('/')
        } catch (error) {
            console.log(error)
        }
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

            {enterError && <p className='text-danger'>{enterError}</p>}

            <button className="btn btn-primary w-100 mx-auto"
                    type='submit'
                    disabled={!isValid || enterError}
            >
                Login
            </button>
        </form>
    )
}

export default LoginForm