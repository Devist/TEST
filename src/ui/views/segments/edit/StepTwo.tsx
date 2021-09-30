import React from 'react'
import Direct from '@ui/views/segments/edit/direct'

/** ************************************************************************
 * name : 세그먼트 생성/수정 페이지 - 2단계 (세그먼트 구성)
 * description :
 * - 세그먼트 타이틀(simpleDescription)
 * - 세그먼트 설명(description)
 * - 집계 기준 선택
 * 을 할 수 있습니다.
 *
 * TODO 템플릿을 통한 세그먼트 생성에 대하여, Direct 가 아닌 Template 컴포넌트를 보여줄 수 있도록 분기처리 하여야 함
 *************************************************************************** */
function StepTwo() {
  return (
    <div className="p-1" id="configuration-segment-area">
      <h3>Step 2. 세그먼트 구성</h3>
      <br />
      <Direct />
    </div>
  )
}

export default StepTwo
