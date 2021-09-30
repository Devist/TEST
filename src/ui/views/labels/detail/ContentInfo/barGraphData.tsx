export const barGraphSeries = [
  {
    name: 'pid',
    data: []
  },
  {
    name: 'adid',
    data: []
  }
]

export const barGraphOptions = {
  chart: {
    type: 'bar',
    toolbar: {
      show: false
    }
  },
  fill: {
    colors: ['#00CFE8', '#28D093']
  },
  plotOptions: {
    bar: {
      horizontal: true,
      dataLabels: {
        position: 'top'
      },
      barHeight: 70,
      columnWidth: 100,
      borderRadius: 15
    }
  },
  dataLabels: {
    enabled: true,
    offsetX: -6,
    style: {
      fontSize: '12px',
      colors: ['#000']
    },
    formatter: function (val: any, opts: any) {
      return val == 0 ? val.toLocaleString() : ''
    }
  },
  stroke: {
    show: true,
    width: 1,
    colors: ['#fff']
  },
  tooltip: {
    shared: true,
    intersect: false
  },
  xaxis: {
    categories: [],
    labels: {
      formatter: function (val: any) {
        return val.toLocaleString()
      }
    }
  },
  yaxis: {
    labels: {
      maxWidth: 180,
      style: {
        fontFamily: 'Helvetica, Arial, sans-serif',
        cssClass: 'apexcharts-yaxis-label'
      }
    }
  },
  legend: {
    position: 'top',
    fontSize: '14px',
    markers: {
      fillColors: ['#00CFE8', '#28D093']
    }

    // horizontalAlign: 'left'
  }
}
