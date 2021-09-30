import { ICustom } from '../custom'
import { IGame } from '../game'

export interface IUserData {
  name: string
  role: UserRoleType
  email: string
  company: string
  department: string
  primary_phone: string
  games: string
  game_names: string
  game_status: string
}

export interface IUser {
  name: string
  role: UserRoleType
  email: string
  department: string
  phoneNumber: string
  games: IGame[]
  custom: ICustom
}

export enum UserRoleType {
  ADMIN = 'admin',
  USER = 'user'
}
