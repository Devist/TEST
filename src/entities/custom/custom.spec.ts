import { Custom } from './custom'
import { mockCustomData } from './custom.mock'

describe('>>> Custom Entity', () => {
  describe('>> validate', () => {
    it('게임코드/게임상태/게임제목의 갯수가 맞지 않으면 games 배열이 비어 있어야 합니다.', () => {
      const entity = new Custom(mockCustomData()[0])
      expect(entity.favoriteLabels.length).toBe(1)
    })
  })
})
