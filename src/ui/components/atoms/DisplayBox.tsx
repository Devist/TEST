import React from 'react'
import classnames from 'classnames'
type Props = {
  className?: string
  children?: React.ReactNode
}

/** ************************************************************************
 * name : 디스플레이 박스 컴포넌트
 * description : 디스플레이 박스로, 세그먼트 상세정보, 레이블 상세정보 등
 * 다양한 곳에서 사용됩니다.
 *************************************************************************** */
function DisplayBox({ className, children }: Props) {
  return (
    <div>
      <div className={classnames('display-box border-1 rounded', className)}>
        {children}
      </div>
    </div>
  )
}

export default DisplayBox
