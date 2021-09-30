import React, { cloneElement, useState } from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

/** ************************************************************************
 * name :
 * description :
 * @param pagingList 페이지 나눌 리스트
 * @param listComponent 페이지에 보여줄 컴포넌트
 * @param numPerPage 페이지당 보여줄 갯수
 *
 * todo 작성 필요
 *************************************************************************** */
function Paging(pagingList: any[], listComponent: any = null, numPerPage: number) {
  const [currentPage, setCurrentPage] = useState<number>(0)

  const numOfPage = Math.ceil(pagingList.length / numPerPage)

  let handleClick = (e: any, index: number) => {
    e.preventDefault()
    setCurrentPage(index)
  }

  const renderPaging = (curPage: number) => {
    let result = []
    for (let i: number = 0; i < numOfPage; i++) {
      result.push(
        <PaginationItem key={'content-' + i + 1} active={i === curPage}>
          <PaginationLink onClick={(e: any) => handleClick(e, i)} href="#">
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      )
    }
    return result
  }

  return (
    <>
      {listComponent &&
        cloneElement(listComponent, {
          data: pagingList.slice(currentPage * numPerPage, (currentPage + 1) * numPerPage)
        })}
      <Pagination aria-label="Page navigation example">
        {/* << 아이콘 */}
        <PaginationItem disabled={currentPage <= 0}>
          <PaginationLink onClick={(e: any) => handleClick(e, 0)} first href="#" />
        </PaginationItem>
        {/* < 아이콘 */}
        <PaginationItem disabled={currentPage <= 0}>
          <PaginationLink
            onClick={(e: any) => handleClick(e, currentPage - 1)}
            previous
            href="#"
          />
        </PaginationItem>
        {/* 중앙 숫자 */}
        {renderPaging(currentPage)}
        {/* > 아이콘 */}
        <PaginationItem disabled={currentPage >= numOfPage - 1}>
          <PaginationLink
            onClick={(e: any) => handleClick(e, currentPage + 1)}
            next
            href="#"
          />
        </PaginationItem>
        {/* >> 아이콘 */}
        <PaginationItem disabled={currentPage >= numOfPage - 1}>
          <PaginationLink
            onClick={(e: any) => handleClick(e, numOfPage - 1)}
            last
            href="#"
          />
        </PaginationItem>
      </Pagination>
    </>
  )
}
export default Paging
