/* eslint-disable  @typescript-eslint/no-explicit-any */
import { IHashtag, IHashtagData } from '@src/entities/hashtag'
import { ILabelHistoryData } from '@src/entities'

declare interface INoticeList<T> {
  notices: T[]
  total_size?: number
  totalSize?: number
}

declare interface ILabelList<T> {
  labels: T[]
  total_size?: number
  totalSize?: number
}

declare interface ISegmentList<T> {
  definitions: T[]
  total_size?: number
  totalSize?: number
}

declare interface ILabelHistoryList {
  label_data_history: ILabelHistoryData[]
}

declare interface IHashtagList {
  hashtags: IHashtagData[]
  total_size?: number
  totalSize?: number
}

declare interface IProfileList {
  debug?: any
  transactionId: string
  result: any[]
}

// 나중에 이렇게
declare interface IList<T> {
  data: T[]
  pageInfo: {
    size: number // 한 페이지에서 보여줄 사이즈의 갯수
    totalElements: number // 모든 요소
    totalPages: number // 전체 페이지
    number: number // 현재 페이지 번호
  }
}
