export const treeMapGraphSeries = [
  {
    data: []
  }
]

export const treeMapGraphOptions = {
  legend: {
    show: false
  },
  chart: {
    height: 350,
    type: 'treemap',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '16px'
    },
    formatter: function (text: any, op: any) {
      return [text.split('(')[0], op.value.toLocaleString()]
    },
    offsetY: -6
  },
  colors: [
    '#3B93A5',
    '#F7B844',
    '#ADD8C7',
    '#EC3C65',
    '#CDD7B6',
    '#C1F666',
    '#D43F97',
    '#1E5D8C',
    '#421243',
    '#7F94B0',
    '#EF6537',
    '#C0ADDB'
  ],
  plotOptions: {
    treemap: {
      distributed: true,
      enableShades: false
    }
  }
}
