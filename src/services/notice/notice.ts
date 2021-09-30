import { INotice, INoticeData, Notice } from '@src/entities'
import NoticeRepository from '@src/repositories/NoticeRepository'
import { INoticeService } from '@src/services'
import { INoticeList } from '@src/@types/List'

export class NoticeService implements INoticeService {
  constructor(private readonly noticeRepository: NoticeRepository) {}

  fetchAll(): Promise<INotice[]> {
    return this.noticeRepository.fetchAll().then((response: INoticeList<INoticeData>) => {
      return response.notices.map((item) => new Notice(item))
    })
  }

  fetchMostRecent(): Promise<INotice[]> {
    const pagination = { page_index: 0, page_size: 1 }

    return this.noticeRepository
      .fetchAll(pagination)
      .then((response: INoticeList<INoticeData>) => {
        return response.notices.map((item) => new Notice(item))
      })
  }

  createOrUpdate(payload: INotice): Promise<INotice> {
    return this.noticeRepository.createOrUpdate(payload).then((response: INoticeData) => {
      return new Notice(response)
    })
  }

  delete(payload: { id: number }): Promise<{ id: number }> {
    return this.noticeRepository.delete(payload).then((response: { id: number }) => {
      return response
    })
  }
}
