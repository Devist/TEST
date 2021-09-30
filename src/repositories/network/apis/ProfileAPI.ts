import { AxiosResponse } from 'axios'
import { APIRequest } from '@src/repositories/network/APIRequest'
import { HTTPMethod } from '@src/repositories/network/APIClient'
import { IProfileData, IProfileSummaryData } from '@src/entities'
import { IProfileList } from '@src/@types/List'

/* eslint-disable  @typescript-eslint/no-explicit-any, @typescript-eslint/no-namespace */
export namespace ProfileAPI {
  // 베이스
  const DATA_PROFILE = 'data/profiles'
  const PROFILE = 'mgmt/profile'

  // 프로필 가져오기
  export class FetchProfiles implements APIRequest<IProfileList> {
    response: IProfileList
    path = DATA_PROFILE
    method = HTTPMethod.POST
    parse = (data: AxiosResponse) => data.data
    header: any
    constructor(type: string, id: string, gameCode: string) {
      this.header = {
        'Content-Type': 'application/json',
        'profile-filter': `${type}=${id},gameCode=${gameCode}`,
        'profile-detail': true
      }
    }
  }

  export class FetchOrders implements APIRequest<IProfileData[]> {
    response: IProfileData[]
    path = `${PROFILE}/orders`
    method = HTTPMethod.POST
    params: IPaginationRequest
    parse = (data: AxiosResponse) => data.data.profile_orders
    constructor(params: IPaginationRequest) {
      if (params) this.params = params
    }
  }
}
