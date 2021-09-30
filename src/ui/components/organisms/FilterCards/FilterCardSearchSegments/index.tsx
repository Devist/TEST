import React, { memo, useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react'

// ** 컴포넌트
import { Card, CardHeader, CardTitle, CardBody, Col, Row } from 'reactstrap'

// ** 써드파티 컴포넌트
import Select from 'react-select'

// ** 커스텀 컴포넌트
import options from './options.json'

// ** 유틸
import { selectThemeColors } from '@ui/utility/Utils'

// ** 비즈니스
import { useStores } from '@src/stores'
import { ID_TYPE, IGame } from '@src/entities'

type Props = {
  changeHandler: (gameCode: string, idType: ID_TYPE, manager: string) => void
}

type Option = {
  value: string
  label: string
}

type IdOption = {
  value: ID_TYPE
  label: string
}

const configureGameOptions = (games: IGame[]): Option[] => {
  let options = games.reduce((acc, game) => {
    acc.push({ value: game.code, label: game.name })
    return acc
  }, [] as Option[])
  options.unshift({ value: 'all', label: '모든 게임' })
  return options
}

/** ************************************************************************
 * name :
 * description :

 * todo 작성 필요
 *************************************************************************** */
function FilterCardSearchSegments({ changeHandler }: Props) {
  // ** state
  // @ts-ignore
  const [currentIdType, setCurrentIdType] = useState<IdOption>(options.initIdTypeOption)
  const [currentManager, setCurrentManager] = useState<Option>(options.initManagerOption)
  const [currentGame, setCurrentGame] = useState<Option>(options.initGameOption)

  const { userStore } = useStores()

  // ** 프로필 필터 옵션
  const idTypeOptions = options.idTypeOptions
  const managerOptions = options.managerOptions
  const gameOptions: Option[] = useMemo(
    () => configureGameOptions(userStore.info.games),
    [userStore.info.games]
  )

  /**
   * 조회 요청시, 부모로부터 받은 처리를 수행합니다.
   */
  useEffect(() => {
    changeHandler(currentGame.value, currentIdType.value, currentManager.value)
  }, [currentGame.value, currentIdType.value, currentManager.value])

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">세그먼트</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            {/* 게임 선택 */}
            <Col className="my-md-0 my-1" md="4">
              <Select
                isClearable={false}
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                options={gameOptions}
                value={currentGame}
                onChange={(data: any) => {
                  setCurrentGame(data)
                }}
              />
            </Col>

            {/* ID 종류 선택 */}
            <Col md="4">
              <Select
                isClearable={false}
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                // @ts-ignore
                options={idTypeOptions}
                value={currentIdType}
                onChange={(data: any) => {
                  setCurrentIdType(data)
                }}
              />
            </Col>

            {/* 담당자 선택 */}
            <Col md="4">
              <Select
                isClearable={false}
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                options={managerOptions}
                value={currentManager}
                onChange={(data: any) => {
                  setCurrentManager(data)
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  )
}

export default memo(observer(FilterCardSearchSegments))
