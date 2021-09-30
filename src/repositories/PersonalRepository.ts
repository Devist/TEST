import { ICustomData } from '@src/entities/custom'
import BaseRepository from '@src/repositories/BaseRepository'
import { APIClient } from '@src/repositories/network/APIClient'
import { PersonalAPI } from './network/apis/PersonalApi'

// import { IUser } from '@src/entities'

export default class PersonalRepository implements BaseRepository {
  async fetch(): Promise<ICustomData> {
    return await APIClient.shared.request(new PersonalAPI.FetchCustoms())
  }

  async addFavorite(labelId: number): Promise<{ id: number }> {
    return await APIClient.shared.request(new PersonalAPI.UpdateFavorite(labelId))
  }

  async deleteFavorite(favoriteId: number): Promise<{ id: number }> {
    return await APIClient.shared.request(new PersonalAPI.DeleteFavorite(favoriteId))
  }
}
