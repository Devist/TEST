import { lazy } from 'react'

const ProfileRoutes = [
  {
    path: '/profiles',
    component: lazy(() => import('../../views/profiles'))
  }
]

export default ProfileRoutes
