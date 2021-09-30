import { makeAutoObservable } from 'mobx'

import RootStore from '../index'
import {
  ILabelHistoryService,
  LabelHistoryService,
  mockLabelHistoryService
} from '@src/services/label-history'
import LabelRepository from '@src/repositories/LabelRepository'
import { ID_TYPE, ILabelHistory } from '@src/entities'

type series = {
  name: ID_TYPE
  data: number[]
}

type categories = string[]

export default class LabelHistoryStore {
  private service: ILabelHistoryService
  private userStore

  private histories: ILabelHistory[] | [] = []
  private seriesArray: series[] | [] = []
  private seriesPID: number[] = []
  private seriesADID: number[] = []
  public categories: categories = []

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.userStore = rootStore.userStore
    this.service = new LabelHistoryService(new LabelRepository())
  }

  isTest(test: boolean) {
    if (test) this.service = mockLabelHistoryService()
  }

  public async fetchThirtyDays(labelId: number): Promise<ILabelHistory[]> {
    if (this.histories.length) return this.histories

    const payload: ILabelHistoryRequest = {
      startJobDate: '2021-07-01',
      endJobDate: '2021-07-30',
      labelId
    }

    return await this.service.fetch(payload).then((response: ILabelHistory[]) => {
      console.log('결과', response)
      this.histories = response
      const dataAndDate = this.service.extractDataAndDate(response)
      this.categories = dataAndDate.categories
      this.seriesPID = dataAndDate.pidData
      this.seriesADID = dataAndDate.adidData
      return response
    })
  }

  public getSeries(labelId: number) {
    if (this.seriesArray) return this.seriesArray
    this.fetchThirtyDays(labelId).then((response) => {
      this.histories = response
    })
  }

  public getData(type: ID_TYPE) {
    if (!this.histories.length) return []
    return type === ID_TYPE.PID ? this.seriesPID : this.seriesADID
  }
}
