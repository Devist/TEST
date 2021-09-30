import { Col, FormGroup, Label, Input, CustomInput, FormFeedback } from 'reactstrap'
import React from 'react'
import { ID_TYPE } from '@src/entities'
import { useStores } from '@src/stores'
import { observer } from 'mobx-react'

/** ************************************************************************
 * name : 세그먼트 생성/수정 페이지 - 1단계 (정보 작성)
 * description :
 * - 세그먼트 타이틀(simpleDescription)
 * - 세그먼트 설명(description)
 * - 집계 기준 선택
 * 을 할 수 있습니다.
 *
 *************************************************************************** */
function StepOne() {
  const { segmentMakeupStore } = useStores()

  return (
    <div className="p-1">
      <h3>Step 1. 정보 작성</h3>
      <br />
      <br />

      {/* 세그먼트 명 */}
      <FormGroup row>
        <Label sm="2" for="input-segment-name">
          세그먼트 타이틀 *
        </Label>
        <Col sm="9" md="6">
          <Input
            type="text"
            placeholder="세그먼트 이름을 입력하세요."
            valid={segmentMakeupStore.name.length > 2}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              segmentMakeupStore.updateName(e.target.value)
            }
          />
          <FormFeedback valid>좋습니다! 사용 가능한 세그먼트 이름입니다.</FormFeedback>
        </Col>
      </FormGroup>
      <br />

      {/* 세그먼트 설명 */}
      <FormGroup row>
        <Label sm="2" for="input-segment-description">
          설명
        </Label>
        <Col sm="9" md="6">
          <Input
            type="textarea"
            name="text"
            id="input-segment-description"
            rows="3"
            placeholder="세그먼트 설명을 입력하세요."
          />
        </Col>
      </FormGroup>
      <br />

      {/* 집계 기준 선택 */}
      <FormGroup row>
        <Label sm="2" for="input-segment-description">
          집계 기준 선택
        </Label>
        <Col sm="9" md="6">
          <CustomInput
            id="radio-criteria-ids-1"
            className="mt-little"
            name="radio-criteria-ids"
            type="radio"
            checked={segmentMakeupStore.idType === ID_TYPE.PID}
            label="PID"
            onChange={() => segmentMakeupStore.toggleIdType()}
          />

          <CustomInput
            id="radio-criteria-ids-2"
            className="mt-1"
            name="radio-criteria-ids"
            type="radio"
            label="ADID (마케팅용, 국가 및 운영체제 필터 가능)"
            checked={segmentMakeupStore.idType === ID_TYPE.ADID}
            onChange={() => segmentMakeupStore.toggleIdType()}
          />
          <li className="mt-1 font-small-3 text-primary">
            세그먼트의 모든 결과값이 {segmentMakeupStore.idType} 를 기준으로 생성됩니다.
          </li>
        </Col>
      </FormGroup>
    </div>
  )
}

export default observer(StepOne)
