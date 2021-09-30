import { lazy } from 'react'

const SegmentsRoutes = [
  {
    path: '/segments/schedules',
    component: lazy(() => import('../../views/segments/schedules'))
  },
  {
    path: '/segments/templates',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/segments/templates'))
  },
  {
    path: '/segments/:id',
    component: lazy(() => import('@ui/views/segments/detail'))
  },
  {
    path: '/segments',
    component: lazy(() => import('../../views/segments/list'))
  },
  {
    path: '/segment/edit',
    component: lazy(() => import('../../views/segments/edit'))
  },
  {
    path: '/segment/edit/template',
    component: lazy(() => import('../../views/segments/edit'))
  }
]

export default SegmentsRoutes
