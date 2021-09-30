import { Game } from './game'
import { GAME_STATUS_TYPE, IGame, IGameData } from './game.types'

export const mockGameData = (): IGameData[] => [
  {
    name: '게임1',
    code: 'game1',
    status: GAME_STATUS_TYPE.OPEN
  },
  {
    name: '게임2',
    code: 'game2',
    status: GAME_STATUS_TYPE.OPEN
  },
  {
    name: '게임3',
    code: 'game3',
    status: GAME_STATUS_TYPE.CLOSE
  }
]

export const mockGame = (data: IGameData[] = mockGameData()): IGame[] =>
  data.map((item) => new Game(item))
