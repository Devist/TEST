import { cloneElement } from 'react'
import { PERMISSIONS } from './permission-maps'
import { useStores } from '@src/stores'

const hasPermission = ({ permissions, scopes }) => {
  const scopesMap = {}

  scopes.forEach((scope) => {
    scopesMap[scope] = true
  })

  return permissions.some((permission) => scopesMap[permission])
}

export function PermissionsGate({
  children,
  RenderError = () => <></>,
  errorProps = null,
  scopes = []
}) {
  const { userStore } = useStores()
  const role = userStore.role
  // console.log('권한', role)
  const permissions = PERMISSIONS[role]

  const permissionGranted = hasPermission({ permissions, scopes })
  if (!permissionGranted) return <RenderError />
  if (permissionGranted && errorProps) return cloneElement(children, { ...errorProps })

  return <>{children}</>
}
