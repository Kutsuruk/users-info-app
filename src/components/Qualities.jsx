const Qualities = ({user}) => {
    return(
        <>
            {
                user.qualities.map((quality) => (
                    <span className={'badge m-1 bg-'+quality.color} key={quality._id}>
                        {quality.name}
                    </span>
            ))
            }
        </>
    )
}
export default Qualities