import React from 'react'
import classnames from 'classnames'

type Props = {
  className?: string
  children?: React.ReactNode
}

/** ************************************************************************
 * name : (세그먼트) 조건 요약 정보 컴포넌트
 * description : 세그먼트를 구성하는 레이블 중 각 레이블의 조건 설정 정보를
 * 요약하여 표시해 줍니다.
 * todo type 에 따라 다른 디스플레이 보여주도록 함
 *************************************************************************** */
function ConditionSummaryBox({ className, children }: Props) {
  return (
    <div
      className={classnames(
        'rounded-sm w-fit bg-disabled p-little m-little font-weight-bolder text-body-heading',
        className
      )}>
      {children}
    </div>
  )
}

export default ConditionSummaryBox
