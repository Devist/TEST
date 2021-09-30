import { INotice, INoticeData } from '@src/entities'
import BaseRepository from '@src/repositories/BaseRepository'
import { APIClient } from '@src/repositories/network/APIClient'
import { NoticeAPI } from './network/apis/NoticeApi'

import { keysToSnake } from '@src/utils/camelToSnake'
import { INoticeList } from '@src/@types/List'

export default class NoticeRepository implements BaseRepository {
  // 디폴트 파라미터 (방어 코드)
  defaultParam: IPaginationRequest = { page_index: 0, page_size: 10000 }

  // 공지 가져오기
  async fetchAll(params = this.defaultParam): Promise<INoticeList<INoticeData>> {
    return await APIClient.shared.request(new NoticeAPI.FetchAll(params))
  }

  // 공지 생성 혹은 수정
  async createOrUpdate(params: INotice): Promise<INoticeData> {
    return await APIClient.shared.request(
      new NoticeAPI.CreateOrUpdate(keysToSnake(params))
    )
  }

  // 공지 삭제
  async delete(params: { id: number }): Promise<{ id: number }> {
    return await APIClient.shared.request(new NoticeAPI.Delete(keysToSnake(params)))
  }
}
