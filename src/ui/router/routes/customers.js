import { lazy } from 'react'

const CustomerRoutes = [
  {
    path: '/user-guide',
    component: lazy(() => import('../../views/guidances/guide'))
  },
  {
    path: '/market-guide',
    component: lazy(() => import('../../views/guidances/market-guide'))
  },
  {
    path: '/faq',
    component: lazy(() => import('../../views/guidances/faq'))
  },
  {
    path: '/notice',
    component: lazy(() => import('../../views/guidances/notice'))
  }
]

export default CustomerRoutes
