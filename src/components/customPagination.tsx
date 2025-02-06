import { Pagination, PaginationContent, PaginationItem } from './ui/pagination'
import { Link } from 'react-router-dom'
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'



const CustomPagination = ({ currentPage, total_pages }: { currentPage: number, total_pages: number }) => {

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                    <Link
                        to={`?page=${currentPage - 1}`}
                        className={cn(buttonVariants({
                            variant: 'outline',
                            size : 'sm'
                        }), { 'hidden': currentPage === 1 })}
                    >
                        Previous
                    </Link>
                </PaginationItem>

                {/* Always show the first page */}
                <PaginationItem>
                    <Link
                        className={buttonVariants({
                            variant: currentPage === 1 ? 'outline' : 'ghost',
                            size : 'sm'
                        })}
                        to="?page=1"
                    >
                        1
                    </Link>
                </PaginationItem>

                {/* Show an ellipsis if the current page is far from the start */}
                {currentPage > 3 && (
                    <PaginationItem>
                        <span className="px-4">...</span>
                    </PaginationItem>
                )}

                {/* Show the previous page, current page, and next page */}
                {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i)
                    .filter((pageNumber) => pageNumber > 1 && pageNumber < total_pages)
                    .map((pageNumber) => (
                        <PaginationItem key={pageNumber}>
                            <Link
                                className={buttonVariants({
                                    variant: currentPage === pageNumber ? 'outline' : 'ghost',
                                    size : 'sm'
                                })}
                                to={`?page=${pageNumber}`}
                            >
                                {pageNumber}
                            </Link>
                        </PaginationItem>
                    ))}

                {/* Show an ellipsis if the current page is far from the end */}
                {currentPage < total_pages - 2 && (
                    <PaginationItem>
                        <span className="px-4">...</span>
                    </PaginationItem>
                )}

                {/* Always show the last page */}
                {total_pages > 1 && (
                    <PaginationItem>
                        <Link
                            className={buttonVariants({
                                variant: currentPage === total_pages ? 'outline' : 'ghost',
                                size : 'sm'
                            })}
                            to={`?page=${total_pages}`}
                        >
                            {total_pages}
                        </Link>
                    </PaginationItem>
                )}

                {/* Next Button */}
                <PaginationItem>
                    <Link
                        to={`?page=${currentPage + 1}`}
                        className={cn(buttonVariants({
                            variant: 'outline',
                            size : 'sm'
                        }), { 'hidden': currentPage === total_pages })}
                    >
                        Next
                    </Link>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default CustomPagination