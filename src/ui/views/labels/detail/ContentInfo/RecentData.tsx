import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'reactstrap'
import Avatar from '@core-components/avatar'
import { User } from 'react-feather'
import ReactApexChart from 'react-apexcharts'
import Chart from 'react-apexcharts'
import {
  barGraphOptions,
  barGraphSeries
} from '@ui/views/labels/detail/ContentInfo/barGraphData'
import {
  treeMapGraphOptions,
  treeMapGraphSeries
} from '@ui/views/labels/detail/ContentInfo/treeMapGraphData'
import { useStores } from '@src/stores'
import Select from 'react-select'
import { selectThemeColors } from '@ui/utility/Utils'
import classnames from 'classnames'

const mapOptions = [
  { value: 'tree', label: '트리맵 그래프' },
  { value: 'bar', label: '막대 그래프' }
]

type Props = { criterias: any }
/** ************************************************************************
 * name :
 * description :

 * todo 작성 필요
 *************************************************************************** */
function RecentData({ criterias }: Props) {
  const [currentMapOption, setCurrentMapOption] = useState({
    value: 'tree',
    label: '트리맵 그래프'
  })
  const [idSum, setIdSum] = useState<number>(0)
  const [adidSum, setAdidSum] = useState<number>(0)
  const [pidSum, setPidSum] = useState<number>(0)
  const [showTable, setShowTable] = useState<boolean>(false)
  let graphSeriesBar: any = barGraphSeries
  let graphOptionsBar: any = barGraphOptions
  const [graphBarData, setGraphBarData] = useState(graphSeriesBar)
  const [graphBarOption, setGraphBarOption] = useState(graphOptionsBar)
  let graphSeriesTreeMap: any = treeMapGraphSeries
  let graphOptionsTreeMap: any = treeMapGraphOptions
  const [graphTreeMapData, setGraphTreeMapData] = useState(graphSeriesTreeMap)
  const [criteriaWithName, setCriteriaWithName] = useState(null)
  const { userStore } = useStores()
  let newCriteria = JSON.parse(JSON.stringify(criterias))

  useEffect(() => {
    const numOfGames = 10
    let pidTempSum = 0
    let adidTempSum = 0
    graphSeriesBar = JSON.parse(JSON.stringify(barGraphSeries))
    graphOptionsBar = JSON.parse(JSON.stringify(barGraphOptions))
    graphSeriesTreeMap = JSON.parse(JSON.stringify(treeMapGraphSeries))
    graphOptionsTreeMap = JSON.parse(JSON.stringify(treeMapGraphOptions))
    newCriteria = JSON.parse(JSON.stringify(criterias))

    newCriteria.forEach((criteria: any) => {
      if (criteria.game_code) {
        criteria.game_code = `${
          userStore.games.find((element) => element.code === criteria.game_code)?.name
        } (${criteria.game_code})`
      }
      let idx = graphOptionsBar.xaxis.categories.findIndex(
        (x: any) => x === (criteria?.game_code ? criteria.game_code : '없음')
      )
      if (idx > -1) {
        graphSeriesTreeMap[0].data[idx].y += criteria.latest_data_count
        if (criteria.id_type === 'adid') {
          graphSeriesBar[1].data[idx] = criteria.latest_data_count
          adidTempSum += criteria.latest_data_count
        } else {
          graphSeriesBar[0].data[idx] = criteria.latest_data_count
          pidTempSum += criteria.latest_data_count
        }
      } else {
        if (graphOptionsBar.xaxis.categories.length <= numOfGames) {
          graphOptionsBar.xaxis.categories.push(
            graphOptionsBar.xaxis.categories.length === numOfGames
              ? '기타'
              : criteria.game_code
              ? criteria.game_code
              : '없음'
          )
          graphSeriesTreeMap[0].data.push({
            x:
              graphOptionsBar.xaxis.categories.length === numOfGames
                ? '기타'
                : criteria.game_code
                ? criteria.game_code
                : '없음',
            y: criteria.latest_data_count
          })
          if (criteria.id_type === 'adid') {
            graphSeriesBar[1].data.push(criteria.latest_data_count)
            graphSeriesBar[0].data.push(0)
            adidTempSum += criteria.latest_data_count
          } else {
            graphSeriesBar[0].data.push(criteria.latest_data_count)
            graphSeriesBar[1].data.push(0)
            pidTempSum += criteria.latest_data_count
          }
        } else {
          graphSeriesTreeMap[0].data[numOfGames].y += criteria.latest_data_count
          if (criteria.id_type === 'adid') {
            graphSeriesBar[1].data[numOfGames] += criteria.latest_data_count
            adidTempSum += criteria.latest_data_count
          } else {
            graphSeriesBar[0].data[numOfGames] += criteria.latest_data_count
            pidTempSum += criteria.latest_data_count
          }
        }
      }
    })
    graphSeriesTreeMap[0].data.forEach
    setAdidSum(adidTempSum)
    setPidSum(pidTempSum)
    setIdSum(pidTempSum + adidTempSum)
    setGraphBarData(graphSeriesBar)
    setGraphBarOption(graphOptionsBar)
    setGraphTreeMapData(graphSeriesTreeMap)
  }, [])

  return (
    <>
      <div className="border-top border-left border-right pt-2 pb-1 px-2 rounded-top">
        <Row>
          <Col xl="3" md="4" xs="12">
            <h4>레이블의 최근 데이터</h4>
          </Col>

          <Col xl="7" md="4" xs="12">
            <div className="d-flex align-content-center">
              <h5 className="align-self-center">총 {idSum.toLocaleString()} 건</h5>

              <Avatar color="light-primary" className="ml-3" icon={<User size={14} />} />
              <h6 className="align-self-center ml-1">{pidSum.toLocaleString()} 건</h6>

              <Avatar color="light-danger" className="ml-3" icon={<User size={14} />} />
              <h6 className="align-self-center ml-1">{adidSum.toLocaleString()} 건</h6>
            </div>
          </Col>

          <Col xl="2" md="4" xs="12">
            <div className="float-right font-small-3 text-primary cursor-pointer">
              <u onClick={() => setShowTable(!showTable)}>
                {showTable ? '그래프로 보기' : '테이블로 보기'}
              </u>
            </div>
          </Col>
        </Row>
      </div>

      {idSum === 0 && (
        <div
          className="border-left border-right border-bottom pb-2"
          style={{ textAlign: 'center' }}>
          <hr className="mx-1 mt-0" />
          데이터가 없습니다.
        </div>
      )}
      {idSum !== 0 && showTable && (
        <Table striped responsive className="border-left border-right border-bottom">
          <thead>
            <tr>
              <th>게임명 (코드)</th>
              <th>타입</th>
              <th>업데이트 시각</th>
              <th>데이터 수 (건)</th>
              <th>데이터 비율</th>
            </tr>
          </thead>
          <tbody>
            {newCriteria.map((criteria: any) => (
              <tr key={criteria.id}>
                <td>{criteria.game_code}</td>
                <td>
                  {criteria.id_type === 'pid' ? (
                    <Avatar
                      color="light-primary"
                      className="mr-1"
                      icon={<User size={14} />}
                    />
                  ) : (
                    <Avatar
                      color="light-danger"
                      className="mr-1"
                      icon={<User size={14} />}
                    />
                  )}
                  {criteria.id_type}
                </td>
                <td>{criteria.modified_datetime}</td>
                <td>{criteria.latest_data_count.toLocaleString()}</td>
                {/* @ts-ignore */}
                <td>{((criteria.latest_data_count / idSum) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {idSum !== 0 && !showTable && (
        <>
          <div id="chart" className="border-left border-right rounded-bottom px-2">
            <div className="d-flex align-items-center bg-light p-1 rounded justify-content-end">
              <div className="mr-1 text-primary font-weight-bolder ">보기 방법 : </div>
              <Select
                isClearable={false}
                theme={selectThemeColors}
                className={'react-select w-25'}
                classNamePrefix="select"
                options={mapOptions}
                value={currentMapOption}
                onChange={(data: any) => {
                  setCurrentMapOption(data)
                }}
              />
            </div>

            {/* @ts-ignore */}
            {currentMapOption.value === 'tree' ? (
              <Chart
                options={graphOptionsTreeMap}
                series={graphTreeMapData}
                type="treemap"
                height={350}
              />
            ) : (
              <>
                {/* @ts-ignore */}
                <Chart
                  className="mt-2"
                  options={graphBarOption}
                  series={graphBarData}
                  type="bar"
                />
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}

export default RecentData
