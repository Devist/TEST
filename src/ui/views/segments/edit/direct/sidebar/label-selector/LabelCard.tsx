import { Circle } from 'react-feather'
import { Badge } from 'reactstrap'
import React from 'react'
import { ILabel } from '@src/entities'
import { useStores } from '@src/stores'

type Props = {
  label: ILabel
}

/** ************************************************************************
 * name :
 * description :

 * todo 작성 필요
 *************************************************************************** */
function LabelCard({ label }: Props) {
  const { segmentMakeupStore } = useStores()

  const events = {
    updateDragInfo: () => {
      segmentMakeupStore.updateLabelToDrag(label)
    }
  }
  return (
    <div
      className="sg-label-card cursor-pointer"
      draggable="true"
      onDragStart={events.updateDragInfo}>
      <div className="d-flex align-items-center">
        <Circle size={10} className="mr-little" color="#00CFE8" fill="#00CFE8" />
        <div className="font-weight-bolder">{label.simpleDescription}</div>
      </div>
      <div className="d-flex align-items-center mt-little">
        <Badge color="light-primary" pill className="mr-little">
          {label.dataType}
        </Badge>
        <span className="font-small-2">{label.description}</span>
      </div>
    </div>
  )
}

export default LabelCard
