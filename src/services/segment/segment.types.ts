import { ISegment } from '@src/entities/segment'
import { ID_TYPE } from '@src/entities'

export interface ISegmentService {
  fetchAll(): Promise<ISegment[]>
  createOrUpdate(payload: ISegment): Promise<ISegment>
  delete(payload: { id: number }): Promise<{ id: number }>
  filter(
    segments: ISegment[],
    filters: {
      mine: boolean
      idType: ID_TYPE
      gameCode: string
      keyword: string
      mail: string
    }
  ): ISegment[]
}

export interface ISegmentServiceMock {
  fetchAll: jest.Mock<Promise<ISegment[]>>
  createOrUpdate: jest.Mock<Promise<ISegment>>
  delete: jest.Mock<Promise<{ id: number }>>
}
