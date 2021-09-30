import { DATA_TYPE, ID_TYPE, ILabel } from '@src/entities'

export enum ADID_RESULT_AGGREGATION {
  MAX = 'max',
  MIN = 'min',
  SUM = 'sum',
  AVG = 'avg',
  CONCAT = 'concat',
  STRING_AGG = 'string_agg'
}

export enum JOB_DATE {
  TODAY = 'TODAY', // 최근 ~ 일  // job_date_value
  JOBDATE = 'JOBDATE', // 마지막으로 집계된 날짜 - 뒤에 머 필요
  RANGE = 'RANGE', // 특정 기간 - job_date_value3, job_date_value4
  NO_DATE = 'NO_DATE', // 전체 기간 - 뒤에 머 필요 없음
  DAY = 'DAY' // 특정날짜 // job_date_value2
}

export enum SOURCE_TYPE {
  LABEL = 'LABEL',
  SINGULAR = 'singular'
}

export enum VALUE_SIGN {
  LESS_THAN = '<',
  LESS_THAN_OR_EQUAL_TO = '<=',
  GREATER_THAN = '>',
  GREATER_THAN_OR_EQUAL_TO = '>=',
  EQUAL = '='
}

export enum INCLUDE_ITEMS { // 날짜 조건 옆, 다음을 포함에 대한 결정
  'INCLUDE',
  'NOT_INCLUDE'
}

export enum AGGR_BOXES_STRING_OPTIONS {
  COUNT = 'COUNT',
  MAX = 'MAX',
  MIN = 'MIN',
  CONCAT = 'CONCAT'
}
export enum AGGR_BOXES_TIMESTAMP_OPTIONS {
  COUNT = 'COUNT',
  MAX = 'MAX',
  MIN = 'MIN'
}
export enum AGGR_BOXES_NUMBER_OPTIONS {
  COUNT = 'COUNT',
  SUM = 'SUM',
  AVG = 'AVG',
  MAX = 'MAX',
  MIN = 'MIN'
}
export enum AGGR_BOXES_BOOLEAN_OPTIONS {
  COUNT = 'COUNT'
}

/** ****************************************************************************
 * 조건 관련 데이터 정의
 **************************************************************************** */

export interface IValueData {
  and_value_date_picker?: false
  and_value_time_picker?: false
  key?: string // JSON 키
  value: string // 모든 것의 대한 값
  value2: null | string // json 값 안쓰는듯?
  value_sign: VALUE_SIGN
  value_time?: string // 시간
}

export interface IValueBoxData {
  values: IValueData[]
}

export interface IConditionData {
  // 여기 안에는 텍스트라 넣는 데로 드감
  adid_result_aggregation?: ADID_RESULT_AGGREGATION // data_type 이 NONE 일 경우, 속성이 없을 수 있음 . deprecated 안 씀
  // aggr_alias: any[] // 다 [] - 안씀
  aggr_boxes: any[] // 다 [] - 사용. 실계에서 샘플 찾을 수 없기 때문에 따로 찾아봐야될듯
  all_games: boolean
  contain_closed_games: boolean
  count: number // 해당 레이블이 몇 번 쓰였는지. 같은 레이블을 두개 사용할 경우, 첫번째 레이블은 1, 두번째 레이블은 2 ...
  dataToSegment?: boolean // JSON 일 때, 키를 여러개 집어넣으면 키별로 컬럼을 따로 줌. 키마다 달림 - 결과값 체크박스 체크 유무
  gameCodeToSegment?: boolean // 결과값 선택 창에서, 게임 코드 넣을지말지 선택하는거 체크 유무
  data?: any // ?? 결과값 관련된거 같은데
  data_type: DATA_TYPE
  date_condition_end_picker: boolean // 세그먼트 생성 - 날짜조건 -특정기간 선택시 - 피커 띄울지 말지 결정하는 놈.. 뒤에꺼
  date_condition_start_picker: boolean // 세그먼트 생성 - 날짜조건 -특정기간 선택시 - 피커 띄울지 말지 결정하는 놈.. 앞에꺼
  detail: boolean // 세그먼트 생성 - 레이블 상세정보 띄울지 말지 결정
  details: boolean // 오타
  gamecodes: string[] //
  id: number // 레이블 ID
  include_items: INCLUDE_ITEMS //
  job_date: JOB_DATE // ??
  job_date_value?: string // ?? 최근일
  job_date_value2?: string // ??
  job_date_value3?: string // ??
  job_date_value4?: string // ??
  json_filtered_keys: string // 집계에서 제외할 키, 콤마로 구분
  name: string // 레이블 이름
  on_criteria_data?: boolean // detail 되었을 때 데이터 가져왔는지 안가져왔는지 보여줌
  selected: false // 안씀
  show_details: false // 왼쪽 레이블 리스트에서 디테일 보일지 말지
  source_type?: SOURCE_TYPE
  valid: boolean // 현재 컨디션에 대한 정합성 체크
  value_boxes: IValueBoxData[]
}

/** ****************************************************************************
 * 조건 관련 엔티티 정의
 **************************************************************************** */

export interface IValue {
  andValueDatePicker?: false
  andValueTimePicker?: false
  key?: string // JSON 키
  value: string // 모든 것의 대한 값
  value2: null | string // json 값 안쓰는듯?
  valueSign: VALUE_SIGN
  valueTime?: string // 시간
}

export interface IValueBox {
  values: IValue[]
}

export interface ICondition {
  label: ILabel
  adidResultAggregation?: ADID_RESULT_AGGREGATION
  aggrBoxes: any[]
  allGames: boolean
  containClosedGames: boolean
  count: number // ??
  dataType: DATA_TYPE
  dateConditionEndPicker: boolean
  dateConditionStartPicker: boolean
  detail: boolean
  details: boolean
  gamecodes: string[]
  id: number // 레이블 ID ??
  includeItems: number // ??
  jobDate: JOB_DATE // ??
  jobDateValue: string // 최근~일
  jobDateValue2: string // ??
  jobDateValue3: string // ??
  jobDateValue4: string // ??
  jsonFilteredKeys: string // ??
  name: string // ??
  simpleDescription?: string
  selected: false
  showDetails: false
  valid: true
  valueBoxes: IValueBox[]
}
