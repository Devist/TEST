import PersonalRepository from '@src/repositories/PersonalRepository'
import UserRepository from '@src/repositories/UserRepository'
import { mockUser, UserRoleType } from '../../entities'
import { expect_or } from '../../utils/forJest'
import { UserService } from './user'

describe('>>> User Service', () => {
  // const userRepository = new UserRepository()
  // const personalRepository = new PersonalRepository()
  // const service = new UsersService(userRepository, personalRepository)
  // describe('>> getEmail', () => {
  //   it('이메일 형태의 정보를 반환한다.', () => {
  //     expect(service.getEmail()).toContain('@netmarble.com')
  //   })
  // })
  // describe('>> getAuthority', () => {
  //   it('적절한 role을 반환한다.', () => {
  //     expect_or(
  //       () => expect(service.getAuthority()).toBe(UserRoleType.ADMIN),
  //       () => expect(service.getAuthority()).toBe(UserRoleType.USER)
  //     )
  //   })
  // })
})
