import { lazy } from 'react'
import SegmentsRoutes from './segments'
import LabelRoutes from './labels'
import ProfileRoutes from './profiles'
import CustomerRoutes from './customers'

import Auth from '../AuthenticationCheck'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  ...SegmentsRoutes,
  ...LabelRoutes,
  ...ProfileRoutes,
  ...CustomerRoutes,
  {
    path: '/home',
    component: lazy(() => import('../../views/dashboards/home'))
  },
  {
    path: '/dashboard/analytics',
    component: lazy(() => import('../../views/dashboards/statistics'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/errors/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, Routes }
