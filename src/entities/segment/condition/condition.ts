import { YN } from '@src/entities/common-enum'
import { Delivery, IDelivery } from '../delivery'
import { keysToCamel } from '@src/utils/snakeToCamel'
import {
  ADID_RESULT_AGGREGATION,
  DATA_TYPE,
  ICondition,
  IConditionData,
  ILabel,
  IValueBox,
  JOB_DATE
} from '@src/entities'

export class Condition implements ICondition {
  label: ILabel
  adidResultAggregation?: ADID_RESULT_AGGREGATION
  aggrBoxes: any[]
  allGames: boolean
  containClosedGames: boolean
  count: number
  dataType: DATA_TYPE
  dateConditionEndPicker: boolean
  dateConditionStartPicker: boolean
  detail: boolean
  details: boolean
  gamecodes: string[]
  id: number
  includeItems: number
  jobDate: JOB_DATE
  jobDateValue: string
  jobDateValue2: string
  jobDateValue3: string
  jobDateValue4: string
  jsonFilteredKeys: string
  name: string
  selected: false
  showDetails: false
  valid: true
  valueBoxes: IValueBox[]

  constructor(data: IConditionData) {
    this.adidResultAggregation = data.adid_result_aggregation
    this.aggrBoxes = data.aggr_boxes
    this.jobDateValue = data.job_date_value ? data.job_date_value : ''
    this.jobDateValue2 = data.job_date_value2 ? data.job_date_value2 : ''
    this.jobDateValue3 = data.job_date_value3 ? data.job_date_value3 : ''
    this.jobDateValue4 = data.job_date_value4 ? data.job_date_value4 : ''
  }

  validate(): boolean {
    throw new Error('Method not implemented.')
  }
}
