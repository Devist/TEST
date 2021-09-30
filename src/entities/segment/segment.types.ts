import { ISchedule, IScheduleData } from './schedule'
import { ID_TYPE } from '@src/entities'
import { IConditionData, ICondition } from '@src/entities'
import { IQueryMetaData } from '@src/entities/segment/query-config/query-meta'
import { IMetaConditionData } from '@src/entities/segment/query-config'

export enum CREATE_SOURCE {
  CREATE = 'create',
  TEMPLATE = 'template',
  COPY = 'copy'
}

/** ****************************************************************************
 * 세그먼트 데이터 정의
 **************************************************************************** */

export interface IRestoreContentData {
  and_boxes: IConditionData[]
  // selected: boolean // 특정 레이블 조건 선택시, 없어도 됨
}

export interface ISegmentData {
  create_source: CREATE_SOURCE // 세그먼트 생성 방법 [신규 생성 | 템플릿 | 복사]
  created_datetime: string // 세그먼트 생성 일자
  department_name: string // 세그먼트 생성자 : 부서
  description: string // 세그먼트 설명
  id: number // 세그먼트 ID
  include_columns: string[] // 결과값 정보 .... id 는 반드시 포함, [adid 일 때, 결과값 포함할 때 ]는 os, country 가 들어올수도 있고 전부 들어올 수도 있고
  // ip : number
  mail: string // 세그먼트 생성자 : 이메일
  manager_name: string // 세그먼트 생성자 : 이름
  modified_datetime: string // 세그먼트 수정 일자
  name: string // 세그먼트 이름
  phone: string // 세그먼트 생성자 : 내부 전화번호
  query_config: {
    // idType 제외 대부분 백엔드에서 필요한 정보들
    meta: IMetaConditionData
  }
  // query_hash : string
  restore_content: { data: IRestoreContentData[] } // // 해당 템플릿으로 세그먼트를 생성할 때의 레이블 조건 정보
  schedules: IScheduleData[] | [] // 세그먼트 스케줄 정보
  target_games: string[] // 세그먼트에 포함된 타겟 게임 정보 (확인 필요)
  start_datetime: string // 세그먼트의 최근 실행 정보 - 실행 시작 시간
  end_datetime: string // 세그먼트의 최근 실행 정보 - 실행 종료 시간
}

/** ****************************************************************************
 * 세그먼트 엔티티 정의
 **************************************************************************** */

export interface IRestoreContent {
  andBoxes: ICondition[]
}

export interface ISegment {
  createSource: CREATE_SOURCE
  createdDatetime: string
  departmentName: string
  description: string
  id: number
  includeColumns: string[]
  mail: string
  managerName: string
  modifiedDatetime: string
  name: string
  phone: string
  queryConfig: { meta: { idType: ID_TYPE } }
  restoreContent: { data: IRestoreContent[] }
  schedules: ISchedule[] | []
  targetGames: string[]
  startDatetime: string
  endDatetime: string
  translate: string // 세그먼트 자동 설명
  validate(): boolean // 엔티티 유효성 검사
}
