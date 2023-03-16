import React from "react";
import {useQualities} from "../../../hooks/useQualitites";
const Quality = ({ id }) => {
    const { getQuality } = useQualities();
    const { color, name } = getQuality(id);
    return (
        <span className={"badge m-1 bg-" + color}>
            {name}
        </span>
    );
};


export default Quality;
