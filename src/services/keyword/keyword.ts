import { ISegment } from '@src/entities/segment/segment.types'
import { IKeywordService } from '@src/services/keyword/keyword.types'
import { IHashtagList } from '@src/@types/List'
import KeywordRepository from '@src/repositories/KeywordRepository'
import { Hashtag, IHashtag } from '@src/entities/hashtag'

export class KeywordService implements IKeywordService {
  constructor(private readonly keywordRepository: KeywordRepository) {}

  fetchAll(): Promise<IHashtag[]> {
    return this.keywordRepository.fetchAll().then((response: IHashtagList) => {
      return response.hashtags.map((item) => new Hashtag(item))
    })
  }
}
