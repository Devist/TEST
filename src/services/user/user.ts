import { Custom, IGame, ILabelMemo, IUser, User } from '@src/entities'
import PersonalRepository from '@src/repositories/PersonalRepository'
import UserRepository from '@src/repositories/UserRepository'

import { IUserService } from './user.types'

export class UserService implements IUserService {
  // data!: IUser
  constructor(
    private readonly userRepository: UserRepository,
    private readonly personalRepository: PersonalRepository
  ) {}

  fetch(): Promise<IUser> {
    return Promise.all([
      this.userRepository.fetch(),
      this.personalRepository.fetch()
    ]).then(([userData, customData]) => {
      return new User(userData, new Custom(customData))
    })
  }

  addMemo(id: number, data: ILabelMemo): ILabelMemo {
    return {
      id: id,
      memo: data.memo,
      labelId: data.labelId
    }
  }

  getMemo(labelId: number, memos: ILabelMemo[]): ILabelMemo | undefined {
    return memos.find((memo) => memo.labelId === labelId)
  }

  deleteMemo(id: number, memos: ILabelMemo[] | []): ILabelMemo[] {
    memos.splice(
      memos.findIndex((memo) => memo.id === id),
      1
    )
    return memos
  }

  // getName(): string {
  //   return this.data.name
  // }

  // getEmail(): string {
  //   return this.data.email
  // }
  // getAuthority(): UserRoleType {
  //   return this.data.role
  // }

  // getGames(): IGame[] {
  //   return this.data.games
  // }

  getGame(games: IGame[], gameCode: string): IGame | undefined {
    return games.find((game: IGame) => game.code === gameCode)
  }

  // private findGame(game: IGame, code: string) {
  //   return game.code === code
  // }
}
