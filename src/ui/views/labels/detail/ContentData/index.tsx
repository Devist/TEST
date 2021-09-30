import React, { useEffect, useState } from 'react'

// ** 컴포넌트
import { Row, Col, Label } from 'reactstrap'

// ** 써드파티 컴포넌트
import Select from 'react-select'

// ** 커스텀 컴포넌트
import DailyData from '@ui/views/labels/detail/ContentData/DailyData'
import Records from '@ui/views/labels/detail/ContentData/Records'

// ** 비즈니스
import { selectThemeColors } from '@src/ui/utility/Utils'
import { useStores } from '@src/stores'

type Option = {
  value: string
  label: string
}

const iconOptions = [
  {
    value: 'records',
    label: '📊ㅤ업데이트(적재) 기록'
  },
  {
    value: 'data',
    label: '📅ㅤ일별 레이블 상세 데이터'
  }
]

type Props = {
  test?: boolean
}

/** ************************************************************************
 * name : 레이블 상세 페이지 - 데이터탭 컴포넌트
 * description :
 * 특정 레이블에 적재된 데이터를 크게 두가지 뷰로 볼 수 있습니다.
 * - 업데이트(적재) 기록
 * - 일별 레이블 상세 데이터
 *************************************************************************** */
function ContentData({ test = false }: Props) {
  const [currentOption, setCurrentOption] = useState<Option>(iconOptions[0])
  const { labelHistoryStore } = useStores()

  useEffect(() => {
    // test ? labelHistoryStore.isTest(test) : null
    labelHistoryStore.isTest(true)

    labelHistoryStore.fetchThirtyDays(20).then((response) => {
      console.log('결과는?', response)
    })
  }, [])

  // @ts-ignore
  return (
    <>
      <Row className="d-flex justify-content-between align-items-top">
        <Col className="mb-1" md="6" sm="12">
          <span className="font-small-3 ">
            레이블은 주기(보통 하루 단위)를 가지고 적재 됩니다.
          </span>
        </Col>
        <Col className="mb-1" xl="2" sm="12">
          <Label>보기</Label>
          <Select
            theme={selectThemeColors}
            className="react-select"
            classNamePrefix="select"
            defaultValue={iconOptions[0]}
            options={iconOptions}
            isClearable={false}
            onChange={(data: any) => setCurrentOption(data)}
          />
        </Col>
      </Row>
      {currentOption.value === 'records' ? <Records /> : <DailyData />}
    </>
  )
}

export default ContentData
