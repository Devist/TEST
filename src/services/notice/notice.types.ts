import { INotice, INoticeData } from '@src/entities/notice'

export interface INoticeService {
  fetchAll(): Promise<INotice[]>
  fetchMostRecent(): Promise<INotice[]>
  createOrUpdate(payload: INotice): Promise<INotice>
  delete(payload: { id: number }): Promise<{ id: number }>
}

export interface INoticeServiceMock {
  fetchAll: jest.Mock<Promise<INotice[]>>
  fetchMostRecent: jest.Mock<Promise<INotice[]>>
  createOrUpdate: jest.Mock<Promise<INotice>>
  delete: jest.Mock<Promise<{ id: number }>>
}
