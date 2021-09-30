import { AxiosResponse } from 'axios'
import { APIRequest } from '@src/repositories/network/APIRequest'
import { HTTPMethod } from '@src/repositories/network/APIClient'
import { ICustomData } from '@src/entities/custom'
import { ILabelData } from '@src/entities'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace PersonalAPI {
  // 베이스
  const PERSONAL = 'mgmt/personal'

  // 커스텀 정보 가져오기
  export class FetchCustoms implements APIRequest<ICustomData> {
    response!: ICustomData
    path: string
    method = HTTPMethod.POST
    parse = (data: AxiosResponse) => data.data
    constructor() {
      this.path = `${PERSONAL}/customs`
    }
  }

  // hashtag-color-controller
  export class PutHashtagColor implements APIRequest<ICustomData> {
    response!: ICustomData
    path: string
    method = HTTPMethod.GET
    parse = (data: AxiosResponse) => data.data
    constructor() {
      this.path = `${PERSONAL}/customs`
    }
  }

  export class DeleteHastagColor implements APIRequest<ICustomData> {
    response!: ICustomData
    path: string
    method = HTTPMethod.GET
    parse = (data: AxiosResponse) => data.data
    constructor() {
      this.path = `${PERSONAL}/customs`
    }
  }

  export class PostHashtagColor implements APIRequest<ICustomData> {
    response!: ICustomData
    path: string
    method = HTTPMethod.GET
    parse = (data: AxiosResponse) => data.data
    constructor() {
      this.path = `${PERSONAL}/customs`
    }
  }

  // 즐겨찾기 추가
  export class UpdateFavorite implements APIRequest<{ id: number }> {
    response: { id: number }
    path = `${PERSONAL}/label/favorite`
    method = HTTPMethod.PUT
    parse = (data: AxiosResponse) => data.data
    params: { label_id: number }
    constructor(label_id: number) {
      console.log('실행됨?')
      this.params = { label_id }
    }
  }

  // 즐겨찾기 삭제
  export class DeleteFavorite implements APIRequest<{ id: number }> {
    response: { id: number }
    path = `${PERSONAL}/label/favorite`
    method = HTTPMethod.DELETE
    parse = (data: AxiosResponse) => data.data
    params: { id: number }
    constructor(id: number) {
      this.params = { id }
    }
  }
}
