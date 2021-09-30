import { APIRequest } from '@src/repositories/network/APIRequest'
import { HTTPMethod } from '@src/repositories/network/APIClient'
import { ILabelMemoData } from '@src/entities'
import { AxiosResponse } from 'axios'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace MemoAPI {
  // 베이스
  const MEMO = 'mgmt/personal/label/memo'

  export class UpsertMemo implements APIRequest<any> {
    response: any
    path: string
    method = HTTPMethod.PUT
    params: ILabelMemoData
    parse = (data: AxiosResponse) => data.data
    constructor(params: ILabelMemoData) {
      this.path = `${MEMO}`
      this.params = params
    }
  }

  export class DeleteMemo implements APIRequest<any> {
    response: any
    path: string
    method = HTTPMethod.DELETE
    params: any
    parse = (data: AxiosResponse) => data.data
    constructor(id: number) {
      this.path = `${MEMO}`
      this.params = { id }
    }
  }
}
