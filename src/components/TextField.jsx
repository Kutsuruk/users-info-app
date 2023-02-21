import PropTypes from "prop-types"
const TextField = ({label, type, value, onChange, name, error }) => {

    const getInputClasses = () => {
        return error ? 'form-control is-invalid' : 'form-control'
    }

    return(
        <div className='mb-4'>
            <label htmlFor="email">{label}</label>
            <input type={type}
                   className={getInputClasses()}
                   id={name}
                   value={value}
                   onChange={onChange}
                   name={name}
            />
            {error && <div className='invalid-feedback'>{error}</div>}
        </div>
    )
}

TextField.defaultProps = {
    type: 'text',
}

TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    error: PropTypes.string,
}

export default TextField