import {
  IProfile,
  IProfileData,
  IProfileSummary,
  IProfileSummaryData
} from '@src/entities/profile/profile.types'
import { DATA_TYPE } from '@src/entities'

export class ProfileSummary implements IProfileSummary {
  desc: string
  expire: number
  value: string | boolean | number

  constructor(private readonly data: IProfileSummaryData) {
    this.desc = data.desc
    this.expire = data.expire
    this.value = data.value
  }
}

export class Profile implements IProfile {
  categoryId: number
  createdDatetime: string
  dataType: DATA_TYPE
  defaultValue: string
  description: string
  durationHours: number
  gbtClusterId: string
  gbtColumnFamily: string
  gbtColumnQualifier: string
  gbtInstanceId: string
  gbtTableId: string
  id: number | undefined
  isEnabled: boolean
  labelId: number
  latestDataCount: number
  latestDataValidTime: number
  latestJobDate: string
  modifiedDatetime: string
  name: string
  ordering: number | undefined
  profileApiUsers: [] | undefined
  profileId: number | undefined
  sampleValue: string
  title: string
  expiredDate: string
  value: string | number | boolean

  constructor(
    private readonly data: IProfileData,
    expiredDate: number,
    value: string | number | boolean
  ) {
    this.categoryId = data.category_id
    this.createdDatetime = data.created_datetime
    this.dataType = data.data_type
    if (data.default_value) this.defaultValue = data.default_value
    this.description = data.description
    this.durationHours = data.duration_hours
    this.gbtClusterId = data.gbt_cluster_id
    this.gbtColumnFamily = data.gbt_column_family
    this.gbtColumnQualifier = data.gbt_column_qualifier
    this.gbtInstanceId = data.gbt_instance_id
    this.gbtTableId = data.gbt_table_id
    this.id = data.id
    this.isEnabled = data.is_enabled
    this.labelId = data.label_id
    this.latestDataCount = data.latest_data_count
    this.latestDataValidTime = data.latest_data_valid_time
    this.latestJobDate = data.latest_job_date
    this.modifiedDatetime = data.modified_datetime
    this.name = data.name
    this.ordering = data.ordering
    this.profileApiUsers = data.profile_api_users
    this.profileId = data.profile_id
    this.sampleValue = data.sample_value
    this.expiredDate =
      expiredDate > -1 ? new Date(expiredDate / 1000).toLocaleString() : ''
    this.value = value.toString()
  }
}
