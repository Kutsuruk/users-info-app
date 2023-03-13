import PropTypes from "prop-types"
import {useQualities} from "../../../hooks/useQualitites";
const Quality = ({ id }) => {
    const {getQuality} = useQualities()
    const quality = getQuality(id)
    console.log(quality)

    return (
        <span className={"badge m-1 bg-" + quality.color}>
            {quality.name}
        </span>
    )
}

Quality.propTypes = {
    color: PropTypes.string,
    name: PropTypes.string,
    _id: PropTypes.string
}

export default Quality
