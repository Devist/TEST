import {
  AGGREGATE_BASE_1,
  DATA_TYPE,
  ILabel,
  ILabelData,
  ILabelUsed,
  ILabelUsedData,
  Label,
  LabelUsed
} from '@src/entities/label'
import LabelRepository from '@src/repositories/LabelRepository'
import MemoRepository from '@src/repositories/MemoRepository'
import { ILabelService } from '@src/services/label/label.types'

import { ICustom, ILabelMemo } from '@src/entities'
import { keysToSnake } from '@src/utils/camelToSnake'
import PersonalRepository from '@src/repositories/PersonalRepository'
import { ILabelList } from '@src/@types/List'

export class LabelService implements ILabelService {
  private readonly personalRepository

  constructor(
    private readonly labelRepository: LabelRepository = new LabelRepository(),
    private readonly memoRepository: MemoRepository = new MemoRepository()
  ) {
    this.personalRepository = new PersonalRepository()
  }

  public fetchAll(customInfo: ICustom): Promise<ILabel[]> {
    return this.labelRepository.fetchAll().then((response: ILabelList<ILabelData>) => {
      return LabelService.sortByFavorite(
        response.labels.map((item) => new Label(item, customInfo))
      )
    })
  }

  public fetch(params: any, customInfo: ICustom): Promise<ILabel> {
    return this.labelRepository.fetch(params).then((response: ILabelData) => {
      return new Label(response, customInfo)
    })
  }

  public fetchRecent(): Promise<ILabelUsed[]> {
    const day = { latest_days: 30 }

    return this.labelRepository
      .fetchRecent(day)
      .then((response: ILabelList<ILabelUsedData>) => {
        return response.labels.map((item) => new LabelUsed(item))
      })
  }

  public fetchMostUsed(): Promise<ILabelUsed[]> {
    const payload = { limit: 10 }

    return this.labelRepository
      .fetchMostUsed(payload)
      .then((response: ILabelList<ILabelUsedData>) => {
        return response.labels.map((item) => new LabelUsed(item))
      })
  }

  public attachMemos(labels: ILabel[], memos: ILabelMemo[]): ILabel[] {
    for (const memoInformation of memos) {
      const index = labels.findIndex((label) => label.id === memoInformation.labelId)
      if (index > -1) labels[index].memo = memoInformation.memo
    }
    return labels
  }

  public attachMemo(labels: ILabel[], memoInformation: ILabelMemo): ILabel[] {
    const index = labels.findIndex((label) => label.id === memoInformation.labelId)
    if (index > -1) labels[index].memo = memoInformation.memo
    return labels
  }

  public upsertMemo(memo: ILabelMemo): Promise<{ id: number }> {
    console.log(keysToSnake(memo))
    return this.memoRepository
      .upsert(keysToSnake(memo))
      .then((response: { id: number }) => response)
  }

  public deleteMemo(id: number, memoId: number, label: ILabel): Promise<ILabel> {
    return this.memoRepository.delete(memoId).then(() => {
      console.info(label)
      label.memo = null
      return label
    })
  }

  public filter(
    labels: ILabel[] | [],
    filterAggregation: AGGREGATE_BASE_1 | number,
    filterDataType: DATA_TYPE | string,
    filterSearch: string
  ): ILabel[] | [] {
    let result: ILabel[] | [] = labels

    // 전체 조건 없을 경우 그대로 반환
    if (filterAggregation === -1 && !filterDataType && !filterSearch) return result

    if (filterAggregation !== -1 && filterDataType) {
      result = labels.filter(
        (label) =>
          filterAggregation === label.aggregateBase1 && filterDataType === label.dataType
      )
    } else if (filterAggregation !== -1) {
      result = labels.filter((label) => filterAggregation === label.aggregateBase1)
    } else if (filterDataType) {
      result = labels.filter((label) => filterDataType === label.dataType)
    }

    // 검색어에 따른 검색 수행
    result = result.filter((label: ILabel) => {
      if (label.description.includes(filterSearch)) return label
      if (label.name.includes(filterSearch)) return label
      if (label.simpleDescription?.includes(filterSearch)) return label
      if (label.translate.includes(filterSearch)) return label
      if (label.memo?.includes(filterSearch)) return label
      for (let i = 0; i < label.hashtags.length; i++) {
        if (label.hashtags[i].hashtag.includes(filterSearch)) return label
      }
    })
    return result
  }

  public findFromKeywords(labels: ILabel[], keywords: string[]): ILabel[] {
    return labels.filter((label) => {
      for (let i = 0; i < keywords.length; i++) {
        let result = false
        label.hashtags.map((hashtag) => {
          if (hashtag.hashtag === keywords[i]) result = true
        })
        if (!result) return false
      }
      return true
    })
  }

  public addFavorite(labelId: number): Promise<{ id: number }> {
    return this.personalRepository.addFavorite(labelId)
  }

  public cancelFavorite(favoriteId: number): Promise<{ id: number }> {
    return this.personalRepository.deleteFavorite(favoriteId)
  }

  public pinToTop(labelId: number, labels: ILabel[]): ILabel[] {
    const index = labels.findIndex((label) => label.id === labelId)
    let labelPinToTop = labels.splice(index, 1)[0]
    labelPinToTop.isTop = true
    labels.unshift(labelPinToTop)
    return labels
  }

  public unpin(labelId: number, labels: ILabel[] | []): ILabel[] {
    const index = labels.findIndex((label) => label.id === labelId)
    labels[index].isTop = false
    return LabelService.sortByFavorite(labels)
  }

  private static sortByFavorite(labels: ILabel[]): ILabel[] {
    return labels.sort((labelA, labelB) =>
      labelA.isTop === labelB.isTop ? 0 : labelA.isTop ? -1 : 1
    )
  }
}
