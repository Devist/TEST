import { CustomInput } from 'reactstrap'
import Select from 'react-select'
import { selectThemeColors } from '@ui/utility/Utils'
import React, { useEffect, useMemo, useState } from 'react'
import { IGame } from '@src/entities'
import { useStores } from '@src/stores'

type Option = {
  value: string
  label: string
}

type Props = {
  handler: (gameCodes: string[]) => void
}

const configureGameOptions = (games: IGame[]): Option[] => {
  return games.reduce((acc, game) => {
    acc.push({ value: game.code, label: game.name })
    return acc
  }, [] as Option[])
}

/** ************************************************************************
 * name :
 * description :

 * todo 작성 필요
 *************************************************************************** */
function GameSelector({ handler }: Props) {
  const { userStore, labelStore, segmentMakeupStore } = useStores()
  // ** states
  const [selected, setSelected] = useState<Option[]>()
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false)
  const [includeEndGames, setIncludeEndGames] = useState<boolean>(false)

  const gameOptions: Option[] = useMemo(
    () => configureGameOptions(userStore.info.games),
    [userStore.info.games]
  )

  useEffect(() => {
    labelStore.fetch()
  }, [])

  const events = {
    addOrDelete: (data: Option[]) => {
      setSelected(data)
      const gameCodes = data.map(function (item) {
        return item['value']
      })
      segmentMakeupStore.updateGames(data)
      handler(gameCodes)
    },
    selectAll: () => {
      setIsSelectedAll(true)
      handler(['allGames'])
    },
    selectOneOrMore: () => {
      setIsSelectedAll(false)
      const gameCodes = selected?.map(function (item) {
        return item['value']
      })
      handler(gameCodes ? gameCodes : [])
    }
  }

  return (
    <>
      <h5 className="font-weight-bolder mb-little">게임 선택</h5>
      <div>
        <CustomInput
          inline
          id="radio-criteria-game"
          name="radio-criteria-game"
          type="radio"
          label="특정 게임"
          checked={!isSelectedAll}
          onChange={events.selectOneOrMore}
        />

        <CustomInput
          inline
          id="radio-criteria-game-all"
          name="radio-criteria-game"
          type="radio"
          label="전체 게임"
          checked={isSelectedAll}
          onChange={events.selectAll}
        />

        <CustomInput
          inline
          type="checkbox"
          id="exampleCustomCheckbox"
          label="종료 게임 포함"
          onChange={() => setIncludeEndGames(!includeEndGames)}
        />
      </div>

      {!isSelectedAll && (
        <Select
          isClearable={false}
          theme={selectThemeColors}
          isMulti
          className="react-select m-little"
          classNamePrefix="select"
          size="small"
          options={gameOptions}
          defaultValue={selected}
          onChange={(data: any) => events.addOrDelete(data)}
          placeholder={<div className="text-muted">게임을 선택하세요</div>}
        />
      )}
    </>
  )
}

export default GameSelector
