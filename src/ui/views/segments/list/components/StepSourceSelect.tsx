import React, { useState } from 'react'
import CreateSourceCard from '@ui/components/molecules/CreateSourceCard'
import { CREATE_SOURCE } from '@src/entities'
import { useStores } from '@src/stores'
import { observer } from 'mobx-react'

function StepSourceSelect() {
  const selected = useState<CREATE_SOURCE>(CREATE_SOURCE.TEMPLATE)
  const { segmentMakeupStore } = useStores()

  const handlers = {
    changeToTemplate: () => segmentMakeupStore.changeCreateSource(CREATE_SOURCE.TEMPLATE),
    changeToCreate: () => segmentMakeupStore.changeCreateSource(CREATE_SOURCE.CREATE)
  }

  return (
    <>
      <CreateSourceCard
        type={CREATE_SOURCE.TEMPLATE}
        selected={segmentMakeupStore.createSource === CREATE_SOURCE.TEMPLATE}
        clickHandler={handlers.changeToTemplate}
      />
      <CreateSourceCard
        type={CREATE_SOURCE.CREATE}
        selected={segmentMakeupStore.createSource === CREATE_SOURCE.CREATE}
        clickHandler={handlers.changeToCreate}
      />
    </>
  )
}

export default observer(StepSourceSelect)
