import { IHashtag, IHashtagData } from './hashtag.types'
import { Hashtag } from './hashtag'
import { mockCustom } from '@src/entities/custom'

export const mockHashtagData = (): IHashtagData[] => [
  {
    id: 1,
    hashtag: '홍승한'
  }
]

export const mockHashtag = (data: IHashtagData[] = mockHashtagData()): IHashtag[] =>
  data.map((item) => new Hashtag(item, mockCustom()[0]))
