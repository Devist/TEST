import { ICondition } from '@src/entities'
import React, { useState } from 'react'
import { useStores } from '@src/stores'
import { ChevronDown, X } from 'react-feather'
import ConditionCard from '@ui/components/organisms/ConditionCard'
import { observer } from 'mobx-react'

export enum MODE_OPTION {
  DEFAULT,
  DRAG
}

type Props = {
  orIdx: number
  mode?: MODE_OPTION
}

function AndBox({ orIdx, mode = MODE_OPTION.DEFAULT }: Props) {
  const { segmentMakeupStore } = useStores()
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const events = {
    onDrop: () => {
      setIsDragging(false)
      segmentMakeupStore.addAndBox(orIdx)
    },
    onDragOver: (e: any) => {
      e.preventDefault()
      if (!isDragging) setIsDragging(true)
    },
    onDragLeave: (e: any) => {
      setIsDragging(false)
    }
  }

  const render = () => {
    return segmentMakeupStore.contents[orIdx].andBoxes.map((restoreContent, andIdx) => (
      <div key={`and-box-${andIdx}`}>
        {andIdx !== 0 && <div className="my-1 ml-2 font-weight-bolder">그리고</div>}
        <ConditionCard orIdx={orIdx} andIdx={andIdx} condition={restoreContent} />
      </div>
    ))
  }

  const renderDrag = () => {
    return (
      <div className="sg-condition-box">
        <div className="sg-summary-and-header">
          <div className="sg-context">
            {segmentMakeupStore.labelToDrag.simpleDescription}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="sg-and-box"
      onDragOver={events.onDragOver}
      onDragLeave={events.onDragLeave}
      onDrop={events.onDrop}>
      {mode === MODE_OPTION.DEFAULT ? render() : renderDrag()}

      {isDragging && (
        <>
          {segmentMakeupStore.contents.length !== 0 && (
            <div className="sg-drag-state my-1 ml-2">그리고</div>
          )}

          <div className="sg-condition-box">
            <div className="sg-summary-and-header">
              <div className="sg-context">
                {segmentMakeupStore.labelToDrag.simpleDescription}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default observer(AndBox)
