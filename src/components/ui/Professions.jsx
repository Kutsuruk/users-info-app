import {useProfessions} from "../../hooks/useProfessions";
const Professions = ({ id }) => {
    const {isLoading, getProfession} = useProfessions()
    const profession = getProfession(id)

    if (!isLoading) {
        return <p>{profession.name}</p>
    } else {
        return <p>Loading...</p>
    }
}

export default Professions