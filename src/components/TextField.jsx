import PropTypes from "prop-types"
const TextField = ({label, type, value, onChange, name }) => {
    return(
        <div>
            <label htmlFor="email">{label}</label>
            <input type={type}
                   id={name}
                   value={value}
                   onChange={onChange}
                   name={name}
            />
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
}

export default TextField