import { IUserServiceMock } from './user.types'

export const mockUsersService = (): IUserServiceMock => ({
  fetch: jest.fn()
  // getName: jest.fn(),
  // getEmail: jest.fn(),
  // getAuthority: jest.fn(),
  // getGames: jest.fn(),
  // getGame: jest.fn()
})
