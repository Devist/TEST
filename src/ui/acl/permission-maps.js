export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  ALLGAMEUSER: 'all_games_user'
}

export const CAN = {
  MANAGE_NOTICE: 'manage-notice'
  // CAN_EDIT: 'can-edit',
  // CAN_DELETE: 'can-delete',
  // CAN_VIEW: 'can-view'
}

export const PERMISSIONS = {
  [ROLES.USER]: [],
  [ROLES.ALLGAMEUSER]: [],
  [ROLES.ADMIN]: [CAN.MANAGE_NOTICE]
}
