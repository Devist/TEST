import { AGGREGATE_BASE_1, DATA_TYPE, ILabel, ILabelMemo, IUser } from '@src/entities'

import { makeAutoObservable, runInAction } from 'mobx'

import { ILabelService, LabelService } from '@src/services'
import LabelRepository from '@src/repositories/LabelRepository'
import MemoRepository from '@src/repositories/MemoRepository'
import { UserStore } from './UserStore'

import RootStore from '../index'

export default class LabelStore {
  private service: ILabelService
  private readonly user: IUser
  public labels: ILabel[] | [] = []
  public filteredLabels: ILabel[] | null
  private userStore: UserStore

  private filterAggregation: AGGREGATE_BASE_1 | number = -1
  private filterDataType: DATA_TYPE | string = ''
  private filterSearch = ''
  private filterKeywords: string[] = []

  public page = 1

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.userStore = rootStore.userStore
    this.service = new LabelService(new LabelRepository(), new MemoRepository())
    this.filteredLabels = null
  }

  public async fetch() {
    try {
      const labels = await this.service
        .fetchAll(this.userStore.custom)
        .then((response: ILabel[]) => {
          return this.service.attachMemos(response, this.userStore.custom.labelMemos)
        })
      runInAction(() => {
        this.labels = labels
      })
      return this.labels
    } catch (e) {
      throw new Error('Method not implemented.')
    }
  }

  public getAll() {
    if (this.labels.length) return this.labels
    this.service.fetchAll(this.userStore.custom).then((response: ILabel[]) => {
      this.labels = this.service.attachMemos(response, this.userStore.custom.labelMemos)
    })
  }

  public updateMemo(data: ILabelMemo) {
    return this.service.upsertMemo(data).then((response: { id: number }) => {
      this.labels = this.service.attachMemo(this.labels, data)
      this.userStore.saveMemo(response.id, data)
      return response
    })
  }

  public deleteMemo(id: number, memoId: number, label: ILabel): Promise<ILabel> {
    return this.service.deleteMemo(id, memoId, label).then((response) => {
      this.userStore.deleteMemo(memoId)
      return response
    })
  }

  public getOneById(id: number) {
    if (this.labels.length) return this.labels.find((label) => label.id === id)
  }

  public filterToAggregation(aggregation: number | AGGREGATE_BASE_1) {
    this.filterAggregation = aggregation
    this.filter()
  }

  public filterToDataType(dataType: DATA_TYPE | string) {
    this.filterDataType = dataType
    this.filter()
  }

  public filterToSearch(searchText: string) {
    this.filterSearch = searchText
    this.filter()
  }

  public filterInit() {
    this.filterAggregation = -1
    this.filterDataType = ''
    this.filterSearch = ''
    this.filterKeywords = []
    this.filter()
  }

  private filter() {
    this.filteredLabels = this.service.filter(
      this.labels,
      this.filterAggregation,
      this.filterDataType,
      this.filterSearch
    )
    this.page = 1
  }

  public findFromKeywords(keywords: string[]) {
    this.filterKeywords = keywords

    this.filter()
    const labels = this.filteredLabels ? this.filteredLabels : this.labels

    if (this.filterKeywords.length > 0) {
      this.filteredLabels = this.service.findFromKeywords(labels, this.filterKeywords)
    }
  }

  public findFromKeyword(keyword: string, checked: boolean) {
    checked
      ? this.filterKeywords.push(keyword)
      : this.filterKeywords.splice(this.filterKeywords.indexOf(keyword), 1)

    this.filter()
    const labels = this.filteredLabels ? this.filteredLabels : this.labels

    if (this.filterKeywords.length > 0)
      this.filteredLabels = this.service.findFromKeywords(labels, this.filterKeywords)
  }

  public getLengthFromKeyword(keyword: string): ILabel[] {
    const labels = this.filteredLabels ? this.filteredLabels : this.labels
    return this.service.findFromKeywords(labels, [keyword])
  }

  public setPage(pageNumber: number) {
    this.page = pageNumber
  }

  public getFromPage() {
    return this.filteredLabels
      ? this.filteredLabels.slice((this.page - 1) * 10, (this.page - 1) * 10 + 10)
      : this.labels.slice((this.page - 1) * 10, (this.page - 1) * 10 + 10)
  }

  /**
   * 즐겨찾기 관련 처리
   */
  public cancelFavorite(labelId: number) {
    const favoriteId = this.userStore.custom.favoriteLabels.find(
      (favorite) => favorite.labelId === labelId
    )?.id

    if (favoriteId) {
      return this.service.cancelFavorite(favoriteId).then(() => {
        this.filteredLabels
          ? (this.filteredLabels = this.service.unpin(labelId, this.filteredLabels))
          : (this.labels = this.service.unpin(labelId, this.labels))
      })
    }
  }

  public addFavorite(labelId: number) {
    return this.service.addFavorite(labelId).then((response) => {
      this.userStore.custom.favoriteLabels = [
        ...this.userStore.custom.favoriteLabels,
        { labelId, id: response.id }
      ]

      this.filteredLabels
        ? (this.filteredLabels = this.service.pinToTop(labelId, this.filteredLabels))
        : (this.labels = this.service.pinToTop(labelId, this.labels))

      this.page = 1
      return response
    })
  }
}
