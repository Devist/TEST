import { ISegment } from '@src/entities/segment'
import { ID_TYPE } from '@src/entities'
import { IHashtagList } from '@src/@types/List'
import { IHashtag } from '@src/entities/hashtag'

export interface IKeywordService {
  fetchAll(): Promise<IHashtag[]>
}
