import { User } from './user'
import { mockUserData } from './user.mock'
import { mockCustom } from '../custom'

describe('>>> User Entity', () => {
  describe('>> validate', () => {
    it('게임코드/게임상태/게임제목의 갯수가 맞지 않으면 games 배열이 비어 있어야 합니다.', () => {
      const entity = new User(mockUserData()[1], mockCustom()[0])
      expect(entity.games.length).toBe(0)
    })
  })
})
