import React from 'react'
import { Card, CardBody, CardTitle } from 'reactstrap'

type Props = {
  title: string
  clickHandler: () => void
  className?: string
  children?: React.ReactNode
}

/** ************************************************************************
 * name :
 * description :

 * todo 작성 필요
 *************************************************************************** */
function MoreCard({ title, clickHandler, className, children }: Props) {
  const events = {
    moveToPage: () => {
      clickHandler()
    }
  }
  return (
    <Card className={className}>
      <CardTitle className="mb-n2">
        <div className="d-flex justify-content-between">
          <h4 className="p-2">{title}</h4>
          <h6 className="p-2 cursor-pointer" onClick={events.moveToPage}>
            + 더보기
          </h6>
        </div>
      </CardTitle>
      <CardBody className="overflow-y-scroll">{children}</CardBody>
    </Card>
  )
}

export default MoreCard
