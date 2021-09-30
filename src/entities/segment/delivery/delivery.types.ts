export enum NOTIFICATION_TYPE {
  EMAIL = 'email',
  LINEWORKS = 'lineworks',
  URL = 'url'
}

export enum DELIVERY_TYPE {
  CSV = 'gcs',
  GOOGLE_SHEETS = 'gsheets',
  PLATFORM_TAG = 'pubsub',
  BIG_QUERY = 'bigquery',
  SINGULAR = 'singular'
}

/** ****************************************************************************
 * 전달 관련 데이터 정의
 **************************************************************************** */

export interface IExtraInfoPlatformTagData {
  extra_id_type: 'adid' | null // ? 다 널
  game_code: string
  tag: string //
  partition_table?: boolean // ? 플랫폼 태그 서비스 - 저걸로 전달?
}

// 펍섭 ? 어떤 태그를 구독해두면, 그 태그를 전달 - 카프카

export interface IExtraInfoPlatformCscData {
  select_columns: string[] // 기본 Column 이름 _ include_column 과 항상 동일
  headers: string[] // 수정할 Column 이름 , 비워두면 ""
  orders: string[] // {기본 column 이름} {ASC | DESC}
}

// [{
//   text: '오름차순',
//   value: 'asc'
// }, {
//   text: '내림차순',
//   value: 'desc'
// }, {
//   text: '정렬 안함',
//   value: 'no'
// }],

export interface IDeliveryData {
  created_datetime: string
  extra_info: IExtraInfoPlatformTagData | IExtraInfoPlatformCscData
  id: number
  modified_datetime: string
  notification_type: NOTIFICATION_TYPE
  segment_job_schedule_id: number
  share_targets: string[] // 이메일 모음
  type: DELIVERY_TYPE
}

/** ****************************************************************************
 * 전달 관련 엔티티 정의
 **************************************************************************** */

export interface IExtraInfoPlatformTag {
  extraIdType: 'adid' | null
  gameCode: string
  tag: string
  partitionTable?: boolean
}

export interface IExtraInfoPlatformCsv {
  selectColumns: string[] // 왜 select_columns 야 ..
  headers: string[]
  orders: string[]
}

export interface IDelivery {
  createdDatetime: string
  extraInfo: IExtraInfoPlatformTag | IExtraInfoPlatformCsv
  id: number
  modifiedDatetime: string
  notificationType: NOTIFICATION_TYPE
  segmentJobScheduleId: number
  shareTargets: string[]
  type: DELIVERY_TYPE

  validate(): boolean
}
