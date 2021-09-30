import {
  DELIVERY_TYPE,
  IExtraInfoPlatformTag,
  IExtraInfoPlatformCsv,
  IDelivery,
  IDeliveryData,
  NOTIFICATION_TYPE
} from './delivery.types'

import { keysToCamel } from '@src/utils/snakeToCamel'

export class Delivery implements IDelivery {
  createdDatetime: string
  extraInfo: IExtraInfoPlatformTag | IExtraInfoPlatformCsv
  id: number
  modifiedDatetime: string
  notificationType: NOTIFICATION_TYPE
  segmentJobScheduleId: number
  shareTargets: string[]
  type: DELIVERY_TYPE

  constructor(data: IDeliveryData) {
    this.createdDatetime = data.created_datetime
    this.extraInfo = keysToCamel(data.extra_info)
    this.id = data.id
    this.modifiedDatetime = data.modified_datetime
    this.notificationType = data.notification_type
    this.segmentJobScheduleId = data.segment_job_schedule_id
    this.shareTargets = data.share_targets
    this.type = data.type
  }

  validate(): boolean {
    throw new Error('Method not implemented.')
  }
}
