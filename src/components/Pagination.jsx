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
                                    <a className="page-link"
                                       href="#"
                                       onClick={() => onPageChange(page)}
                                    >
                                        {page}
                                    </a>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </>
    )
}

export default Pagination