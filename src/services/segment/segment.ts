import { ISegmentService } from '@src/services/segment/segment.types'
import SegmentRepository from '@src/repositories/SegmentRepository'
import { ISegment, ISegmentData } from '@src/entities/segment/segment.types'
import { Segment } from '@src/entities/segment'
import { ID_TYPE, IUser } from '@src/entities'
import { ISegmentList } from '@src/@types/List'

export class SegmentService implements ISegmentService {
  constructor(private readonly segmentRepository: SegmentRepository) {}

  fetchAll(): Promise<ISegment[]> {
    return this.segmentRepository
      .fetchAll()
      .then((response: ISegmentList<ISegmentData>) => {
        return response.definitions.map((item) => new Segment(item))
      })
  }

  fetch(params: any, user: IUser | null): Promise<ISegment> {
    return this.segmentRepository.fetch(params).then((response: ISegmentData) => {
      return new Segment(response, user)
    })
  }

  createOrUpdate(payload: ISegment): Promise<any> {
    return this.segmentRepository.createOrUpdate(payload)
  }

  delete(payload: { id: number }): Promise<{ id: number }> {
    return this.segmentRepository.delete(payload)
  }

  filter(
    segments: ISegment[],
    filters: {
      mine: boolean
      idType: ID_TYPE
      gameCode: string
      keyword: string
      mail: string
    }
  ): ISegment[] {
    return segments.filter((item) => {
      let res = true
      if (filters.gameCode !== 'all') {
        res =
          res &&
          (item.targetGames.includes(filters.gameCode) ||
            item.targetGames[0] === 'all_games')
      }
      if (filters.idType !== 'all') {
        res = res && item.queryConfig.meta.idType === filters.idType
      }
      if (filters.mine) {
        res = res && item.mail === filters.mail
      }
      if (filters.keyword !== '') {
        res =
          res &&
          (item.name.includes(filters.keyword) ||
            item.description.includes(filters.keyword) ||
            item.managerName.includes(filters.keyword))
      }
      return res
    })
  }
}
