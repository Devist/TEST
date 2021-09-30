import { lazy } from 'react'

const LabelRoutes = [
  // {
  //   path: '/labels/suggest',
  //   component: lazy(() => import('../../views/labels/suggest'))
  // },
  {
    path: '/labels/:id',
    component: lazy(() => import('@ui/views/labels/detail'))
  },
  {
    path: '/labels',
    className: 'ecommerce-application',
    component: lazy(() => import('@src/ui/views/labels/list'))
  }
]

export default LabelRoutes
