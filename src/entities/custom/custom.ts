import {
  ICustom,
  ICustomData,
  IFavoriteLabel,
  IHashtagColor,
  ILabelMemo
} from './custom.types'

import { keysToCamel } from '@src/utils/snakeToCamel'

export class Custom implements ICustom {
  favoriteLabels!: IFavoriteLabel[] | []
  hashtagColors!: IHashtagColor[] | []
  labelMemos!: ILabelMemo[] | []

  constructor(data: ICustomData) {
    const newData: ICustom = keysToCamel(data)
    this.favoriteLabels = newData.favoriteLabels
    this.hashtagColors = newData.hashtagColors
    this.labelMemos = newData.labelMemos
  }

  validate(): boolean {
    throw new Error('Method not implemented.')
  }
}
