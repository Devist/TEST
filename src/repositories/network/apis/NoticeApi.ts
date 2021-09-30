import { AxiosResponse } from 'axios'
import { APIRequest } from '@src/repositories/network/APIRequest'
import { HTTPMethod } from '@src/repositories/network/APIClient'
import { INoticeData, INotice } from '@src/entities/notice'
import { INoticeList } from '@src/@types/List'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace NoticeAPI {
  // 베이스
  const NOTICE = 'mgmt/notice'
  const NOTICES = 'mgmt/notices'

  // 공지사항 리스트 가져오기
  export class FetchAll implements APIRequest<INoticeList<INoticeData>> {
    response: INoticeList<INoticeData>
    path = `${NOTICES}`
    method = HTTPMethod.POST
    params: IPaginationRequest
    parse = (data: AxiosResponse) => data.data
    constructor(params: IPaginationRequest) {
      if (params) this.params = params
    }
  }

  // 신규 공지사항 등록하기
  export class CreateOrUpdate implements APIRequest<INoticeData> {
    response: INoticeData
    path = `${NOTICE}`
    method = HTTPMethod.PUT
    params: INotice
    parse = (data: AxiosResponse) => data.data
    constructor(params: INotice) {
      this.params = params
    }
  }

  // 특정 공지사항 삭제하기
  export class Delete implements APIRequest<{ id: number }> {
    response!: { id: number }
    path = `${NOTICE}`
    method = HTTPMethod.DELETE
    params: { id: number }
    parse = (data: AxiosResponse) => data.data
    constructor(params: { id: number }) {
      this.params = params
    }
  }
}
