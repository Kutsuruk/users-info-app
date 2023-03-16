import PropTypes from "prop-types"
const SelectField = ({label, value, onChange, options, defaultOption, error, name}) => {
    const getInputClasses = () => {
        return error ? 'form-select is-invalid' : 'form-select'
    }

    const optionsArray = !Array.isArray(options) && typeof options === 'object'
        ? Object.keys(options).map((optionName) => ({name: options[optionName].name, value: options[optionName]._id}))
        : options

    const handleChange = ({target}) => {
        onChange({name: target.name, value: target.value})
    }

    return(
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select className={getInputClasses()}
                    id={name}
                    name='profession'
                    value={value}
                    onChange={handleChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {
                    optionsArray && optionsArray.map((option) => (
                        <option value={option.value}
                                key={option.value}
                        >
                            {option.label}
                        </option>

                    ))
                }
                <option value='_id'>...</option>
            </select>
            <div className="invalid-feedback">
                { error && <p>{error}</p> }
            </div>
        </div>
    )
}

SelectField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    defaultOption: PropTypes.string,
    error: PropTypes.string,
    name: PropTypes.string,
}

export default SelectField