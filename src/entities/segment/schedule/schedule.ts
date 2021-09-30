import { YN } from '@src/entities/common-enum'
import { Delivery, IDelivery } from '../delivery'
import { ILifeCycle, ISchedule, IScheduleData } from './schedule.types'

export class Schedule implements ISchedule {
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

  constructor(data: IScheduleData) {
    this.createdDatetime = data.created_datetime
    this.deliveries = data.deliverys.map((e) => new Delivery(e))
    this.departmentName = data.department_name
    this.id = data.id
    this.isEnabled = data.is_enabled === YN.YES

    this.mail = data.mail
    this.managerName = data.manager_name
    this.name = data.name
    this.phone = data.phone
    this.schedule = data.schedule
    this.segmentId = data.segment_job_definition_id
  }

  validate(): boolean {
    throw new Error('Method not implemented.')
  }
}
