import PropTypes from "prop-types";

const GroupList = ({items, onItemSelect, valueProperty, contentProperty}) => {
    return(
        <>
            <ul className="list-group">
                {
                    Object.keys(items).map((item) => (
                        <li className="list-group-item"
                            key={items[item][valueProperty]}
                            aria-current="true"
                            onClick={onItemSelect}
                        >
                            { items[item][contentProperty] }
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

GroupList.defaultProps = {
    valueProperty: '_id',
    contentProperty: 'name',
}

GroupList.propTypes = {
    items: PropTypes.object.isRequired,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
}
export default GroupList