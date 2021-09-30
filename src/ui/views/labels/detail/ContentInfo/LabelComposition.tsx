import React from 'react'
import { ILabel } from '@src/entities'
import { Row, Col } from 'reactstrap'
import { getDayWithWeekForDisplay, getTimeForDisplay } from '@src/utils/DateUtil'

type Props = {
  item: ILabel
  rangeCalc: (arg0: number, arg1?: string | null) => string
}
/** ************************************************************************
 * name :
 * description :

 * todo 작성 필요
 *************************************************************************** */
function LabelComposition({ item, rangeCalc }: Props) {
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
          레이블 ID
        </Col>
        <Col sm="9" xs="8">
          {item.id}
        </Col>

        <Col sm="3" xs="4" className="listTitle">
          레이블 이름
        </Col>
        <Col sm="9" xs="8">
          {item.name}
        </Col>

        <Col sm="3" xs="4" className="listTitle">
          참조 기간
        </Col>
        <Col sm="9" xs="8" style={{ fontWeight: 'bold' }}>
          {rangeCalc(item.aggregateRange, item?.aggregateRangeDescription)}
        </Col>

        <Col sm="3" xs="4" className="listTitle">
          기준
        </Col>
        <Col sm="9" xs="8" style={{ fontWeight: 'bold' }}>
          {item.aggregateBase1 === 0 ? '개인화 ID 기준' : '게임 기준'},{' '}
          {item.aggregateBase2} 기준
        </Col>

        <Col sm="3" xs="4" className="listTitle">
          집계 대상
        </Col>
        <Col sm="9" xs="8" style={{ fontWeight: 'bold' }}>
          {item.aggregateRange === 0
            ? '데이터 참조 범위 내 모든 대상'
            : '데이터 참조 범위 내 일부 대상'}
        </Col>

        <Col sm="3" xs="4" className="listTitle">
          데이터 타입
        </Col>
        <Col sm="9" xs="8" style={{ fontWeight: 'bold' }}>
          {dataTypeToKorean(item.dataType) !== ''
            ? `${dataTypeToKorean(item.dataType)}(${item.dataType})`
            : `${item.dataType}`}
        </Col>

        <Col sm="3" xs="4" className="listTitle">
          상세 설명
        </Col>
        <Col sm="9" xs="8" style={{ fontWeight: 'bold' }}>
          {item.description}
        </Col>

        <Col sm="3" xs="4" className="listTitle">
          최근 업데이트
        </Col>
        <Col sm="9" xs="8">
          {getDayWithWeekForDisplay(`${item.modifiedDatetime.split(' ').join('T')}.000Z`)}
          &nbsp;
          {getTimeForDisplay(item.modifiedDatetime)}
        </Col>

        <Col sm="3" xs="4" className="listTitle">
          참조된 세그먼트
        </Col>
        <Col sm="9" xs="8">
          <span style={{ fontWeight: 'bold' }}>{item.segmentJobDefinitions.length}</span>{' '}
          개의 세그먼트에서 레이블을 이용중
        </Col>

        <Col sm="3" xs="4" className="listTitle">
          저장소
        </Col>
        <Col sm="9" xs="8">
          {`nm-prod-global-userdata-hub.${item.gbqDatasetName}.${item.gbqTableName}`}
        </Col>
      </Row>
    </div>
  )
}

export default LabelComposition
