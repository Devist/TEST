import React from 'react'

import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

type Props = {
  onItemClicked: (pageNumber: string | number) => void
  store: any
  totalNumber: number
}

/** ************************************************************************
 * name :
 * description :

 * todo 작성 필요
 *************************************************************************** */
function Paging2({ onItemClicked, totalNumber, store }: Props) {
  const events = {
    handlePrevChange: () => {
      onItemClicked('prev')
    },
    handleNextChange: () => {
      onItemClicked('next')
    },
    handleChange: (page: number) => {
      onItemClicked(page)
    }
  }

  // ** Render pages
  const renderPageItems = () => {
    const arrLength = Math.ceil(totalNumber / 10)

    return new Array(Math.trunc(arrLength)).fill(0).map((item, index) => {
      return (
        <PaginationItem
          key={index}
          active={store.page === index + 1}
          onClick={() => events.handleChange(index + 1)}>
          <PaginationLink href="/" onClick={(e: any) => e.preventDefault()}>
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      )
    })
  }

  return (
    <>
      <Pagination className="d-flex justify-content-center">
        <PaginationItem className="prev-item" onClick={() => events.handlePrevChange()}>
          <PaginationLink href="/" onClick={(e: any) => e.preventDefault()} />
        </PaginationItem>
        {renderPageItems()}
        <PaginationItem className="next-item" onClick={() => events.handleNextChange()}>
          <PaginationLink href="/" onClick={(e: any) => e.preventDefault()} />
        </PaginationItem>
      </Pagination>
    </>
  )
}

export default Paging2
