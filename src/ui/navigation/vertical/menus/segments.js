import { PieChart, Box, Circle, Copy, Tag, Calendar } from 'react-feather'

export default [
  {
    header: '세그먼트'
  },
  {
    id: 'segments',
    title: '세그먼트',
    icon: <Box size={20} />,
    navLink:'/segments'
  },
  {
    id:'schedules',
    title:"스케쥴",
    icon:<Calendar />,
    navLink: '/segments/schedules'
  },
  {
    id:'templates',
    title:"템플릿",
    icon:<Copy />,
    navLink: '/segments/templates'
  }
]
