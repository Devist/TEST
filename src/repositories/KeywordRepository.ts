import BaseRepository from '@src/repositories/BaseRepository'
import { APIClient } from '@src/repositories/network/APIClient'
import { KeywordAPI } from '@src/repositories/network/apis/KeywordAPI'

export default class KeywordRepository implements BaseRepository {
  // 디폴트 파라미터 (방어 코드)
  defaultParam: IPaginationRequest = { page_index: 0, page_size: 10000 }

  async fetchAll(params = this.defaultParam): Promise<any> {
    return await APIClient.shared.request(new KeywordAPI.FetchAll(params))
  }
}
