import { INotice } from '@src/entities'
import { makeAutoObservable } from 'mobx'
// import { toast } from 'react-toastify'

import { INoticeService, NoticeService } from '@src/services'
import NoticeRepository from '@src/repositories/NoticeRepository'

export class NoticeStore {
  private service: INoticeService

  private notices: INotice[] = []

  constructor() {
    makeAutoObservable(this)

    this.service = new NoticeService(new NoticeRepository())
  }

  get getNotices() {
    return this.notices
  }

  public async fetch() {
    await this.service.fetchAll().then((response: INotice[]) => {
      this.notices = response
    })
  }

  public async createOrUpdate(payload: INotice) {
    await this.service.createOrUpdate(payload).then((response: INotice) => {
      this.notices.unshift(response)
    })
  }

  public async delete(payload: { id: number }) {
    await this.service.delete(payload).then((response: { id: number }) => {
      this.notices.splice(
        this.notices.findIndex((element) => element.id === payload.id),
        1
      )
    })
  }
}
