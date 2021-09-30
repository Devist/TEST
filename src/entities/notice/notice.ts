import {
  INotice,
  INoticeData,
  NOTICE_CATEGORY_TYPE,
  NOTICE_MAX_TITLE_LENGTH,
  NOTICE_MIN_CONTENT_LENGTH,
  NOTICE_MIN_TITLE_LENGTH
} from './notice.types'

export class Notice implements INotice {
  category: NOTICE_CATEGORY_TYPE
  content: string
  createdDatetime: string
  departmentName: string
  id: number
  managerName: string
  modifiedDatetime: string
  title: string

  constructor(data: INoticeData) {
    this.category = data.category
    this.content = data.content
    this.createdDatetime = data.created_datetime
    this.departmentName = data.department_name
    this.id = data.id
    this.managerName = data.manager_name
    this.modifiedDatetime = data.modified_datetime
    this.title = data.title
  }

  validate(): boolean {
    if (
      !this.title ||
      this.title.length < NOTICE_MIN_TITLE_LENGTH ||
      this.title.length > NOTICE_MAX_TITLE_LENGTH
    ) {
      return false
    }

    return !(!this.content || this.content.length < NOTICE_MIN_CONTENT_LENGTH)
  }
}
