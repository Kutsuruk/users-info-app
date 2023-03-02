import Qualities from "./qualities";

const QualitiesCard = ({ data }) => {
    return(
        <div className='card mb-3'>
            <div className='card-body d-flex flex-column justify-content-center text-center'>
                <h5>
                    <span>Qualities</span>
                </h5>
                <p className='card-text'>
                    <Qualities qualities={data} />
                </p>
            </div>
        </div>
    )
}

export default QualitiesCard