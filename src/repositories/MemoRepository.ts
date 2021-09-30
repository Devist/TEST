import { APIClient } from '@src/repositories/network/APIClient'
import { MemoAPI } from '@src/repositories/network/apis/MemoAPI'
import { ILabelMemoData } from '@src/entities'
export default class MemoRepository {
  // 메모 등록 또는 수정하기
  async upsert(params: ILabelMemoData): Promise<{ id: number }> {
    return await APIClient.shared.request(new MemoAPI.UpsertMemo(params))
  }

  async delete(id: number) {
    return await APIClient.shared.request(new MemoAPI.DeleteMemo(id))
  }
}
