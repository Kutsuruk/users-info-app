import {useQualities} from "../../../hooks/useQualitites"
import Quality from "./Quality"

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities()
    if (isLoading) return "Loading..."

    return (
        <>
            {qualities.map((quality) => (
                <Quality key={quality} id={quality} />
            ))}
        </>
    )
}

export default QualitiesList;
