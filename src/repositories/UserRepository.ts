import BaseRepository from '@src/repositories/BaseRepository'
import { APIClient } from '@src/repositories/network/APIClient'
import { UserAPI } from '@src/repositories/network/apis/UserAPI'

// import { IUser } from '@src/entities'

export default class UserRepository implements BaseRepository {
  async fetch(): Promise<string> {
    return await APIClient.shared.request(new UserAPI.Fetch())
  }
}
