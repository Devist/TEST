export enum QUERY_DATA_TYPE {
  NONE = 'NONE',
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  JSON = 'JSON',
  BOOLEAN = 'BOOLEAN',
  TIMESTAMP = 'TIMESTAMP'
}

export enum END_JOB_DATE_TYPE {
  TODAY = '@TODAY', // + a
  TIMESTAMP = '@TIMESTAMP-', // + label ID
  JOB_DATE = '@JOBDATE-' // + label ID
}

// 레이블 마다 존재
export interface IQueryMetaData {
  dataType: QUERY_DATA_TYPE
  endJobDate: string | null
  gameCodes: string[] // 타겟 게임 목록
  groupByColumns: null // JSON 이 아닌데 집계 조건이 들어간 경우{최근, 전체, 특정기간}, ["id", "game_code", 레이블 alias(컬럼infos 2번쨰 alias)]
  jsonAggrFilterKeys: string // JSON 일 때 , 집계에서 제외할 키, 콤마로 구분
  label: string // 레이블 이름
  labelId: number // 레이블 ID
  labelIndex: number // 세그먼트 내에서 레이블 배치 순서. 1부터 시작
  secondaryDataType: null // 레이블이 JSON 일 경우, JSON object 의 값의 데이터타입을 나타냄
  // segmentColumnInfosList: [{,…}, {,…}, {,…}] // 첫번째 배열(안에 반드시 두개), 두번째 배열 반드시 ... 값조건(or일 경우 배열 요소 하나씩 추가됨) ... 집계조건
  startJobDate: string | null
  timestamp: string | null
  timestampFormat: string | null // 다시
  timestampZone: string | null // 다시
  useAllGames: boolean // 타겟 게임을 모든 게임으로 설정 여부
  useClosedGames: boolean // 타겟 게임에 종료된 게임 포함 여부
}

// 기존 용어로, 날짜 조건에 대하여

// '마지막으로 집계된 날짜' 인 경우,
// startJobDate = @JOBDATE-{레이블아이디}
// endJobDate = @JOBDATE-{레이블아이디}
// timestamp = @TIMESTAMP-{레이블아이디}

// 최근인 경우
// startJobDate = @TODAY-(일수 - 1)
// endJobDate = @TODAY
// timestamp = null // timestamp 는 애초에 마지막으로 집계된 날짜에서만 사용

// 특정 기간인 경우
// startJobDate = 2021-04-20
// endJobDate = 2021-04-21

// 특정 날짜인 경우
// startJobDate = 2021-04-20
// endJobDate =2021-04-20

// 전체기간
// startJobDate = null
// endJobDate = @JOBDATE-{레이블아이디} // 혹시 null 일수도
