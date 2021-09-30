import {PieChart, Box, Circle, Copy, Tag, Calendar, FileText} from 'react-feather'

export default [
  {
    header: '레이블'
  },
  {
    id: 'label',
    title: '레이블',
    icon: <Copy size={20} />,
    navLink:'/labels'
  },
  {
    id:'suggest',
    title:"신규제안",
    icon:<FileText />,
    navLink: ''
  }
]
