import React, { useEffect, useState } from 'react'
import GameSelector from '@ui/views/segments/edit/direct/sidebar/GameSelector'
import ResourceSelector from '@ui/views/segments/edit/direct/sidebar/ResourceSelector'
import LabelSelector from '@ui/views/segments/edit/direct/sidebar/label-selector'
import { useStores } from '@src/stores'

export enum RESOURCE_OPTIONS {
  LABELS,
  EXTERNAL_SOURCE
}

/** ************************************************************************
 * name :
 * description :

 * todo 작성 필요
 *************************************************************************** */
function Sidebar() {
  const [selectedGameCodes, setSelectedGameCodes] = useState<string[]>([])
  const [selectedResource, setSelectedResource] = useState<RESOURCE_OPTIONS>(
    RESOURCE_OPTIONS.LABELS
  )

  const handlers = {
    setSelectedGameCodes: (gameCodes: string[]) => setSelectedGameCodes(gameCodes),
    setSelectedResource: (resource: RESOURCE_OPTIONS) => setSelectedResource(resource)
  }

  useEffect(() => {}, [selectedGameCodes])

  useEffect(() => {
    window.scrollTo({
      // @ts-ignore
      top: document.querySelector('#configuration-segment-area').offsetTop + 65,
      behavior: 'smooth'
    })
  }, [selectedGameCodes, selectedResource])

  return (
    <>
      <div className="select-filters">
        <GameSelector handler={handlers.setSelectedGameCodes} />
      </div>

      {selectedGameCodes.length > 0 && (
        <ResourceSelector
          selected={selectedResource}
          handler={handlers.setSelectedResource}
        />
      )}

      {selectedGameCodes.length > 0 && selectedResource === RESOURCE_OPTIONS.LABELS && (
        <LabelSelector />
      )}
    </>
  )
}
export default Sidebar
