import React from 'react'

import { Col, Row } from 'reactstrap'

type Props = {
  title: string
  children?: React.ReactNode
}

function TitleAndContent({ title, children }: Props) {
  return (
    <Row>
      <Col sm="3" xs="4" md="2">
        {title}
      </Col>
      <Col>{children}</Col>
    </Row>
  )
}

export default TitleAndContent
