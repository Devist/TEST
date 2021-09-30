import {Bell, FileText, HelpCircle, Monitor, UserCheck} from 'react-feather'

export default [
  {
    header: '안내 및 가이드'
  },
  {
    id: 'notice',
    title: '공지사항',
    icon: <Bell size={20} />,
    navLink: '/notice'
  }, {
    id: 'faq',
    title: 'FAQ',
    icon: <HelpCircle size={20} />,
    navLink: '/faq'
  }, {
    id: 'guide',
    title: '사용자 가이드',
    icon: <Monitor size={20} />,
    navLink: '/user-guide'
  }, {
    id: 'marketing',
    title: '마케팅 사용 가이드',
    icon: <FileText size={20} />,
    navLink: '/market-guide'
  }
]
