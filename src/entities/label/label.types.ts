import { IHashtag, IHashtagData } from '@src/entities/hashtag'
import { YN } from '@src/entities'

export enum DATA_TYPE {
  NONE = 'none',
  STRING = 'string',
  NUMBER = 'number',
  JSON = 'json',
  BOOLEAN = 'boolean',
  TIMESTAMP = 'timestamp'
}

export enum AGGREGATE_BASE_1 {
  PERSONALIZED_ID, // 0
  GAME // 1
}

export enum AGGREGATE_BASE_2 {
  ALL = 'pid, adid',
  PID = 'pid',
  ADID = 'adid'
}

export enum RANGE_TYPE {
  ALL, // 0 (전체)
  PART // 1 (일부)
}

export enum DATA_RANGE_TYPE {
  ALL, // 0 (전체기간)
  AFTER_SPECIFIC_DATE, // 1 (특정일 이후)
  LATEST, // 2 (최근)
  DAY_BEFORE, // 3 (전날)
  PERIOD // 4 (특정기간)
}

/** ****************************************************************************
 * 레이블 관련 데이터 정의
 **************************************************************************** */

export interface ILabelUsedData {
  id: number
  name: string
  simple_description: string
  created_datetime: string
  manager_name?: string
  department_name?: string
  segment_job_definitions_size?: number
}

export interface ILabelData {
  adid_result_aggregation?: string
  aggregate_base1: AGGREGATE_BASE_1
  aggregate_base2: AGGREGATE_BASE_2
  aggregate_range: RANGE_TYPE
  aggregate_range_description?: null | string
  aggregation_criterias?: any[]
  created_datetime: string
  data_range_extra: string
  data_range_type: DATA_RANGE_TYPE
  data_type: DATA_TYPE
  department_name: string
  description: string
  external_requests: []
  first_job_date: null | string
  gbq_dataset_name: string
  gbq_table_name: string
  hashtags: IHashtagData[]
  id: number
  is_enabled: YN
  key_description?: string
  latest_data_completion_datetime: null | string
  latest_data_count?: null | number
  latest_data_ts?: null | number
  latest_job_date?: null | string
  manager_name: string
  modified_datetime: string
  name: string
  profile: null
  segment_job_definitions: []
  share_targets: string
  simple_description: string
  update_range: RANGE_TYPE
  update_range_description?: null | string
  value_description: string
  value_detail?: string
  value_unit?: string
}

/** ****************************************************************************
 * 레이블 관련 엔티티 정의
 **************************************************************************** */

export interface ILabelUsed {
  id: number
  name: string
  simpleDescription: string
  createdDatetime: string
  managerName?: string
  departmentName?: string
  segmentJobDefinitionsSize?: number
}

export interface ILabel {
  adidResultAggregation?: null | string
  aggregateBase1: AGGREGATE_BASE_1
  aggregateBase2: AGGREGATE_BASE_2
  aggregateRange: number
  aggregateRangeDescription?: null | string
  aggregationCriterias?: any[]
  createdDatetime: string
  dataRangeExtra: string
  dataRangeType: DATA_RANGE_TYPE
  dataType: DATA_TYPE
  departmentName: string
  description: string
  // externalRequests: []
  firstJobDate: null | string
  gbqDatasetName: string
  gbqTableName: string
  hashtags: IHashtag[]
  id: number
  isEnabled: boolean
  keyDescription?: null | string
  latestDataCompletionDatetime: null | string
  latestDataCount?: null | number
  latestDataTs?: null | number
  latestJobDate?: null | string
  managerName: string
  modifiedDatetime: string
  name: string
  profile: null
  segmentJobDefinitions: []
  shareTargets: string
  simpleDescription: string
  // updateRange: RANGE_TYPE
  // updateRangeDescription?: null | string
  valueDescription: string
  valueDetail?: string
  valueUnit?: string
  memo?: null | string
  isTop?: null | boolean
  translate: string // 메타 정보를 보기 좋은 문장으로 구성
}
