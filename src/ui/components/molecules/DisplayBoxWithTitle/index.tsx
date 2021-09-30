import React from 'react'
import DisplayBox from '@ui/components/atoms/DisplayBox'

type Props = {
  title: string
  className?: string
  children?: React.ReactNode
}

/** ************************************************************************
 * name :
 * description :

 * todo 작성 필요
 *************************************************************************** */
function DisplayBoxWithTitle({ className, title, children }: Props) {
  return (
    <div>
      <div className="font-small-3">{title}</div>
      <DisplayBox className={className + ' mt-little'}>{children}</DisplayBox>
    </div>
  )
}

export default DisplayBoxWithTitle
