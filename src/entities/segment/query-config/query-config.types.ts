import { ID_TYPE } from '@src/entities'
import { IQueryMetaData } from '@src/entities/segment/query-config/query-meta'
/** ****************************************************************************
 * 메타 조건 관련 데이터 정의
 **************************************************************************** */

export enum JOIN_COLUMNS_TYPE {
  ID = 'id',
  GAME_CODE = 'game_code' // PID 로 결과 보기를 선택했을 경우에만 포함
}

export enum COLUMN_TYPE {
  OS = 'OS',
  INSTALL_COUNTRY = 'FirstCountryCD'
}

export enum OS_TYPE {
  ANDROID,
  IOS
}

export enum OPERATOR_TYPE {
  IN = 'IN',
  EQUAL = '=',
  NOT_EQUAL = '!='
}

export enum ADID_FILTER_DATE_TYPE {
  MONTH = 'month',
  DAY = 'day',
  YEAR = 'year',
  WEEK = 'week'
}

export interface IMiMasterTableCondition {
  column: COLUMN_TYPE
  op: OPERATOR_TYPE
  value: string
}

export interface IMetaConditionData {
  additionConditions: string[] // ["addition IS NULL OR addition != 'deleted'"] 빅쿼리 SQL 로 쿼리할 때, 이 문장이 들어감 ( 프로필 관련 추가정보)
  idType: ID_TYPE // 결과값(집계기준)의 ID 타입 [ PID | ADID ]
  idfvFilter: boolean // 현재 항상 TRUE. ADID 에도 종류가 있는데, 이걸 제외하고 전달하겠다는 의미
  joinColumns: JOIN_COLUMNS_TYPE[] // PID 거나 (게임코드 있을 경우,디프리케이티드) ['id','game_code'] , ADID 일 경우 ['id']
  labelRelation: string // 세부 조건 제외한 레이블 간의 관계만을 나타냄. And 관계 - 괄호 안 , OR 관계 - 괄호 밖, #{number} 계속 증가 // label 인 경우 label 명 앞에 label_ 붙는데, 싱귤러는? label_singular_app_event
  // limit: null // 쿼리 제한
  miConditions: IMiMasterTableCondition[] | [] //
  // orderByMap: null // 사용 안 함
  recentAdidFilter: number | null // MI 마스터 테이블의 '유효한 ADID 필터 기간' 설정값
  recentAdidFilterUnit: ADID_FILTER_DATE_TYPE | null // MI 마스터 테이블의 '유효한 ADID 필터 기간' 설정값
  segmentLabelQueryMetas: IQueryMetaData[] // 레이블 개수만큼 존재
}
