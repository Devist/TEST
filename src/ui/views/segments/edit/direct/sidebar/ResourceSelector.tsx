import React from 'react'

import { Col, CustomInput, Row } from 'reactstrap'
import { RESOURCE_OPTIONS } from '@ui/views/segments/edit/direct/sidebar/index'

type Props = {
  selected: RESOURCE_OPTIONS
  handler: (resource: RESOURCE_OPTIONS) => void
}

/** ************************************************************************
 * name :
 * description :

 * todo 작성 필요
 *************************************************************************** */
function ResourceSelector({ handler, selected }: Props) {
  const events = {
    selectOne: (resource: RESOURCE_OPTIONS) => handler(resource)
  }
  return (
    <>
      <h5 className="font-weight-bolder mb-little select-filters pt-0 pb-0">
        사용 가능한 리소스
      </h5>
      <div className="sg-resource mt-1 select-filters py-little">
        <Row>
          <Col sm="12" md="4">
            <CustomInput
              id="radio-criteria-source-labels"
              name="radio-criteria-source"
              type="radio"
              label="레이블"
              checked={selected === RESOURCE_OPTIONS.LABELS}
              onChange={() => events.selectOne(RESOURCE_OPTIONS.LABELS)}
            />
          </Col>
          <Col sm="12" md="8">
            <CustomInput
              id="radio-criteria-source-external"
              name="radio-criteria-source"
              type="radio"
              label="외부 데이터 소스"
              checked={selected === RESOURCE_OPTIONS.EXTERNAL_SOURCE}
              onChange={() => events.selectOne(RESOURCE_OPTIONS.EXTERNAL_SOURCE)}
            />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default ResourceSelector
