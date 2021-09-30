import { YN } from '@src/entities/common-enum'
import { IDelivery, IDeliveryData } from '../delivery'
import { HTTPMethod } from '@src/repositories/network/APIClient'

export interface IGcscContext {
  type: string
  method: HTTPMethod
  uri: string
  timezone: string
}

// "gcsc_context": {
//   "type": "HTTP",
//     "method": "PUT",
//     "uri": "http://trigger:9102/trigger/segment/job",
//     "timezone": "Asia/Seoul",
//     "body": "{\"id\":67, \"exec_direct\":false}"
// },

/** ****************************************************************************
 * 세그먼트 스케쥴 데이터 관련 정의
 **************************************************************************** */

export interface ILifeCycleData {
  id: number // 라이프사이클 ID
  end_date: string // 종료일자
  schedule_id: number // 라이프사이클이 속한 스케쥴 ID
  start_date: string // 시작일자
}

// "life_cycle": {
//   "id": 46,
//     "schedule_id": 60,
//     "start_date": "2021-03-23",
//     "end_date": "2099-12-31"
// },

export interface IScheduleData {
  created_datetime: string // 스케줄 생성일
  deliverys: IDeliveryData[] // 결과 전달 방식 정보
  department_name: string // 스케줄 생성자 정보 - 부서명
  duration_seconds: number // 스케쥴 최근 동작 - 소요 시간
  end_datetime: string // 스케쥴 최근 동작 - 끝난 시간
  // exec_direct: YN // 안씀
  gcsc_context: IGcscContext // ?? 다 똑같은 값. 서버에 확인 필요 - 안 쓸 거 같음
  gcsc_job_name: string // ??
  id: number // 스케쥴 ID
  // ip: string // 필요없음
  is_enabled: YN // 스케쥴 동작 여부
  life_cycle?: ILifeCycleData // 스케쥴 생성시, 시작날짜, 종료날짜 설정
  // life_cycle_exclueds?: [] // 스케쥴 생성시, 회피일 설정
  mail: string // 스케줄 생성자 정보 - 이메일
  manager_name: string // 스케줄 생성자 정보 - 생성자명
  modified_datetime: string // 스케줄 수정일
  name: string // 스케줄 이름
  phone: string // 스케줄 생성자 정보 -전화번호
  schedule: string // 예약 스케줄러 (크론탭 형식)
  segment_job_definition_id: number // 해당 스케쥴이 걸린 세그먼트 ID
  segment_job_definition_name?: string // 해당 스케쥴이 걸린 세그먼트 이름
  start_datetime: string // 스케쥴 최근 동작 - 끝난 시간
}

/** ****************************************************************************
 * 세그먼트 스케쥴 엔티티 관련 정의
 **************************************************************************** */

export interface ILifeCycle {
  id: number // 세그먼트 ID
  end_date: string
  schedule_id: number
  start_date: string
}

export interface ISchedule {
  createdDatetime: string
  deliveries: IDelivery[]
  departmentName: string
  durationSeconds: number
  endDatetime: string
  id: number
  isEnabled: boolean
  lifeCycle: ILifeCycle
  mail: string
  managerName: string
  name: string
  phone: string
  schedule: string
  segmentId: number
  segmentName: string
  startDatetime: string

  validate(): boolean
}
