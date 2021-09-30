import { IHashtag, INotice } from '@src/entities'
import { makeAutoObservable } from 'mobx'
import KeywordRepository from '@src/repositories/KeywordRepository'
import { IKeywordService, KeywordService } from '@src/services'
import RootStore from '@src/stores'

export default class KeywordStore {
  private service: IKeywordService
  public keywords: IHashtag[] = []

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)

    this.service = new KeywordService(new KeywordRepository())
    this.service.fetchAll().then((response: IHashtag[]) => {
      this.keywords = response
    })
  }

  public getKeywords(): IHashtag[] {
    return this.keywords
  }

  //
  //
  // public async createOrUpdate(payload: INotice) {
  //   await this.service.createOrUpdate(payload).then((response: INotice) => {
  //     this.notices.unshift(response)
  //   })
  // }
  //
  // public async delete(payload: { id: number }) {
  //   await this.service.delete(payload).then((response: { id: number }) => {
  //     this.notices.splice(
  //       this.notices.findIndex((element) => element.id === payload.id),
  //       1
  //     )
  //   })
  // }
}
