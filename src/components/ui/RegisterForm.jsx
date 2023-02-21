import TextField from "../common/form/TextField";
import {useEffect, useState} from "react";
import {validator} from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/SelectField";
import RadioField from "../common/form/RadioField";

const RegisterForm = () => {
    const [data, setData] = useState({email: '', password: '', profession: '', sex: 'Male'})
    const [errors, setErrors] = useState({})
    const [professions, setProfessions] = useState()

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
        profession: {
            isRequired: {
                message: 'Поле провессия должно быть выбрано'
            }
        }
    }


    useEffect(() => {
        validate()
    }, [data])

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [])

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
            <SelectField data={data}
                         label='Профессия'
                         onChange={handleChange}
                         options={professions}
                         defaultOption='Choose...'
                         error={errors.profession}
                         value={data.profession}
            />
            <RadioField value={data.sex}
                        options={[
                            {name: 'Male', value: 'Male'},
                            {name: 'Female', value: 'Female'},
                            {name: 'Other', value: 'Other'}
                        ]}
                        name='sex'
                        onChange={handleChange}
            />

            <button className="btn btn-primary w-100 mx-auto"
                    type='submit'
                    disabled={!isValid}
            >
                Login
            </button>
        </form>
    )
}

export default RegisterForm