import {
  CREATE_SOURCE,
  DATA_TYPE,
  ICondition,
  ID_TYPE,
  ILabel,
  IRestoreContent,
  IValueBox,
  JOB_DATE
} from '@src/entities'
import { ISegmentService, SegmentService } from '@src/services/segment'
import { ISegment } from '@src/entities/segment'
import { makeAutoObservable } from 'mobx'
import SegmentRepository from '@src/repositories/SegmentRepository'
import { UserStore } from '@src/stores/modules/UserStore'
import RootStore from '@src/stores'

export enum VIEW_MODE {
  VIEW,
  EDIT
}

export default class SegmentMakeupStore {
  private service: ISegmentService
  private userStore: UserStore

  // ISegment 구성 정보
  public segment: ISegment | null = null
  public createSource: CREATE_SOURCE = CREATE_SOURCE.TEMPLATE
  public name = ''

  // ISegment.queryConfig 구성정보
  public idType: ID_TYPE = ID_TYPE.ADID

  // 드래그앤드랍 정보
  public labelToDrag: ILabel
  public contents: IRestoreContent[] = []
  public games: { value: string; label: string }[] = []

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.userStore = rootStore.userStore
    this.service = new SegmentService(new SegmentRepository())
  }

  public changeCreateSource(source: CREATE_SOURCE) {
    this.createSource = source
  }

  public toggleIdType() {
    this.idType = this.idType === ID_TYPE.PID ? ID_TYPE.ADID : ID_TYPE.PID
  }

  public updateName(name: string) {
    this.name = name
  }

  public initGame(game: { value: string; label: string }) {
    this.games = [game]
  }

  public updateLabelToDrag(label: ILabel) {
    this.labelToDrag = label
  }

  public updateGames(data: { value: string; label: string }[]) {
    this.games = data
  }

  public deleteContents(orIdx: number, andIdx: number) {
    this.contents[orIdx].andBoxes.splice(andIdx, 1)
    if (this.contents[orIdx].andBoxes.length === 0) this.contents.splice(orIdx, 1)
  }

  public addContents() {
    const condition: ICondition = {
      label: this.labelToDrag,
      count: 0,
      aggrBoxes: [],
      allGames: false,
      containClosedGames: false,
      dataType: DATA_TYPE.STRING,
      dateConditionEndPicker: false,
      dateConditionStartPicker: false,
      detail: false,
      details: false,
      gamecodes: this.games.map((game) => game['value']),
      id: 1,
      includeItems: 1,
      jobDate: JOB_DATE.JOBDATE,
      jobDateValue: '',
      jobDateValue2: '',
      jobDateValue3: '',
      jobDateValue4: '',
      jsonFilteredKeys: '',
      name: this.labelToDrag.name,
      simpleDescription: this.labelToDrag.simpleDescription,
      selected: false,
      showDetails: false,
      valid: true,
      valueBoxes: []
    }
    this.contents.push({ andBoxes: [condition] })
  }

  addAndBox(idx: number) {
    const condition: ICondition = {
      label: this.labelToDrag,
      count: 0,
      aggrBoxes: [],
      allGames: false,
      containClosedGames: false,
      dataType: DATA_TYPE.STRING,
      dateConditionEndPicker: false,
      dateConditionStartPicker: false,
      detail: false,
      details: false,
      gamecodes: this.games.map((game) => game['value']),
      id: 1,
      includeItems: 1,
      jobDate: JOB_DATE.JOBDATE,
      jobDateValue: '',
      jobDateValue2: '',
      jobDateValue3: '',
      jobDateValue4: '',
      jsonFilteredKeys: '',
      name: this.labelToDrag.simpleDescription,
      simpleDescription: this.labelToDrag.simpleDescription,
      selected: false,
      showDetails: false,
      valid: true,
      valueBoxes: []
    }
    this.contents[idx].andBoxes.push(condition)
  }

  init() {
    this.games = []
    this.createSource = CREATE_SOURCE.TEMPLATE
  }
}
