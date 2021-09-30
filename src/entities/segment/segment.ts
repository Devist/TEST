import { ISchedule, Schedule } from './schedule'
import { CREATE_SOURCE, ISegment, ISegmentData } from './segment.types'
import { ID_TYPE, IUser } from '@src/entities'

export class Segment implements ISegment {
  createSource: CREATE_SOURCE
  departmentName: string
  description: string
  id: number
  includeColumns: string[]
  mail: string
  managerName: string
  name: string
  phone: string
  queryConfig: { meta: { idType: ID_TYPE } }
  restoreContent: any
  schedules: ISchedule[]
  targetGames: string[]
  startDatetime: string
  endDatetime: string
  translate: string
  createdDatetime: string
  modifiedDatetime: string

  constructor(data: ISegmentData, user: IUser | null = null) {
    this.createSource = data.create_source
    this.createdDatetime = data.created_datetime
    this.modifiedDatetime = data.modified_datetime
    this.departmentName = data.department_name
    this.description = data.description
    this.id = data.id
    this.includeColumns = data.include_columns
    this.mail = data.mail
    this.managerName = data.manager_name
    this.name = data.name
    this.phone = data.phone
    this.queryConfig = data.query_config
    this.restoreContent = data.restore_content
    this.schedules = data.schedules.map((e) => new Schedule(e))
    this.targetGames = data.target_games
    this.startDatetime = data.created_datetime // API 완료시 변경
    this.endDatetime = data.modified_datetime // API 완료시 변경 필요
    this.translate = this.makeTranslate(user)
  }

  private makeTranslate(user: IUser | null): string {
    const game = this.getTargetGamesToString(user)
    const idType = this.getIdTypeToString()
    const name = this.getNameToString()
    return `
      ${game} <br/> ${idType} <br/> ${name}
    `
  }

  private getTargetGamesToString(user: IUser | null) {
    if (this.targetGames[0] === 'all_games') {
      return `<strong>전체</strong> 게임으로부터`
    } else {
      return `<strong>${
        user &&
        user.games[
          user.games.findIndex((element) => element.code === this.targetGames[0])
        ].name
      }(${this.targetGames[0]}) ${
        this.targetGames.length > 1 ? `외 ${this.targetGames.length - 1}개` : null
      }</strong>의 게임으로부터`
    }
  }

  private getIdTypeToString() {
    return `<strong>${this.queryConfig.meta.idType}</strong> 대상으로 우측의 참조 레이블을 통해`
  }

  private getNameToString() {
    return `<strong><${this.name}></strong> 세그먼트를 생성합니다.`
  }

  validate(): boolean {
    throw new Error('Method not implemented.')
  }
}
