import { ICustom } from '../custom'
import { IHashtag, IHashtagData } from './hashtag.types'

export class Hashtag implements IHashtag {
  id: number
  hashtag: string
  backgroundColor?: null | string
  fontColor?: null | string

  constructor(private readonly data: IHashtagData, custom?: ICustom) {
    this.id = data.id
    this.hashtag = data.hashtag
    this.backgroundColor = custom?.hashtagColors.find(
      (element) => element.hashtagId == data.id
    )?.backgroundColor
    this.fontColor = custom?.hashtagColors.find(
      (element) => element.hashtagId == data.id
    )?.fontColor
  }
}
