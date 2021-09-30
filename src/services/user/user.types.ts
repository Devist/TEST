import { IGame, ILabelMemo, IUser } from '@src/entities'

export interface IUserService {
  fetch(): Promise<IUser>
  addMemo(id: number, data: ILabelMemo): ILabelMemo
  getMemo(labelId: number, memos: ILabelMemo[]): ILabelMemo | undefined
  deleteMemo(id: number, memos: ILabelMemo[] | []): ILabelMemo[]
  getGame(games: IGame[], gameCode: string): IGame | undefined
}

export interface IUserServiceMock {
  fetch(): Promise<IUser>
}
