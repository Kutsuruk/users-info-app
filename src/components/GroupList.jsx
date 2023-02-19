import PropTypes from "prop-types";

const GroupList = ({items, onItemSelect, valueProperty, contentProperty, selectedItem}) => {
    return(
        <>
            <ul className="list-group">
                {
                    Object.keys(items).map((item) => (
                        <li className={items[item] === selectedItem ? 'list-group-item active' : 'list-group-item' }
                            role='button'
                            key={items[item][valueProperty]}
                            aria-current="true"
                            onClick={() => onItemSelect(items[item])}
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
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object,
}
export default GroupList