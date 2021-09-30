import Select from 'react-select'
import { selectThemeColors } from '@ui/utility/Utils'
import classnames from 'classnames'
import React, { useEffect, useMemo, useState } from 'react'
import { IGame } from '@src/entities'
import { useStores } from '@src/stores'

type Option = {
  value: string
  label: string
}

const configureGameOptions = (games: IGame[]): Option[] => {
  return games.reduce((acc, game) => {
    acc.push({ value: game.code, label: game.name })
    return acc
  }, [] as Option[])
}

function StepTemplateOne() {
  const [currentGame, setCurrentGame] = useState<Option>()
  const { userStore, segmentMakeupStore } = useStores()

  const gameOptions: Option[] = useMemo(
    () => configureGameOptions(userStore.info.games),
    [userStore.info.games]
  )

  useEffect(() => {
    if (currentGame) segmentMakeupStore.initGame(currentGame)
  }, [currentGame])

  return (
    <>
      <Select
        // isClearable={false}
        theme={selectThemeColors}
        className={classnames('react-select half-width mb-4', {
          'is-invalid': !currentGame
        })}
        classNamePrefix="select"
        options={gameOptions}
        onChange={(data: any) => setCurrentGame(data)}
        placeholder={<div className="text-muted">게임을 선택하세요</div>}
      />
    </>
  )
}

export default StepTemplateOne
