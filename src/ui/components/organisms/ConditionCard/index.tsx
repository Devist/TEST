import { ChevronDown, ChevronsDown, ChevronsUp, X } from 'react-feather'
import React, { useState } from 'react'
import { Row, Col, Button, CustomInput } from 'reactstrap'
import { DATA_RANGE_TYPE, ICondition, JOB_DATE } from '@src/entities'
import { useStores } from '@src/stores'
import DataRange from '@ui/components/organisms/ConditionCard/DataRange'
import { observer } from 'mobx-react'
import ResultFilter from '@ui/components/organisms/ConditionCard/ResultFilter'
import CriteriaFilter from '@ui/components/organisms/ConditionCard/CriteriaFilter'

type Props = {
  orIdx: number
  andIdx: number
  condition: ICondition
}

enum EXPAND_STATE {
  SUMMARY,
  EXPAND,
  FULL_EXPAND
}
const Label = () => (
  <>
    <span className="switch-icon-left">포함</span>
    <span className="switch-icon-right">미포함</span>
  </>
)

function ConditionCard({ condition, orIdx, andIdx }: Props) {
  const [expandState, setExpandState] = useState<EXPAND_STATE>(EXPAND_STATE.SUMMARY)
  const { segmentMakeupStore, userStore } = useStores()

  const [isToggled, setToggled] = useState(false)
  const toggleTrueFalse = () => setToggled(!isToggled)
  const events = {
    delete: () => segmentMakeupStore.deleteContents(orIdx, andIdx),
    expand: () => {
      const change = {
        [EXPAND_STATE.SUMMARY]: EXPAND_STATE.EXPAND,
        [EXPAND_STATE.EXPAND]: EXPAND_STATE.FULL_EXPAND,
        [EXPAND_STATE.FULL_EXPAND]: EXPAND_STATE.SUMMARY
      }
      setExpandState(change[expandState])
    }
  }

  const getDataRange = () => {
    const range = {
      [JOB_DATE.JOBDATE]: '최근',
      [JOB_DATE.TODAY]: `최근 ${condition.jobDateValue}일`,
      [JOB_DATE.NO_DATE]: '전체',
      [JOB_DATE.RANGE]: '최근',
      [JOB_DATE.DAY]: '헬로'
    }
    return range[condition.jobDate]
  }

  const render = {
    summaryAndHead: () => (
      <div className="sg-summary-and-header">
        <div className="d-flex justify-content-between">
          <span>
            {condition.gamecodes.map((code, idx2) => (
              <>
                {idx2 !== 0 && <span className="mr-little">,</span>}
                <span key={`game-in-label-${idx2}`} className="font-small-2">
                  {userStore.info.games.find((game) => game.code === code)?.name}
                </span>
              </>
            ))}
          </span>

          {/* 확대, 축소, 포함 처리 등 버튼 모음 */}
          <div className="d-flex align-items-center">
            <span className="include-switch mr-1">
              <CustomInput
                onClick={toggleTrueFalse}
                type="switch"
                id={`my-my-id=${Math.random()}`}
                name="hellow-rodlw-d"
                label={<Label />}
                defaultChecked
              />
            </span>
            {expandState === EXPAND_STATE.SUMMARY && (
              <span className="p-little cursor-pointer" onClick={events.expand}>
                <ChevronDown size={16} />
              </span>
            )}
            {expandState === EXPAND_STATE.EXPAND && (
              <span className="p-little cursor-pointer" onClick={events.expand}>
                <ChevronsDown size={16} />
              </span>
            )}
            {expandState === EXPAND_STATE.FULL_EXPAND && (
              <span className="p-little cursor-pointer" onClick={events.expand}>
                <ChevronsUp size={16} />
              </span>
            )}
            {/* 레이블 제거 아이콘 */}
            <span className="pl-0 p-little pr-0 cursor-pointer" onClick={events.delete}>
              <X size={16} />
            </span>
          </div>
        </div>
        {/* 요약 정보 */}
        <div className="d-flex">
          <div className="sg-context">{getDataRange()}</div>
          <div className="sg-context">데이터에서</div>
          <div className="sg-context">{condition.simpleDescription}</div>
        </div>
      </div>
    ),
    information: () => (
      <Row className="border-top m-0">
        <Col className="border-right p-1">
          <DataRange condition={condition} />
        </Col>
        <Col className="border-right p-1">
          <CriteriaFilter condition={condition} />
        </Col>
        <Col className="border-right p-1">
          <ResultFilter condition={condition} />
        </Col>
      </Row>
    ),

    // TODO 레이블에 대한 상세 정보 표출
    moreInformation: () => {}
  }

  return (
    <div className="sg-condition-box">
      {/* 헤더 - 레이블 요약 정보, 레이블을 적용할 게임 정보, 제어 버튼 등 */}
      {render.summaryAndHead()}

      {/* 컨텐츠 - 레이블 상세 정보 처리 */}
      {(expandState === EXPAND_STATE.EXPAND ||
        expandState === EXPAND_STATE.FULL_EXPAND) &&
        render.information()}
    </div>
  )
}

export default observer(ConditionCard)
