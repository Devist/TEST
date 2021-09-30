import { GAME_STATUS_TYPE, IGame, IGameData } from './game.types'

export class Game implements IGame {
  name: string
  code: string
  status: GAME_STATUS_TYPE

  constructor(data: IGameData) {
    this.name = data.name
    this.code = data.code
    this.status = data.status
  }

  validate(): boolean {
    throw new Error('Method not implemented.')
  }
}
