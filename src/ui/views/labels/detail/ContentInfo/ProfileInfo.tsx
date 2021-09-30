import React from 'react'
import { Col, Row, Badge } from 'reactstrap'
import { getDayWithWeekForDisplay, getTimeForDisplay } from '@src/utils/DateUtil'

type Props = { item: any }

/** ************************************************************************
 * name :
 * description :

 * todo 작성 필요
 *************************************************************************** */
function LabelDetail({ item }: Props) {
  return (
    <div id="label-composition">
      <Row>
        <Col sm="3" xs="4" className="listTitle">
          프로필 ID
        </Col>
        <Col sm="9" xs="8">
          {item.id}
        </Col>

        <Col sm="3" xs="4" className="listTitle">
          프로필 이름
        </Col>
        <Col sm="9" xs="8">
          {item.name}
        </Col>

        <Col sm="3" xs="4" className="listTitle">
          유효 기간
        </Col>
        <Col sm="9" xs="8">
          {item.duration_hours} 시간
        </Col>

        <Col sm="3" xs="4" className="listTitle">
          클라이언트
        </Col>
        <Col sm="9" xs="8">
          {item.profile_api_users.map((client: any) => {
            return (
              <span
                key={client.name}
                style={{ display: 'inline-block', height: '25px', marginRight: '10px' }}>
                <Badge color="primary" pill>
                  [플랫폼] {client.name}
                </Badge>
              </span>
            )
          })}
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
          {getDayWithWeekForDisplay(
            item.profile_api_users
              .find((client: any) => client.name === 'dashboard')
              .modified_datetime.toString()
          )}
          &nbsp;
          {getTimeForDisplay(
            item.profile_api_users
              .find((client: any) => client.name === 'dashboard')
              .modified_datetime.toString()
          )}
        </Col>

        <Col sm="3" xs="4" className="listTitle">
          저장소
        </Col>
        <Col sm="9" xs="8">
          {item.gbt_cluster_id}.{item.gbt_instance_id}.{item.gbt_table_id}.
          {item.gbt_column_family}
        </Col>
      </Row>
    </div>
  )
}

export default LabelDetail
