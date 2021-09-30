import {
  ID_TYPE,
  ILabelHistory,
  ILabelHistoryData
} from '@src/entities/label-history/label-history.types'
import { LabelHistory } from '@src/entities/label-history/label-history'

const gameCodes = [
  'soulkingglobal',
  'dragonus',
  'bnsmjp',
  'boong3',
  'afive',
  'kofg',
  'btsw',
  'lin2ws',
  'gohjp',
  'chachacha2',
  'survivalgb',
  'penta',
  'ma9ma9m',
  'monster',
  'gdkcbt',
  'rushnkrush',
  'golfg',
  'knightsgb',
  'mcs',
  'nanakr',
  'stonemmogb',
  'seedofwar',
  'gholdemid',
  'sknights',
  'dstrikergb',
  'wefire',
  'soulking',
  'quickboy',
  'sknightsmmo',
  'ravjp'
]

export const mockLabelHistoryData = (): ILabelHistoryData[] => {
  let dataArr = []
  for (let i = 0; i < 30; i++) {
    const timestamp = 1625065200000 + 86400000 * (i + 1)
    const historyData = gameCodes.reduce((acc, cur) => {
      const pidData = {
        id_type: ID_TYPE.PID,
        game_code: cur,
        data_count: Math.floor(Math.random() * 100000) + 1,
        data_ts: timestamp
      }
      const adidData = {
        id_type: ID_TYPE.ADID,
        game_code: cur,
        data_count: Math.floor(Math.random() * 3000) + 1,
        data_ts: timestamp
      }
      acc.push(pidData, adidData)
      return acc
    }, [] as ILabelHistoryData[])
    dataArr.push(...historyData)
  }
  return dataArr
}

export const mockLabelHistories = (
  data: ILabelHistoryData[] = mockLabelHistoryData()
): ILabelHistory[] => data.map((item) => new LabelHistory(item))
