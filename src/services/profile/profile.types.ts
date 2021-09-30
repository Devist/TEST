import { IProfile, Profile } from '@src/entities'

export interface IProfileService {
  fetchProfiles(type: string, id: string, gameCode: string): Promise<Profile[]>
  fetchOrders(): Promise<IProfile[]> | null
  filter(searchValue: string, profiles: Profile[]): Profile[]
}

export interface IProfileServiceMock {
  fetchProfiles: jest.Mock<Promise<Profile[]>>
  fetchOrders: jest.Mock<Promise<IProfile[]>>
}
