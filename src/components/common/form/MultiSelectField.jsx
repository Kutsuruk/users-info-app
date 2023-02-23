import Select from "react-select"
import PropTypes from "prop-types"
const MultiSelectField = ({onChange, options, name, label, defaultValue}) => {

    const optionsArray = !Array.isArray(options) && typeof options === 'object'
        ? Object.keys(options).map((optionName) => ({
            label: options[optionName].name,
            value: options[optionName]._id
        }))
        : options

    const handleChange = (value) => {
        onChange({name: name, value})
    }

    return(
        <div className='mb-4'>
            <label className="form-label">
                {label}
            </label>
            <Select isMulti
                    closeMenuOnSelect={false}
                    name={name}
                    onChange={handleChange}
                    options={optionsArray}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    defaultValue={defaultValue}
            />
        </div>
    )
}

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array,
}

export default MultiSelectField