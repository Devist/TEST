import React, { memo, useMemo, useState } from 'react'

// ** 컴포넌트
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Col,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Label,
  Row
} from 'reactstrap'

// ** 써드파티 컴포넌트
import Select, { components } from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'

// ** 유틸
import { selectThemeColors } from '@ui/utility/Utils'

// ** 비즈니스
import { useStores } from '@src/stores'
import { IGame } from '@src/entities'

// ** 기타
import options from './options.json'

type Props = {
  clickHandler: (type: string, gameCode: string, id: string) => void
}

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

/** ************************************************************************
 * 프로필 검색 필터 카드
 *
 * @param clickHandler 검색 버튼을 눌렀을 때 처리할 handler
 *************************************************************************** */
function FilterCardSearchProfile({ clickHandler }: Props) {
  // ** state
  const [isStarted, setIsStarted] = useState<Boolean>(false)
  const [currentIdType, setCurrentIdType] = useState<Option>(options.initIdTypeOption)
  const [currentGame, setCurrentGame] = useState<Option>()
  const [enteredID, setEnteredId] = useState<string>('')

  const { userStore } = useStores()

  const { register, errors, handleSubmit, control } = useForm()

  // ** 프로필 필터 옵션
  const idTypeOptions = options.idTypeOptions
  const gameOptions: Option[] = useMemo(
    () => configureGameOptions(userStore.info.games),
    [userStore.info.games]
  )

  // ** 인터페이스 처리
  const events = {
    /**
     * 최초 submit 시, 조회 요청이 시작되었음을 확인하여 validation 이 실행되도록 합니다.
     */
    checkStart: () => {
      if (!isStarted) setIsStarted(true)
    },

    /**
     * 조회 요청시, 부모로부터 받은 처리를 수행합니다.
     */
    clickHandler: () => {
      if (currentGame) clickHandler(currentIdType.value, currentGame.value, enteredID)
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">프로필 조회</CardTitle>
        </CardHeader>
        <CardBody className="mt-1">
          <Form onSubmit={handleSubmit(events.clickHandler)}>
            <Row className="justify-content-md-center">
              {/* ID 종류 선택 */}
              <Col md="2">
                <Select
                  isClearable={false}
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  options={idTypeOptions}
                  value={currentIdType}
                  onChange={(data: any) => setCurrentIdType(data)}
                />
              </Col>

              {/* 게임 선택 */}
              <Col className="my-md-0 my-1" md="4">
                <FormGroup>
                  <Controller
                    name="GameToLookup"
                    control={control}
                    render={() => (
                      <Select
                        isClearable={false}
                        theme={selectThemeColors}
                        className={classnames('react-select', {
                          'is-invalid': isStarted && !currentGame
                        })}
                        classNamePrefix="select"
                        options={gameOptions}
                        onChange={(data: any) => setCurrentGame(data)}
                        placeholder={<div className="text-muted">게임을 선택하세요</div>}
                      />
                    )}
                  />
                  <FormFeedback>게임은 필수 선택입니다.</FormFeedback>
                </FormGroup>
              </Col>

              {/* ID 입력 */}
              <Col md="4">
                <FormGroup className="form-label-group">
                  <Label for="IdToLookup">조회할 ID를 입력하세요.</Label>
                  <Input
                    id="IdToLookup"
                    name="IdToLookup"
                    placeholder="조회할 ID를 입력하세요"
                    innerRef={register({ required: true, minLength: 32, maxLength: 32 })}
                    invalid={errors.IdToLookup && true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEnteredId(e.target.value)
                    }
                  />
                  <span
                    className={classnames('textarea-counter-value float-right', {
                      'bg-danger': (errors.IdToLookup && true) || enteredID.length > 32
                    })}>
                    {`${enteredID.length}/32`}
                  </span>
                  <FormFeedback>ID는 영문+숫자 조합의 32글자입니다</FormFeedback>
                </FormGroup>
              </Col>

              {/* 조회 버튼 */}
              <Col md="2">
                <Button color="primary" type="submit" onClick={events.checkStart}>
                  조회
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  )
}

export default memo(FilterCardSearchProfile)
