import { AxiosResponse } from 'axios'
import { APIRequest } from '@src/repositories/network/APIRequest'
import { HTTPMethod } from '@src/repositories/network/APIClient'

import { ILabelData, ILabelUsedData } from '@src/entities/label'
import { keysToSnake } from '@src/utils/camelToSnake'
import { ILabelHistoryList, ILabelList } from '@src/@types/List'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace LabelAPI {
  // 베이스
  const MGMT = 'mgmt'

  // 레이블 리스트 가져오기
  export class FetchAll implements APIRequest<ILabelList<ILabelData>> {
    response: ILabelList<ILabelData>
    path: string
    method = HTTPMethod.POST
    params: IPaginationRequest
    parse = (data: AxiosResponse) => data.data
    constructor(params: IPaginationRequest) {
      this.path = `${MGMT}/labels/list`
      this.params = params
    }
  }

  // criteria가 존재하는 레이블 리스트 가져오기
  export class FetchByAggregationCriteria implements APIRequest<ILabelList<ILabelData>> {
    response: ILabelList<ILabelData>
    path: string
    method = HTTPMethod.POST
    params: any
    parse = (data: AxiosResponse) => data.data
    constructor(params: any) {
      this.path = `${MGMT}/labels-by-label-aggregation-criteria`
      this.params = params
    }
  }

  // 레이블 하나 가져오기
  export class Fetch implements APIRequest<ILabelData> {
    response: ILabelData
    path: string
    method = HTTPMethod.POST
    params: ILabelData
    parse = (data: AxiosResponse) => data.data
    constructor(params: ILabelData) {
      this.path = `${MGMT}/label`
      this.params = params
    }
  }

  // 레이블 하나 자세히 보기
  export class FetchDetail implements APIRequest<ILabelData> {
    response: ILabelData
    path: string
    method = HTTPMethod.POST
    params: ILabelData
    parse = (data: AxiosResponse) => data.data
    constructor(params: ILabelData) {
      this.path = `${MGMT}/label/detail`
      this.params = params
    }
  }

  // 레이블 생성
  export class CreateOrUpdate implements APIRequest<ILabelData> {
    response: ILabelData
    path: string
    method = HTTPMethod.PUT
    params: ILabelData
    parse = (data: AxiosResponse) => data.data
    constructor(params: ILabelData) {
      this.path = `${MGMT}/label`
      this.params = params
    }
  }

  // 레이블 삭제
  export class Delete implements APIRequest<ILabelData> {
    response: ILabelData
    path: string
    method = HTTPMethod.DELETE
    params: ILabelData
    parse = (data: AxiosResponse) => data.data
    constructor(params: ILabelData) {
      this.path = `${MGMT}/label`
      this.params = params
    }
  }

  // 사용 중인 레이블
  export class IsEnabled implements APIRequest<ILabelData> {
    response: ILabelData
    path: string
    method = HTTPMethod.PUT
    params: ILabelData
    parse = (data: AxiosResponse) => data.data
    constructor(params: ILabelData) {
      this.path = `${MGMT}/label/is_enabled`
      this.params = params
    }
  }
  // 최근 레이블 리스트 가져오기
  export class FetchRecent implements APIRequest<ILabelList<ILabelUsedData>> {
    response: ILabelList<ILabelUsedData>
    path: string
    method = HTTPMethod.POST
    params: any
    parse = (data: AxiosResponse) => data.data
    constructor(params: any) {
      this.path = `${MGMT}/labels/new`
      this.params = params
    }
  }

  // Top 10 레이블 리스트 가져오기
  export class FetchMostUsed implements APIRequest<ILabelList<ILabelUsedData>> {
    response: ILabelList<ILabelUsedData>
    path: string
    method = HTTPMethod.POST
    params: any
    parse = (data: AxiosResponse) => data.data
    constructor(params: any) {
      this.path = `${MGMT}/labels/top`
      this.params = params
    }
  }

  // 레이블 히스토리 조회
  export class FetchHistories implements APIRequest<ILabelHistoryList> {
    response: ILabelHistoryList
    path: string
    method = HTTPMethod.POST
    params: any
    parse = (data: AxiosResponse) => data.data

    constructor(params: ILabelHistoryRequest) {
      this.path = `${MGMT}/label/data/historys`
      this.params = keysToSnake(params)
    }
  }
}
