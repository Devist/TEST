import { AxiosResponse } from 'axios'
import { APIRequest } from '@src/repositories/network/APIRequest'
import { HTTPMethod } from '@src/repositories/network/APIClient'
import { INotice, INoticeData } from '@src/entities/notice'
import { ISegment, ISegmentData } from '@src/entities/segment/segment.types'
import { ILabelData } from '@src/entities'
import { ISegmentList } from '@src/@types/List'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SegmentAPI {
  const SEGMENT = 'mgmt/segment'
  const SEGMENTS = 'mgmt/segments'

  export class FetchAll implements APIRequest<ISegmentList<ISegmentData>> {
    response: ISegmentList<ISegmentData>
    path = `${SEGMENT}/jobs`
    method = HTTPMethod.POST
    params: IPaginationRequest
    parse = (data: AxiosResponse) => data.data
    constructor(params: IPaginationRequest) {
      if (params) this.params = params
    }
  }

  // 세그먼트 하나 가져오기
  export class Fetch implements APIRequest<ISegmentData> {
    response: ISegmentData
    path: string
    method = HTTPMethod.POST
    params: any
    parse = (data: AxiosResponse) => data.data
    constructor(params: any) {
      this.path = `${SEGMENT}/job/definitions`
      this.params = params
    }
  }

  // 신규 세그먼트 등록하기
  export class CreateOrUpdate implements APIRequest<ISegmentData> {
    response: ISegmentData
    path = `${SEGMENT}/job/definition`
    method = HTTPMethod.PUT
    params: ISegment
    parse = (data: AxiosResponse) => data.data
    constructor(params: ISegment) {
      this.params = params
    }
  }

  // 특정 세그먼트 삭제하기
  export class Delete implements APIRequest<{ id: number }> {
    response!: { id: number }
    path = `${SEGMENT}/job/definition`
    method = HTTPMethod.DELETE
    params: { id: number }
    parse = (data: AxiosResponse) => data.data
    constructor(params: { id: number }) {
      this.params = params
    }
  }
}
