import BaseRepository from '@src/repositories/BaseRepository'
import { APIClient } from '@src/repositories/network/APIClient'
import { LabelAPI } from '@src/repositories/network/apis/LabelAPI'
import { ILabelData, ILabelUsedData } from '@src/entities/label'
import { ILabelHistoryList, ILabelList } from '@src/@types/List'

export default class LabelRepository implements BaseRepository {
  // 디폴트 파라미터 (방어 코드)
  defaultParam: IPaginationRequest = { page_index: 0, page_size: 10000 }

  // 레이블 리스트 가져오기
  async fetchAll(params = this.defaultParam): Promise<ILabelList<ILabelData>> {
    return await APIClient.shared.request(new LabelAPI.FetchAll(params))
  }

  // criteria가 존재하는 레이블 리스트 가져오기
  async fetchByAggregationCriteria(params: any): Promise<ILabelList<ILabelData>> {
    return await APIClient.shared.request(new LabelAPI.FetchByAggregationCriteria(params))
  }

  // 레이블 하나 가져오기
  async fetch(params: any): Promise<ILabelData> {
    return await APIClient.shared.request(new LabelAPI.Fetch(params))
  }

  // 레이블 하나 자세히보기
  async fetchDetail(params: ILabelData): Promise<ILabelData> {
    return await APIClient.shared.request(new LabelAPI.FetchDetail(params))
  }

  // 레이블 생성 혹은 수정
  async createOrUpdate(params: ILabelData): Promise<ILabelData> {
    return await APIClient.shared.request(new LabelAPI.CreateOrUpdate(params))
  }

  // 레이블 삭제
  async delete(params: ILabelData): Promise<ILabelData> {
    return await APIClient.shared.request(new LabelAPI.Delete(params))
  }

  // 사용 중인 레이블
  async isEnabled(params: ILabelData): Promise<ILabelData> {
    return await APIClient.shared.request(new LabelAPI.IsEnabled(params))
  }

  async fetchRecent(params: any): Promise<ILabelList<ILabelUsedData>> {
    return await APIClient.shared.request(new LabelAPI.FetchRecent(params))
  }
  // Top10 레이블
  async fetchMostUsed(params = { limit: 10 }): Promise<ILabelList<ILabelUsedData>> {
    return await APIClient.shared.request(new LabelAPI.FetchMostUsed(params))
  }

  // 적재 기록 가져오기
  async fetchHistories(params: ILabelHistoryRequest): Promise<ILabelHistoryList> {
    return await APIClient.shared.request(new LabelAPI.FetchHistories(params))
  }
}
