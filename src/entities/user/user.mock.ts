import { IUser, IUserData, UserRoleType } from './user.types'
import { User } from './user'
import { mockCustom } from '../custom/custom.mock'

export const mockUserData = (): IUserData[] => [
  {
    name: '오동환',
    role: UserRoleType.ADMIN,
    email: 'whatsup@netmarble.com',
    company: '넷마블',
    department: '개인화서비스개발팀',
    primary_phone: '01058753636',
    games: '[lin2ws, mherosgb, nanakr]',
    game_names:
      '[리니지2 레볼루션 웨스턴, 마블 퓨처 파이트 글로벌, 일곱개의대죄 한국]',
    game_status: '[open, close, open]'
  },
  // validation check 위한
  {
    name: '오동환',
    role: UserRoleType.ADMIN,
    email: 'whatsup@netmarble.com',
    company: '넷마블',
    department: '개인화서비스개발팀',
    primary_phone: '01058753636',
    games: '[msg, hello, world]',
    game_names: '[게임1, 게임2]',
    game_status: '[open, close, open]'
  }
]

export const mockUser = (data: IUserData[] = mockUserData()): IUser[] =>
  data.map((item) => new User(item, mockCustom()[0]))
