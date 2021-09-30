import { ID_TYPE, IRestoreContent, IRestoreContentData } from '@src/entities'

/** ****************************************************************************
 * 세그먼트 템플릿 데이터 정의
 **************************************************************************** */

export interface ISegmentTemplateData {
  created_datetime: string // 템플릿 생성일
  description: string // 템플릿 설명
  id: number // 템플릿 ID
  id_type: ID_TYPE // 템플릿의 집계 기준 ID 타입 [PID | ADID]
  modified_datetime: string // 템플릿 수정일
  name: string // 템플릿 이름
  restore_content: {
    // 해당 템플릿으로 세그먼트를 생성할 때의 레이블 조건 정보
    data: IRestoreContentData[]
  }
}

/** ****************************************************************************
 * 세그먼트 템플릿 엔티티 정의
 **************************************************************************** */

export interface ISegmentTemplate {
  createdDatetime: string
  description: string
  id: number
  idType: ID_TYPE
  modifiedDatetime: string
  name: string
  restoreContent: {
    data: IRestoreContent[]
  }
}
