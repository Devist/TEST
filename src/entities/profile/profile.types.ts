import { DATA_TYPE } from '@src/entities'

/** ****************************************************************************
 * 유저프로필 관련 데이터 정의
 **************************************************************************** */

export interface IProfileSummaryData {
  desc: string // 설명 ..
  expire: number
  value: string | boolean | number
}

export interface IProfileData {
  category_id: number
  created_datetime: string
  data_type: DATA_TYPE
  default_value?: string
  description: string // 제목 ..
  duration_hours: number
  gbt_cluster_id: string
  gbt_column_family: string
  gbt_column_qualifier: string
  gbt_instance_id: string
  gbt_table_id: string
  id?: number
  is_enabled: boolean
  label_id: number
  latest_data_count: number
  latest_data_valid_time: number
  latest_job_date: string
  modified_datetime: string
  name: string
  profile_api_users?: []
  sample_value: string
  ordering?: number
  profile_id?: number
}

/** ****************************************************************************
 * 유저프로필 관련 엔티티 정의
 **************************************************************************** */

export type IProfileSummary = IProfileSummaryData

export interface IProfile {
  categoryId: number
  createdDatetime: string
  dataType: DATA_TYPE
  defaultValue?: string
  description: string
  durationHours: number
  gbtClusterId: string
  gbtColumnFamily: string
  gbtColumnQualifier: string
  gbtInstanceId: string
  gbtTableId: string
  id?: number
  isEnabled: boolean
  labelId: number
  latestDataCount: number
  latestDataValidTime: number
  latestJobDate: string
  modifiedDatetime: string
  name: string
  profileApiUsers?: []
  sampleValue: string
  ordering?: number
  profileId?: number
  title?: string // 레이블에서 가져옴..
  expiredDate?: string // summary 로부터 가져옴..
  value?: string | number | boolean // summary 로부터 가져옴...
}
