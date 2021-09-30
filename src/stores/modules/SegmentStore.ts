import { ID_TYPE } from '@src/entities'
import { ISegmentService, SegmentService } from '@src/services/segment'
import { ISegment } from '@src/entities/segment'
import { makeAutoObservable } from 'mobx'
import SegmentRepository from '@src/repositories/SegmentRepository'
import { UserStore } from '@src/stores/modules/UserStore'
import RootStore from '@src/stores'

export default class SegmentStore {
  private service: ISegmentService
  public segments: ISegment[] = []
  private filter = {
    idType: ID_TYPE.ALL,
    mine: false,
    gameCode: '',
    keyword: ''
  }
  private userStore: UserStore

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.userStore = rootStore.userStore
    this.service = new SegmentService(new SegmentRepository())
  }

  get getSegments() {
    return this.service.filter(this.segments, {
      ...this.filter,
      mail: this.userStore.email
    })
  }

  public setFilterMine(manager: string) {
    this.filter.mine = manager !== 'all'
  }

  public setFilterIdType(idType: ID_TYPE) {
    this.filter.idType = idType
  }
  public setFilterGameCode(gameCode: string) {
    this.filter.gameCode = gameCode
  }

  public setFilterKeyword(keyword: string) {
    this.filter.keyword = keyword
  }

  public async fetchAll() {
    await this.service.fetchAll().then((response: ISegment[]) => {
      this.segments = response
    })
  }

  public async createOrUpdate(payload: ISegment) {
    await this.service.createOrUpdate(payload).then((response: ISegment) => {
      this.segments.unshift(response)
    })
  }

  public async delete(payload: { id: number }) {
    await this.service.delete(payload).then(() => {
      this.segments.splice(
        this.segments.findIndex((element) => element.id === payload.id),
        1
      )
    })
  }
}
