import { Label } from './label'
import { mockLabelData } from './label.mock'
import { mockCustomData } from '@src/entities'
import { Custom } from '@src/entities'

describe('>>> Label Entity', () => {
  describe('>> validate', () => {
    it('label 생성 검사', () => {
      const entity = new Label(
        mockLabelData()[0],
        new Custom(mockCustomData()[0])
      )

      expect(entity.id).toEqual(mockLabelData()[0].id)
      expect(entity.name).toEqual(mockLabelData()[0].name)
      expect(entity.simpleDescription).toEqual(
        mockLabelData()[0].simple_description
      )
      expect(entity.description).toEqual(mockLabelData()[0].description)
      expect(entity.dataType).toEqual(mockLabelData()[0].data_type)
      expect(entity.keyDescription).toEqual(mockLabelData()[0].key_description)
      expect(entity.departmentName).toEqual(mockLabelData()[0].department_name)
      expect(entity.managerName).toEqual(mockLabelData()[0].manager_name)
      expect(entity.shareTargets).toEqual(mockLabelData()[0].share_targets)
      expect(entity.dataRangeType).toEqual(mockLabelData()[0].data_range_type)
      expect(entity.dataRangeExtra).toEqual(mockLabelData()[0].data_range_extra)
      expect(entity.aggregateBase1).toEqual(mockLabelData()[0].aggregate_base1)
      expect(entity.aggregateBase2).toEqual(mockLabelData()[0].aggregate_base2)
      expect(entity.aggregateRange).toEqual(mockLabelData()[0].aggregate_range)
      expect(entity.memo).toEqual(
        mockCustomData()[0].label_memos.find((v) => v.label_id === entity.id)
          ?.memo
      )
      expect(entity.isTop).toEqual(
        mockCustomData()[0].favorite_labels.findIndex(
          (v) => v.label_id === entity.id
        ) > -1
      )
      // expect(entity.hashtags).toEqual(mockLabelData()[0].id)
    })
  })

  describe('>> 객체 생성 검사', () => {
    it("is_enabled 가 'y'인 경우, isEnabled 는 true", () => {
      const entity = new Label(
        mockLabelData()[1],
        new Custom(mockCustomData()[1])
      )

      expect(entity.isEnabled).toEqual(true)
    })
  })
})
