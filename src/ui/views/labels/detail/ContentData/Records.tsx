import React, { useState } from 'react'
import Chart from 'react-apexcharts'
import { useStores } from '@src/stores'
import { ID_TYPE } from '@src/entities'
import { observer } from 'mobx-react'

/** ************************************************************************
 * name :
 * description :

 * todo 작성 필요
 *************************************************************************** */
function Records() {
  const [selected, setSelected] = useState(29)
  const { labelHistoryStore } = useStores()

  const series = [
    {
      name: 'ADID',
      data: labelHistoryStore.getData(ID_TYPE.ADID)
    },
    {
      name: 'PID',
      data: labelHistoryStore.getData(ID_TYPE.PID)
    }
  ]

  const columnColors = {
    series1: '#d2b0ff',
    series2: '#826af9',
    bg: '#f8d3ff'
  }

  const categories = labelHistoryStore.categories

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: true
      },
      events: {
        click: function (event: any, chartContext: any, config: any) {
          if (config.dataPointIndex > -1) setSelected(config.dataPointIndex)
        },
        mounted: (chartContext: any, config: any) => {
          console.log('mounted', chartContext, config, config.globals.yRange)
          const seriesTotals = config.globals.stackedSeriesTotals
          setTimeout(() => {
            try {
              categories.forEach((category, index) => {
                chartContext.addPointAnnotation(
                  {
                    y: seriesTotals[index],
                    x: category,
                    label: {
                      text: `${seriesTotals[index]}`
                    }
                  },
                  false
                )
              })
              chartContext.toggleDataPointSelection(1, 29)
            } catch (error) {
              console.log(`Add point annotation error: ${error.message}`)
            }
          })
        },
        updated: (chartContext: any, config: any) => {
          console.log('updated', chartContext, config, config.globals.yRange)
          const seriesTotals = config.globals.stackedSeriesTotals
          setTimeout(() => {
            try {
              categories.forEach((category, index) => {
                chartContext.addPointAnnotation(
                  {
                    y: seriesTotals[index],
                    x: category,
                    label: {
                      text: `${seriesTotals[index]}`
                    }
                  },
                  false
                )
              })
            } catch (error) {
              console.log(`Add point annotation error: ${error.message}`)
            }
          })
        }
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10
      }
    },
    colors: [columnColors.series1, columnColors.series2],
    xaxis: {
      type: 'category',
      categories: categories
    },
    yaxis: {
      labels: {
        formatter: function (val: any) {
          return val.toLocaleString()
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    },
    fill: {
      opacity: 1
    },
    markers: {
      size: 6,
      strokeWidth: 3,
      fillOpacity: 0,
      strokeOpacity: 0,
      hover: {
        size: 8
      }
    },
    noData: {
      text: '데이터 처리중입니다...'
    }
  }

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h5>
          {`${categories[selected]} 적재 `}
          <strong className="font-medium-5 mr-little" style={{ color: '#FF435F' }}>
            {(series[0].data[selected] + series[1].data[selected]).toLocaleString()}
          </strong>
          건
        </h5>
        <div>
          <span className="font-small-3 mr-little">
            <span className="mr-little">PID</span>
            <strong style={{ color: '#FF435F' }}>
              {series[1].data[selected]?.toLocaleString()}
            </strong>
          </span>
          <span className="font-small-3 mr-little">
            <span className="mr-little">ADID</span>
            <strong style={{ color: '#FF435F' }}>
              {series[0].data[selected]?.toLocaleString()}
            </strong>
          </span>
        </div>
      </div>
      <div className="col mixed-chart">
        {/* @ts-ignore */} {/* prettier-ignore  */}
        <Chart options={options} series={[...series]} type="bar" height={500} />
      </div>
    </>
  )
}

export default observer(Records)
