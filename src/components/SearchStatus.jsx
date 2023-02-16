const SearchStatus = ({users}) => {
    const renderPhrase = () => {
        if (users.length > 0) {
            return `Ready to hang-out with you ${users.length} users.`
        } else {
            return 'Nobody wants to hang-out with you.'
        }
    }

    return(
        <span className={'badge bg-'+(users.length > 0 ? 'primary' : 'danger')}>
                {renderPhrase()}
        </span>
    )
}

export default SearchStatus