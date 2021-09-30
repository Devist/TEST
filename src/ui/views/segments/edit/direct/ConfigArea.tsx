import React, { useEffect, useRef, useState } from 'react'
import { useStores } from '@src/stores'
import { observer } from 'mobx-react'
import AndBox, { MODE_OPTION } from '@ui/views/segments/edit/direct/AndBox'

function ConfigArea() {
  const configArea = useRef<HTMLDivElement>(null)
  const labelToBeAdded = useRef<React.ReactNode>()
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [labels, setLabels] = useState()

  const { segmentMakeupStore } = useStores()
  const events = {
    onDrop: () => {
      console.log('drop')
      setIsDragging(false)
      segmentMakeupStore.addContents()
    },
    onDragOver: (e: any) => {
      e.preventDefault()
      // console.log('dragover')
      if (!isDragging) setIsDragging(true)
    },
    onDragLeave: (e: any) => {
      setIsDragging(false)
      console.log('leave 부모')
    },
    onDragExit: () => {
      console.log('exit')
      setIsDragging(false)
    }
  }

  useEffect(() => {
    console.log(isDragging)
  }, [isDragging])

  return (
    <div className="full-width h-100 sg-label-configuration-area">
      {/* And Box 영역 */}
      {segmentMakeupStore.contents.map((restoreContent, orIdx) => (
        <>
          {orIdx !== 0 && <div className="my-1 pl-1 font-weight-bolder">또는</div>}
          <AndBox key={`item-${orIdx}`} orIdx={orIdx} />
        </>
      ))}

      {/* Or 조건의 드래그 가이드 영역 */}
      <div
        className="full-width h-100"
        ref={configArea}
        onDragOver={events.onDragOver}
        onDragLeave={events.onDragLeave}
        onDragExit={events.onDragExit}
        onDrop={events.onDrop}>
        {isDragging && (
          <div className="pointer-events-none sg-drag-state">
            {segmentMakeupStore.contents.length !== 0 && isDragging && (
              <div className="sg-drag-state my-1 pl-1">또는</div>
            )}
            <AndBox orIdx={-1} mode={MODE_OPTION.DRAG} />
          </div>
        )}
      </div>
    </div>
  )
}

export default observer(ConfigArea)
