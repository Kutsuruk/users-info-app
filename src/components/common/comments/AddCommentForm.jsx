import SelectField from "../form/SelectField";
import {useEffect, useState} from "react";
import TextAreaField from "../form/TextAreaField";
import {validator} from "../../../utils/validator";
import API from "../../../api";

const initialData = { userId: "", content: "" };

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialData)
    const [users, setUsers] = useState({})
    const [errors, setErrors] = useState({})

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const validatorConfig = {
        userId: {
            isRequired: {
                message: 'Выберите от чьего имени вы хотите отправить сообщение'
            }
        },
        content: {
            isRequired: {
                message: 'Сообщение не может быть пустым'
            }
        }
    }

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    useEffect(() => {
        API.users.fetchAll().then(setUsers)
    }, [])

    const clearForm = () => {
        setData(initialData)
        setErrors({})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        onSubmit(data)
        clearForm()
    }

    const arrayOfUsers =
        users &&
        Object.keys(users).map((userId) => ({
            label: users[userId].name,
            value: users[userId]._id
        }))

    return(
        <div>
            <h2>New Comment</h2>
            <form onSubmit={handleSubmit}>
                <SelectField
                    onChange={handleChange}
                    options={arrayOfUsers}
                    name='userId'
                    value={data.userId}
                    defaultOption='Choose user'
                    error={errors.userId}
                />
                <TextAreaField
                    value={data.content}
                    onChange={handleChange}
                    name='content'
                    label='Message'
                    error={errors.content}
                />

                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">Publish</button>
                </div>
            </form>
        </div>
    )
}

export default AddCommentForm