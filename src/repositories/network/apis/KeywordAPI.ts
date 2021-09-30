import { AxiosResponse } from 'axios'
import { APIRequest } from '@src/repositories/network/APIRequest'
import { HTTPMethod } from '@src/repositories/network/APIClient'
import { INotice, INoticeData } from '@src/entities/notice'
import { ISegment, ISegmentData } from '@src/entities/segment/segment.types'
import { ILabelData } from '@src/entities'
import { IHashtagData } from '@src/entities/hashtag'
import { IHashtagList } from '@src/@types/List'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace KeywordAPI {
  const HASHTAGS = 'mgmt/hashtags'

  // 모든 키워드 가져오기
  export class FetchAll implements APIRequest<IHashtagList> {
    response: IHashtagList
    path = `${HASHTAGS}`
    params: IPaginationRequest
    method = HTTPMethod.POST
    parse = (data: AxiosResponse) => data.data

    constructor(params: IPaginationRequest) {
      if (params) this.params = params
    }
  }
}
