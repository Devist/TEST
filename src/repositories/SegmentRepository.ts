import BaseRepository from '@src/repositories/BaseRepository'
import { APIClient } from '@src/repositories/network/APIClient'
import { ISegment, ISegmentData } from '@src/entities/segment/segment.types'
import { SegmentAPI } from '@src/repositories/network/apis/SegmentAPI'
import { keysToSnake } from '@src/utils/camelToSnake'
import { ISegmentList } from '@src/@types/List'

export default class SegmentRepository implements BaseRepository {
  // 디폴트 파라미터 (방어 코드)
  defaultParam: IPaginationRequest = { page_index: 0, page_size: 10000 }

  // 세그먼트 가져오기
  async fetchAll(params = this.defaultParam): Promise<ISegmentList<ISegmentData>> {
    return await APIClient.shared.request(new SegmentAPI.FetchAll(params))
  }

  // 세그먼트 하나 가져오기
  async fetch(params: any): Promise<ISegmentData> {
    return await APIClient.shared.request(new SegmentAPI.Fetch(params))
  }

  // 세그먼트 생성 혹은 수정
  async createOrUpdate(params: ISegment): Promise<ISegmentData> {
    return await APIClient.shared.request(
      new SegmentAPI.CreateOrUpdate(keysToSnake(params))
    )
  }

  // 세그먼트 삭제
  async delete(params: { id: number }): Promise<{ id: number }> {
    return await APIClient.shared.request(new SegmentAPI.Delete(keysToSnake(params)))
  }
}
