import PropTypes from "prop-types"
const CheckBoxField = ({name, value, onChange, children, error}) => {
    const handleChange = () => {
        onChange({name: name, value: !value})
    }

    const getInputClasses = () => {
        return error ? 'form-check-input is-invalid' : 'form-check-input'
    }

    return(
        <div className='mb-4'>
            <div className="form-check">
                <input className={getInputClasses()}
                       type="checkbox"
                       value=''
                       checked={value}
                       id={name}
                       onChange={handleChange}
                />
                <label className="form-check-label" htmlFor={name}>
                    {children}
                </label>
                <div className="invalid-feedback">
                    { error && <p>{error}</p> }
                </div>
            </div>
        </div>
    )
}

CheckBoxField.propTypes ={
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    error: PropTypes.string,
}

export default CheckBoxField