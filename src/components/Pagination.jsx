import _ from "lodash";
const Pagination = ({itemsCount, pageSize, onPageChange, currentPage}) => {
    const pageCount = Math.ceil(itemsCount / pageSize)
    if (pageCount === 1) return null

    const pages = _.range(1, pageCount + 1)


    return(
        <>
            <nav aria-label="Page users navigation">
                <ul className="pagination m-1">
                    {
                        pages.map((page) => (
                            <li key={'page_'+page}
                                className={(page === currentPage) ? "page-item active" : "page-item"}>
                                    <button className="page-link"
                                            onClick={() => onPageChange(page)}
                                    >
                                        {page}
                                    </button>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </>
    )
}

export default Pagination