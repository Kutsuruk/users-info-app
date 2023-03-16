import TextField from "../common/form/TextField";
import {useEffect, useState} from "react";
import {validator} from "../../utils/validator";
import SelectField from "../common/form/SelectField";
import RadioField from "../common/form/RadioField";
import MultiSelectField from "../common/form/MultiSelectField";
import CheckBoxField from "../common/form/CheckBoxField";
import {useQualities} from "../../hooks/useQualitites";
import {useProfessions} from "../../hooks/useProfessions";
import {useAuth} from "../../hooks/useAuth";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        profession: '',
        sex: 'Male',
        qualities: [],
        license: false,
    })
    const [errors, setErrors] = useState({})

    const { qualities } = useQualities()
    const qualitiesList = qualities.map(quality => {
        return {
            label: quality.name,
            value: quality._id,
        }
    })

    const { professions } = useProfessions()
    const professionsList = professions.map(profession => {
        return {
            label: profession.name,
            value: profession._id,
        }
    })

    const { signUp } = useAuth()

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

        const newData = {
            ...data,
            qualities: data.qualities.map(quality => quality.value)
        }

        console.log(newData)
        signUp(newData)
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
        },
        license: {
            isRequired: {
                message: 'You should accept privacy and policy'
            }
        }
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
            <SelectField data={data}
                         label='Профессия'
                         onChange={handleChange}
                         options={professionsList}
                         defaultOption='Choose...'
                         error={errors.profession}
                         value={data.profession}
                         name='professions'
            />
            <RadioField value={data.sex}
                        options={[
                            {name: 'Male', value: 'Male'},
                            {name: 'Female', value: 'Female'},
                            {name: 'Other', value: 'Other'}
                        ]}
                        name='sex'
                        onChange={handleChange}
                        label='Выберите ваш пол'
            />
            <MultiSelectField onChange={handleChange}
                              label='Выберите несколько качеств'
                              options={qualitiesList}
                              name='qualities'
                              defaultValue={data.qualities}
            />
            <CheckBoxField onChange={handleChange}
                           name='license'
                           value={data.license}
                           error={errors.license}
            >
                Accept <a>privacy policy</a>
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

export default RegisterForm