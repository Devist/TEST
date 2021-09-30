import { AxiosResponse } from 'axios'
import { APIRequest } from '@src/repositories/network/APIRequest'
import { HTTPMethod } from '@src/repositories/network/APIClient'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UserAPI {
  // 베이스
  const USERS = 'user'

  // 유저 정보 가져오기
  export class Fetch implements APIRequest<null> {
    response: null
    path: string
    method = HTTPMethod.GET
    parse = (data: AxiosResponse) => data.headers.dashboard_user
    constructor() {
      this.path = `${USERS}/info`
    }
  }
}
