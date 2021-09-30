import { ICustom } from '../custom'
import { IHashtag } from '@src/entities/hashtag'
import { YN } from '@src/entities'
import {
  ID_TYPE,
  ILabelHistory,
  ILabelHistoryData
} from '@src/entities/label-history/label-history.types'

export class LabelHistory implements ILabelHistory {
  dataCount: number
  gameCode: string
  idType: ID_TYPE
  updateTime: string

  constructor(private readonly data: ILabelHistoryData) {
    this.dataCount = data.data_count
    this.gameCode = data.game_code
    this.idType = data.id_type

    const dateArray = new Date(data.data_ts).toLocaleString().split(' ')

    this.updateTime =
      data.data_ts > -1 ? `${dateArray[1]}${dateArray[2]}`.replace(/.\s*$/, '') : ''
  }
}
