import { ID_TYPE, ILabelHistory } from '@src/entities'

export interface ILabelHistoryService {
  fetch(payload: ILabelHistoryRequest): Promise<ILabelHistory[]>

  extractDataAndDate(histories: ILabelHistory[] | []): {
    categories: string[]
    pidData: number[]
    adidData: number[]
  }
}

export interface ILabelHistoryServiceMock {
  fetch: jest.Mock<Promise<ILabelHistory[]>>
  extractDataAndDate: jest.Mock<{
    categories: string[]
    pidData: number[]
    adidData: number[]
  }>
}
