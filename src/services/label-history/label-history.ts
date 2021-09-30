import { ILabelHistoryService } from '@src/services/label-history/label-history.types'
import { ID_TYPE, ILabelHistory } from '@src/entities'
import LabelRepository from '@src/repositories/LabelRepository'
import { memo } from 'react'
import { ILabelHistoryList } from '@src/@types/List'

export class LabelHistoryService implements ILabelHistoryService {
  constructor(private readonly labelRepository: LabelRepository) {}
  fetch(payload: ILabelHistoryRequest): Promise<any> {
    return this.labelRepository
      .fetchHistories(payload)
      .then((response: ILabelHistoryList) => {
        return response.label_data_history
      })
  }

  extractDataAndDate(histories: ILabelHistory[] | []): {
    categories: string[]
    pidData: number[]
    adidData: number[]
  } {
    let categories: string[] = []
    let memoPID: string[] = []
    let memoADID: string[] = []
    let dataPID: number[] = []
    let dataADID: number[] = []

    histories.forEach((history) => {
      let index
      if (history.idType === ID_TYPE.PID) {
        index = memoPID.findIndex((el) => el === history.updateTime)

        if (index > -1) {
          dataPID[index] = dataPID[index] + history.dataCount
        } else {
          memoPID.push(history.updateTime)
          dataPID.push(history.dataCount)
        }
      } else {
        index = memoADID.findIndex((el) => el === history.updateTime)

        if (index > -1) {
          dataADID[index] = dataADID[index] + history.dataCount
        } else {
          memoADID.push(history.updateTime)
          dataADID.push(history.dataCount)
        }
      }
    })
    categories = memoPID

    return { categories, pidData: dataPID, adidData: dataADID }
  }
}
