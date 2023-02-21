import PropTypes from "prop-types"
const TextField = ({label, type, value, onChange, name, error }) => {
    return(
        <div>
            <label htmlFor="email">{label}</label>
            <input type={type}
                   id={name}
                   value={value}
                   onChange={onChange}
                   name={name}
            />
            {error && <p>{error}</p>}
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