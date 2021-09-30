import React, { useEffect, useState } from 'react'

// ** 컴포넌트
import { Card, CardBody, Row, Col, CustomInput, Button } from 'reactstrap'

// ** 써드파티 컴포넌트
import classnames from 'classnames'

// ** 데이터
import { aggregationFilter, bestKeywords, dataTypeFilter } from './filters'

// ** 비즈니스
import { AGGREGATE_BASE_1, DATA_TYPE } from '@src/entities'
import { useStores } from '@src/stores'

type keywordOption = {
  title: string
  total: number
  checked: boolean
}

type Props = {
  sidebarOpen: boolean // 반응형(모바일)에서의 처리,
  onAggregationFilterClicked: (aggregation: AGGREGATE_BASE_1 | number) => void
  onDataTypeFilterClicked: (datatype: DATA_TYPE | string) => void
  onInitFilterButtonClicked: () => void
  onKeywordFilterClicked: (keyword: string, checked: boolean) => void
}

/** ************************************************************************
 * name :  레이블 리스트 조회 페이지 - 사이드바(필터) 컴포넌트
 * description :
 * 레이블 리스트에 대해
 * - 집계 기준 / 결과 타입 /키워드
 * 기준으로 필터링하여 리스트를 보여줄 수 있도록 해줍니다.
 *************************************************************************** */
function Sidebar({
  sidebarOpen,
  onAggregationFilterClicked,
  onDataTypeFilterClicked,
  onInitFilterButtonClicked,
  onKeywordFilterClicked
}: Props) {
  const [keywords, setKeywords] = useState(bestKeywords)

  const { labelStore } = useStores()

  useEffect(() => {
    setKeywords(
      bestKeywords.reduce((acc: keywordOption[], currentKeyword) => {
        const newKeyword = currentKeyword
        newKeyword.total = labelStore.getLengthFromKeyword(newKeyword.title).length
        acc.push(newKeyword)
        return acc
      }, [] as keywordOption[])
    )
  }, [])

  const events = {
    handleAggregationFilter: (e: React.ChangeEvent<HTMLInputElement>) => {
      onAggregationFilterClicked(parseInt(e.target.value))
    },
    handleDataTypeFilter: (e: React.ChangeEvent<HTMLInputElement>) => {
      onDataTypeFilterClicked(e.target.value)
    },
    handleInitButtonClicked: () => {
      ;(document.getElementById(aggregationFilter[0].id) as HTMLInputElement).checked =
        true
      ;(document.getElementById(dataTypeFilter[0].id) as HTMLInputElement).checked = true
      onInitFilterButtonClicked()
    },
    handleKeywordFilterClicked: (keyword: string, checked: boolean) => {
      onKeywordFilterClicked(keyword, checked)
    }
  }

  return (
    <>
      <div className="sidebar">
        <div
          className={classnames('sidebar-shop', {
            show: sidebarOpen
          })}>
          <Row>
            <Col sm="12">
              <h6 className="filter-heading d-none d-lg-block">필터</h6>
            </Col>
          </Row>
          <Card>
            <CardBody>
              {/* 집계 기준 필터 */}
              <div>
                <h6 className="filter-title mt-0">집계 기준</h6>
                <ul className="list-unstyled price-range">
                  {aggregationFilter.map((filter) => {
                    return (
                      <li key={`aggregation-filter-${filter.id}`}>
                        <CustomInput
                          id={filter.id}
                          name="aggregation-radio"
                          type="radio"
                          value={filter.value}
                          label={filter.title}
                          defaultChecked={filter.defaultChecked}
                          onClick={(e: React.ChangeEvent<HTMLInputElement>) =>
                            events.handleAggregationFilter(e)
                          }
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* 결과 타입 필터 */}
              <div>
                <h6 className="filter-title">결과 타입</h6>
                <ul className="list-unstyled categories-list">
                  {dataTypeFilter.map((dataType) => {
                    return (
                      <li key={`datatype-filter-${dataType.id}`}>
                        <CustomInput
                          type="radio"
                          id={dataType.id}
                          label={dataType.title}
                          value={dataType.value}
                          name="datatype-radio"
                          defaultChecked={dataType.defaultChecked}
                          onClick={(e: React.ChangeEvent<HTMLInputElement>) =>
                            events.handleDataTypeFilter(e)
                          }
                        />
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div className="brands">
                <h6 className="filter-title">키워드</h6>
                <ul
                  className="list-unstyled brand-list"
                  onChange={(e: React.ChangeEvent<HTMLUListElement>) =>
                    events.handleKeywordFilterClicked(
                      e.target.id,
                      (e.target as unknown as HTMLInputElement).checked
                    )
                  }>
                  {keywords.map((keyword) => {
                    return (
                      <li key={keyword.title}>
                        <CustomInput
                          type="checkbox"
                          id={keyword.title}
                          label={keyword.title}
                          defaultChecked={keyword.checked}
                        />
                        <span>{keyword.total}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div id="clear-filters">
                <Button
                  color="primary"
                  block
                  onClick={() => events.handleInitButtonClicked()}>
                  필터 초기화
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Sidebar
