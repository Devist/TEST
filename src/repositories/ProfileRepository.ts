import { APIClient } from '@src/repositories/network/APIClient'

import { ProfileAPI } from '@src/repositories/network/apis/ProfileAPI'
import { IProfileData, IProfileSummaryData } from '@src/entities'
import { IProfileList } from '@src/@types/List'

export default class ProfileRepository {
  // 디폴트 파라미터 (방어 코드)
  defaultParam: IPaginationRequest = { page_index: 0, page_size: 10000 }

  // 프로필 가져오기
  async fetchProfiles(type: string, id: string, gameCode: string): Promise<IProfileList> {
    return await APIClient.shared.request(
      new ProfileAPI.FetchProfiles(type, id, gameCode)
    )
  }

  // 프로필 순서 가져오기 (지만 실제 데이터는 여기 있음)
  async fetchOrders(params = this.defaultParam): Promise<IProfileData[]> {
    return await APIClient.shared.request(new ProfileAPI.FetchOrders(params))
  }
}
