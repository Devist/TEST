import {
  AGGREGATE_BASE_1,
  AGGREGATE_BASE_2,
  DATA_RANGE_TYPE,
  DATA_TYPE,
  ILabel,
  ILabelData,
  ILabelUsed,
  ILabelUsedData
} from './label.types'
import { ICustom } from '../custom'
import { IHashtag } from '@src/entities/hashtag'
import { YN } from '@src/entities'

export class Label implements ILabel {
  adidResultAggregation?: string | null | undefined
  aggregateBase1: AGGREGATE_BASE_1
  aggregateBase2: AGGREGATE_BASE_2
  aggregateRange: number
  aggregateRangeDescription?: string | null | undefined
  aggregationCriterias?: any[]
  createdDatetime: string
  dataRangeExtra: string
  dataRangeType: DATA_RANGE_TYPE
  dataType: DATA_TYPE
  departmentName: string
  gbqDatasetName: string
  gbqTableName: string
  description: string
  firstJobDate: string | null
  hashtags: IHashtag[]
  id: number
  isEnabled: boolean
  keyDescription?: string | null | undefined
  latestDataCompletionDatetime: string | null
  latestDataCount?: number | null | undefined
  latestDataTs?: number | null | undefined
  latestJobDate?: string | null | undefined
  managerName: string
  modifiedDatetime: string
  name: string
  profile: null
  segmentJobDefinitions: any
  shareTargets: string
  simpleDescription: string
  valueDescription: string
  valueDetail?: string
  valueUnit?: string
  memo?: string | null | undefined
  isTop?: boolean | null | undefined
  translate: string

  constructor(private readonly data: ILabelData, custom: ICustom) {
    this.adidResultAggregation = data.adid_result_aggregation
    this.aggregateBase1 = data.aggregate_base1
    this.aggregateBase2 = data.aggregate_base2
    this.aggregateRange = data.aggregate_range
    this.aggregateRangeDescription = data.aggregate_range_description
    this.aggregationCriterias = data.aggregation_criterias
    this.createdDatetime = data.created_datetime
    this.dataRangeExtra = data.data_range_extra
    this.dataRangeType = data.data_range_type
    this.dataType = data.data_type
    this.departmentName = data.department_name
    this.description = data.description
    this.firstJobDate = data.first_job_date

    this.hashtags = data.hashtags?.slice()
    this.hashtags?.forEach((item) => {
      item.backgroundColor = custom.hashtagColors.find(
        (e) => e.hashtagId == item.id
      )?.backgroundColor

      item.fontColor = custom.hashtagColors.find((e) => e.hashtagId == item.id)?.fontColor
    }, [])

    this.id = data.id
    this.isEnabled = data.is_enabled === YN.YES
    this.keyDescription = data.key_description
    this.latestDataCompletionDatetime = data.latest_data_completion_datetime
    this.latestDataCount = data.latest_data_count
    this.latestDataTs = data.latest_data_ts
    this.latestJobDate = data.latest_job_date
    this.managerName = data.manager_name
    this.modifiedDatetime = data.modified_datetime
    this.name = data.name
    this.profile = data.profile
    this.segmentJobDefinitions = data.segment_job_definitions
    this.shareTargets = data.share_targets
    this.simpleDescription = data.simple_description
    this.valueDescription = data.value_description
    this.valueDetail = data.value_detail
    this.valueUnit = data.value_unit
    this.gbqDatasetName = data.gbq_dataset_name
    this.gbqTableName = data.gbq_table_name

    this.memo = custom.labelMemos.find((e) => e.labelId == data.id)?.memo

    this.isTop = custom.favoriteLabels.findIndex((e) => e.labelId == data.id) > -1
    this.translate = this.makeTranslate()
  }

  private makeTranslate(): string {
    const range = this.getRangeToString()
    const aggregate = this.getAggregateToString()
    const description = this.getDescriptionToString()
    const dataType = this.getDataTypeToString()
    return `
      ${range} <br/> ${aggregate} <br/> ${description} ${dataType}
    `
  }

  private getRangeToString(): string {
    const rangeStrings = {
      [DATA_RANGE_TYPE.ALL]: '<strong>전체 기간</strong>의 데이터로부터',
      [DATA_RANGE_TYPE.AFTER_SPECIFIC_DATE]: `<strong>${this.dataRangeExtra} 이후</strong> 데이터로부터`,
      [DATA_RANGE_TYPE.LATEST]: `<strong>최근 ${this.dataRangeExtra} 간</strong>의 데이터로부터`,
      [DATA_RANGE_TYPE.DAY_BEFORE]: '<strong>전날</strong> 데이터로부터',
      [DATA_RANGE_TYPE.PERIOD]: `
          <strong>${this.dataRangeExtra.split(',')[0]} ~ 
                  ${this.dataRangeExtra.split(',')[1]} 범위</strong>의 데이터로부터`
    }
    return rangeStrings[this.dataRangeType]
  }

  private getAggregateToString(): string {
    const baseOneStrings = {
      [AGGREGATE_BASE_1.GAME]: '<strong>게임별',
      [AGGREGATE_BASE_1.PERSONALIZED_ID]: '<strong>개인화 ID별'
    }

    const baseTwoStrings = this.aggregateBase2
      ? `${this.aggregateBase2}</strong> 기준으로`
      : '로'

    return `${baseOneStrings[this.aggregateBase1]} ${baseTwoStrings}`
  }

  private getDescriptionToString(): string {
    return `
      <strong>${
        this.valueDescription ? this.valueDescription : this.description
      }</strong> 정보를
    `
  }

  private getDataTypeToString(): string {
    const dataTypeString = {
      [DATA_TYPE.NONE]: '얻을 수 있습니다.',
      [DATA_TYPE.JSON]: '얻을 수 있습니다.',
      [DATA_TYPE.STRING]: `<strong>텍스트(문자) 값</strong>으로 얻을 수 있습니다.`,
      [DATA_TYPE.BOOLEAN]: `<strong>참거짓(true 또는 false) 값</strong>으로 얻을 수 있습니다.`,
      [DATA_TYPE.NUMBER]: `<strong>숫자(number) 값</strong>으로 얻을 수 있습니다.`,
      [DATA_TYPE.TIMESTAMP]: `<strong>시간 값</strong>으로 얻을 수 있습니다.`
    }
    return dataTypeString[this.dataType]
  }
}

export class LabelUsed implements ILabelUsed {
  id: number
  name: string
  simpleDescription: string
  createdDatetime: string
  segmentJobDefinitionsSize?: number
  managerName?: string
  departmentName?: string
  constructor(private readonly data: ILabelUsedData) {
    this.id = data.id
    this.name = data.name
    this.simpleDescription = data.simple_description
    this.createdDatetime = data.created_datetime
    this.segmentJobDefinitionsSize = data?.segment_job_definitions_size
    this.managerName = data?.manager_name
    this.departmentName = data?.department_name
  }
}
