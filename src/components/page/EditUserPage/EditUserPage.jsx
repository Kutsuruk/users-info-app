import { useEffect, useState } from "react";
import TextField from "../../common/form/TextField";
import SelectField from "../../common/form/SelectField";
import RadioField from "../../common/form/RadioField";
import MultiSelectField from "../../common/form/MultiSelectField";
import {validator} from "../../../utils/validator";
import BackButton from "../../common/BackButton";
import {useAuth} from "../../../hooks/useAuth";
import {useQualities} from "../../../hooks/useQualitites";
import {useProfessions} from "../../../hooks/useProfessions";
import {value} from "lodash/seq";
import {useHistory} from "react-router-dom";

const EditUserPage = () => {
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState()
    const { currentUser, updateUserData } = useAuth()
    const { qualities, isLoading: qualitiesLoading } = useQualities()
    const { professions, isLoading: professionsLoading } = useProfessions()
    const [errors, setErrors] = useState({})

    const qualitiesList = qualities.map(quality => {
        return {
            label: quality.name,
            value: quality._id,
        }
    })

    const professionsList = professions.map(profession => {
        return {
            label: profession.name,
            value: profession._id,
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        await updateUserData({...data, qualities: data.qualities.map((quality) => quality.value)})

        history.push(`/users/${currentUser._id}`)
    }

    const getQualitiesListByIds = (qualitiesIds) => {
        const qualitiesArray = []

        for (const qualityId of qualitiesIds) {
            for (const quality of qualityId) {
                if (quality._id === qualityId) {
                    qualitiesArray.push(quality)
                    break
                }
            }
        }

        return qualitiesArray
    }

    const transformData = (data) => {
        return getQualitiesListByIds(data).map((quality) => ({
            label: quality.name,
            value: quality._id
        }))
    }

    useEffect(() => {
        if (!professionsLoading && !qualitiesLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            })
        }
    }, [professionsLoading, qualitiesLoading, currentUser, data])

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false)
        }
    }, [data])

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Email is required"
            },
            isEmail: {
                message: "Email incorrect"
            }
        },
        name: {
            isRequired: {
                message: "Enter your name"
            }
        }
    }

    useEffect(() => {
        validate()
    }, [data])

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }
    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors);
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0

    return (
        <div className="container mt-5">
            <BackButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading && Object.keys(professions).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={professionsList}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualitiesList}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditUserPage
