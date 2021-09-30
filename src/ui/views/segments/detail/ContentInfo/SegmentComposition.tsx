import React from 'react'
import { Row, Col } from 'reactstrap'
import { ISegment } from '@src/entities/segment'

const SegmentComposition: React.FC<{
  item: ISegment
}> = ({ item }) => {
  const dataTypeToKorean = (type: string) => {
    switch (type) {
      case 'string':
        return '문자열'
      case 'number':
        return '숫자'
      case 'boolean':
        return '참거짓'
      default:
        return ''
    }
  }

  return (
    <div id="label-composition">
      <Row>
        <Col sm="3" xs="4" className="listTitle">
          ID
        </Col>
        <Col sm="9" xs="8">
          {item.id}
        </Col>

        <Col sm="3" xs="4" className="listTitle">
          이름
        </Col>
        <Col sm="9" xs="8">
          {item.name}
        </Col>

        <Col sm="3" xs="4" className="listTitle">
          설명
        </Col>
        <Col sm="9" xs="8">
          {item.description}
        </Col>

        <Col sm="3" xs="4" className="listTitle">
          기준 ID타입
        </Col>
        <Col sm="9" xs="8">
          <strong>{item.queryConfig.meta.idType}</strong>
        </Col>

        <Col sm="3" xs="4" className="listTitle">
          결과값
        </Col>
        <Col sm="9" xs="8">
          {item.includeColumns}
        </Col>
      </Row>
    </div>
  )
}

export default SegmentComposition
