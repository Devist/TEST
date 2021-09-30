export enum ID_TYPE {
  PID = 'pid',
  ADID = 'adid',
  ALL = 'all'
}

/** ****************************************************************************
 * 레이블 히스토리 관련 데이터 정의
 **************************************************************************** */

export interface ILabelHistoryData {
  id_type: ID_TYPE
  game_code: string
  data_count: number
  data_ts: number
}

/** ****************************************************************************
 * 레이블 히스토리 관련 엔티티 정의
 **************************************************************************** */

export interface ILabelHistory {
  idType: ID_TYPE
  gameCode: string
  dataCount: number
  updateTime: string
}
