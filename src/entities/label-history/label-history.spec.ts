import { LabelHistory } from '@src/entities/label-history/label-history'
import { mockLabelHistoryData } from '@src/entities/label-history/label-history.mock'

describe('>>> Label History Entity', () => {
  describe('>> 객체 생성 검사', () => {
    it('밀리세컨드 숫자가, 날짜 형식으로 변경된다.', () => {
      const entity = new LabelHistory(mockLabelHistoryData()[0])

      expect(entity.updateTime).toEqual('1/1/1970, 9:00:00 AM')
    })
  })
})
