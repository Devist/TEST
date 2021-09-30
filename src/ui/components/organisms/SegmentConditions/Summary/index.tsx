import React from 'react'

// ** 써드파티 컴포넌트
import classnames from 'classnames'

// 커스텀 컴포넌트
import ConditionSummary from '@ui/components/atoms/ConditionSummary'
import DisplayBox from '@ui/components/atoms/DisplayBox'
import And from '@ui/components/atoms/And'
import Or from '@ui/components/atoms/Or'

type Props = {
  className?: string
}

/** ************************************************************************
 * name :
 * description :

 * todo 작성 필요
 *************************************************************************** */
function SegmentConditionSummary({ className }: Props) {
  return (
    <div className={classnames(className)}>
      <DisplayBox className="condition-box">
        <ConditionSummary>7일 연속 방문</ConditionSummary>
      </DisplayBox>
      <And className="mt-little mb-little" type="summary" />
      <DisplayBox className="condition-box">
        <ConditionSummary>최근</ConditionSummary>
        <ConditionSummary>7일</ConditionSummary>
        <ConditionSummary>동안</ConditionSummary>
        <ConditionSummary>누적과금액</ConditionSummary>
        <ConditionSummary>240만원</ConditionSummary>
        <ConditionSummary>이상</ConditionSummary>
      </DisplayBox>
      <Or className="mt-little mb-little" type="summary" />
      <DisplayBox className="condition-box">
        <ConditionSummary>
          6일 동안 매일 접속한 유저 중 향후 7일간 단골로 안착할 것으로 예측
        </ConditionSummary>
      </DisplayBox>
    </div>
  )
}

export default SegmentConditionSummary
