import { ILabelServiceMock } from './label.types'
import { ILabel } from '@src/entities'

export const mockLabelService = (): ILabelServiceMock => ({
  fetchAll: jest.fn(),
  fetchRecent: jest.fn()
  // getName: jest.fn(),
  // getEmail: jest.fn(),
  // getAuthority: jest.fn(),
  // getGames: jest.fn(),
  // getGame: jest.fn()
})
