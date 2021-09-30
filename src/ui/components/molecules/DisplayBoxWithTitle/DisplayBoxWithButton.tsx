import React from 'react'

import DisplayBox from '@ui/components/atoms/DisplayBox'
type Props = {
  className?: string
  title: string
  button: any
  children?: React.ReactNode
}

/** ************************************************************************
 * name :
 * description :

 * todo 작성 필요
 *************************************************************************** */
function DisplayBoxWithButton({ className, title, button, children }: Props) {
  return (
    <div>
      <div
        className="font-small-3 d-flex align-items-end"
        style={{ marginTop: '-0.5rem' }}>
        {title}
        <div className="flex-grow-1" />
        {button}
      </div>
      <DisplayBox className={`${className} mt-little`}>{children}</DisplayBox>
    </div>
  )
}

export default DisplayBoxWithButton
