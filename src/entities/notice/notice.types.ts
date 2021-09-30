export enum NOTICE_CATEGORY_TYPE {
  RELEASE = 'release',
  NOTICE = 'notice'
}

/** ****************************************************************************
 * 공지사항 관련 데이터 정의
 **************************************************************************** */

export interface INoticeData {
  category: NOTICE_CATEGORY_TYPE
  content: string
  created_datetime: string
  department_name: string
  id: number
  manager_name: string
  modified_datetime: string
  title: string
}

/** ****************************************************************************
 * 공지사항 관련 엔티티 정의
 **************************************************************************** */

export interface INotice {
  category: NOTICE_CATEGORY_TYPE
  content: string
  createdDatetime: string
  departmentName?: string
  id?: number
  managerName: string
  modifiedDatetime?: string
  title: string

  validate?(): boolean
}

export const NOTICE_MIN_TITLE_LENGTH = 10
export const NOTICE_MAX_TITLE_LENGTH = 50
export const NOTICE_MIN_CONTENT_LENGTH = 10
