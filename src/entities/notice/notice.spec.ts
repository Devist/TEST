import { Notice } from './notice'
import { mockNoticeData } from './notice.mock'

describe('>>> Notice Entity', () => {
  describe('>> validate', () => {
    it('title이 비어있으면 유효성 검사가 실패해야 합니다.', () => {
      const entity = new Notice({
        ...mockNoticeData()[0],
        title: ''
      })

      expect(entity.validate()).toBeFalsy()
    })

    it('title이 너무 짧으면 유효성 검사가 실패해야 합니다.', () => {
      const entity = new Notice({
        ...mockNoticeData()[0],
        title: 'abcd'
      })
      console.log(entity)

      expect(entity.validate()).toBeFalsy()
    })

    it('title이 너무 길면 유효성 검사가 실패해야 합니다.', () => {
      const entity = new Notice({
        ...mockNoticeData()[0],
        title:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      })

      expect(entity.validate()).toBeFalsy()
    })
  })
})
