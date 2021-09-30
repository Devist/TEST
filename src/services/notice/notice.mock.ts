import { INoticeServiceMock } from '@src/services'
import { INotice, mockNotices } from '@src/entities'
export const mockNoticesService = (): INoticeServiceMock =>
  <INoticeServiceMock>{
    fetchAll: (): Promise<INotice[]> =>
      new Promise((resolve) => {
        resolve(mockNotices())
      }),
    fetchMostRecent: jest.fn()
  }
