import React from 'react'

import DisplayBoxWithTitle from '@ui/components/molecules/DisplayBoxWithTitle'

import { Row, Col } from 'reactstrap'
import { CreditCard, Mail, Phone, User } from 'react-feather'
import { ISegment } from '@src/entities/segment'
import SegmentComposition from '@ui/views/segments/detail/ContentInfo/SegmentComposition'

const ContentInfo: React.FC<{ item: ISegment }> = ({ item }) => {
  return (
    <>
      <Row>
        <Col xl="4" md="12" xs="12">
          <DisplayBoxWithTitle title="정보" className="segment-info-small-box">
            <p dangerouslySetInnerHTML={{ __html: item.translate }} />
          </DisplayBoxWithTitle>
        </Col>
        <Col xl="4" md="12" xs="12">
          <DisplayBoxWithTitle title="참조 레이블" className="segment-info-small-box">
            {/* <p dangerouslySetInnerHTML={{__html: item.translate}}/> */}
          </DisplayBoxWithTitle>
        </Col>
        <Col xl="4" md="12" xs="12">
          <DisplayBoxWithTitle title="담당자" className="segment-info-small-box">
            <div>
              <User size="14" className="mr-1" /> {item.managerName}
            </div>
            <div>
              <CreditCard size="14" className="mr-1" /> {item.departmentName}
            </div>
            <div>
              <Mail size="14" className="mr-1" /> {item.mail}
            </div>
            <div>
              <Phone size="14" className="mr-1" /> {item.phone}
            </div>
          </DisplayBoxWithTitle>
        </Col>
      </Row>
      <Row>
        <Col xl="6" md="12" xs="12" className="mt-2 mt-lg-2">
          <DisplayBoxWithTitle title="세그먼트 구성" className="segment-info-big-box">
            <SegmentComposition item={item} />
          </DisplayBoxWithTitle>
        </Col>
        <Col xl="6" md="12" xs="12" className="mt-2 mt-lg-2">
          <DisplayBoxWithTitle
            title="실행시 결과 및 발송 타입"
            className="segment-info-big-box">
            {/* <ProfileInfo item={item.profile} /> */}
          </DisplayBoxWithTitle>
        </Col>
      </Row>
    </>
  )
}

export default ContentInfo
