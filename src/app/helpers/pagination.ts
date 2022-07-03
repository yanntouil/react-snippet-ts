import { range } from "./range"

type PaginationOptions = {
    nextAndPrevious?: boolean,
    firstAndLast?: boolean,
    neighbours?: number,
    neighboursLeft?: number,
    neighboursRight?: number,
}


/**
 * Return a pagination array
 * @param {number} currentPage - Current page display
 * @param {number} totalPage - Total page
 * @param {PaginationOptions} options
 * @param {boolean} [options.nextAndPrevious] - add 'previous' and 'next'
 * @param {boolean} [options.firstAndLast] - add first and last page
 * @param {number} [options.neighbours] - Number on neighbours
 * @param {number} [options.neighboursLeft] - Number on neighbours on left
 * @param {number} [options.neighboursRight] - Number on neighbours on right
 * @returns {(number | string)[]} [1, 'previous', 4, 5, 6, 7, 8, 'next', 10]
 */
export const pagination = (currentPage: number, totalPage: number, options: PaginationOptions = {}): (number | string)[] => {
    // Options
    const nextAndPrevious = options.nextAndPrevious ?? true// Display next and previous (default: true)
    const firstAndLast = options.firstAndLast ?? true// Display next and previous (default: true)
    const neighboursLeft = options.neighbours ?? options.neighboursLeft ?? 2// Number of neighbours on left (default: 2)
    const neighboursRight = options.neighbours ?? options.neighboursRight ?? 2// Number of neighbours on right (default: 2)
    // Total pages to display
    let pagesDisplayed = neighboursLeft + 1 + neighboursRight// {3 4} [5] {6 7}
    pagesDisplayed += nextAndPrevious ? 2 : 0// With previous and last < {3 4} [5] {6 7} >
    pagesDisplayed += firstAndLast ? 2 : 0// With first and last (1) < {3 4} [5] {6 7} > (10)
    if (totalPage <= pagesDisplayed) return range(1, totalPage)
    // Pagination array
    const startPage = Math.max(firstAndLast ? 2 : 1, currentPage - neighboursLeft)// First page displayed
    const endPage = Math.min(totalPage - (firstAndLast ? 1 : 0), currentPage + neighboursRight)// Last page displayed
    let pages: (number | string)[] = range(startPage, endPage)
    // Spill
    const leftSpill = firstAndLast ? startPage > 2 : startPage > 1// Hidden pages to the left
    const rightSpill = firstAndLast ? (totalPage - endPage) > 1 : (totalPage - endPage) > 0// Hidden pages to the right
    let spillOffset = pagesDisplayed - pages.length// Number of hidden pages either to the left or to the right
    spillOffset -= nextAndPrevious ? 1 : 0// With previous and last
    spillOffset -= firstAndLast ? 2 : 0// With first and last
    if (leftSpill && !rightSpill)// (1) {2 3 4} [5] {6} > (10)
        pages = [...range(startPage - spillOffset, startPage - 1), ...pages]
    else if (!leftSpill && rightSpill)// (1) < {5 6} [7] {8 9} (10)
        pages = [...pages, ...range(endPage + 1, endPage + spillOffset)]
    // Add previous and next
    if (nextAndPrevious)
        pages = [...(leftSpill ? ['previous'] : []), ...pages, ...(rightSpill ? ['next'] : [])]
    // Add first and last page
    if (firstAndLast)
        pages = [1, ...pages, totalPage]
    return pages
}
