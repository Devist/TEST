import { AGGREGATE_BASE_1, DATA_TYPE, ILabel, ILabelUsed } from '@src/entities/label'
import { ICustom, ILabelMemo } from '@src/entities'

export interface ILabelService {
  fetchAll(customInfo: ICustom): Promise<ILabel[]>
  fetchRecent(): Promise<ILabelUsed[]>

  // 메모 관련
  upsertMemo(memo: ILabelMemo): Promise<{ id: number }>
  attachMemos(labels: ILabel[], memos: ILabelMemo[]): ILabel[]
  attachMemo(labels: ILabel[] | [], data: ILabelMemo): ILabel[] | []
  deleteMemo(id: number, memoId: number, label: ILabel): Promise<ILabel>

  filter(
    labels: ILabel[] | [],
    filterAggregation: AGGREGATE_BASE_1 | number,
    filterDataType: DATA_TYPE | string,
    filterSearch: string
  ): ILabel[] | null

  findFromKeywords(labels: ILabel[], keywords: string[]): ILabel[]

  // 즐겨찾기 관련
  addFavorite(labelId: number): Promise<{ id: number }>
  cancelFavorite(favoriteId: number): Promise<{ id: number }>
  pinToTop(labelId: number, labels: ILabel[]): ILabel[]
  unpin(labelId: number, labels: ILabel[] | []): ILabel[]
}

export interface ILabelServiceMock {
  fetchAll(): Promise<ILabel[]>
  fetchRecent(): Promise<ILabelUsed[]>
  // getOneById: jest.Mock<INotice | undefined>
  // deleteOnById: jest.Mock<INoticeData | undefined>
  // createNotice: jest.Mock<INotice>
  // convertToData: jest.Mock<INoticeData>
}
