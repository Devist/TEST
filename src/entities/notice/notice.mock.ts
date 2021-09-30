import { Notice } from './notice'
import { INotice, INoticeData, NOTICE_CATEGORY_TYPE } from './notice.types'

export const mockNoticeData = (): INoticeData[] => [
  {
    category: NOTICE_CATEGORY_TYPE.NOTICE,
    content: '<p>test2</p>',
    created_datetime: '2020-05-22T01:01:09.000Z',
    department_name: '개인화서비스개발팀',
    id: 16,
    manager_name: '홍승한',
    modified_datetime: '2020-05-22T01:01:09.000Z',
    title: '공지사항 입니다.'
  }
]

export const mockNotices = (data: INoticeData[] = mockNoticeData()): INotice[] =>
  data.map((item) => new Notice(item))
