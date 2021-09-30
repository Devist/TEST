import React, { memo, useState } from 'react'
import { Input, Label } from 'reactstrap'
import classnames from 'classnames'

type Props = {
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
  length: number
  label?: string
  lines?: number
  needLabel?: boolean
  placeholder?: string
}

/** ************************************************************************
 * name :
 * description :

 * todo 작성 필요
 *************************************************************************** */
function Textarea({
  text = '',
  length,
  needLabel = false,
  label = '',
  placeholder = '',
  setText,
  lines = 3
}: Props) {
  const [value, setValue] = useState(text)
  return (
    <>
      <div className="form-label-group mb-0">
        <Input
          type="textarea"
          name="text"
          rows={lines}
          value={value}
          placeholder={placeholder}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value)
            setText(e.target.value)
          }}
        />
        {needLabel && <Label>{label}</Label>}
      </div>
      <span
        className={classnames('textarea-counter-value float-right', {
          'bg-danger': value.length > length
        })}>
        {`${value.length}/${length}`}
      </span>
    </>
  )
}

export default memo(Textarea)
