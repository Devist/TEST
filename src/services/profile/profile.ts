/* eslint-disable @typescript-eslint/ban-ts-comment */

import { IProfileService } from '@src/services/profile/profile.types'
import ProfileRepository from '@src/repositories/ProfileRepository'
import {
  IProfile,
  IProfileData,
  IProfileSummary,
  IProfileSummaryData,
  Profile
} from '@src/entities'
import { IProfileList } from '@src/@types/List'

export class ProfileService implements IProfileService {
  profiles: IProfileList
  orders: IProfileData[]
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly mockProfiles?: IProfileList,
    private readonly mockOrders?: IProfileData[]
  ) {
    mockProfiles ? (this.profiles = mockProfiles) : null
    mockOrders ? (this.orders = mockOrders) : null
  }

  public fetchProfiles(
    type: string,
    id: string,
    gameCode: string
  ): Promise<Profile[] | []> {
    // 사용할 API
    const fetchSummary = this.profiles
      ? new Promise<IProfileList>((resolve) => {
          setTimeout(() => {
            resolve(this.profiles)
          }, 1000)
        })
      : this.profileRepository.fetchProfiles(type, id, gameCode)

    const fetchOrders = this.orders
      ? new Promise<IProfileData[]>((resolve) => {
          resolve(this.orders)
        })
      : this.profileRepository.fetchOrders()

    return Promise.all([fetchSummary, fetchOrders]).then(
      ([searchedInformation, orders]) => {
        this.profiles = searchedInformation
        this.orders = orders
        // 조회된 배열 없을 경우 빈 배열 리턴
        if (!searchedInformation.result.length) return []

        return this.getUsedProfileArray(this.extractProfile(searchedInformation), orders)
      }
    )
  }

  public getProfiles(filter: IProfileData[] = []): IProfileList {
    return this.profiles
  }

  public fetchOrders(): Promise<IProfile[]> | null {
    return null
  }

  public filter(searchValue: string, profiles: Profile[]) {
    return profiles.filter((profile: Profile) => {
      if (profile.description.includes(searchValue)) return profile
      if (profile.name.includes(searchValue)) return profile
      if (profile.value.toString().includes(searchValue)) return profile
    })
  }

  private extractProfile = (searchedProfiles: IProfileList) =>
    searchedProfiles.result[0].profiles

  private getUsedProfileArray(
    searchedAndUsedProfiles: { [x: string]: IProfileSummaryData },
    orders: IProfileData[]
  ): Profile[] {
    return Object.keys(searchedAndUsedProfiles).reduce((acc, key) => {
      const summary: IProfileSummary = searchedAndUsedProfiles[key]

      if (this.isValidExpire(summary.expire)) {
        const profileData = this.findProfileData(key, orders)

        profileData
          ? acc.push(new Profile(profileData, summary.expire, summary.value))
          : null
      }
      return acc
    }, [] as Profile[])
  }

  private findProfileData(key: string, orders: IProfileData[]): IProfileData | null {
    const profileData = orders.find((element) => element.name === key)
    return profileData ? profileData : null
  }

  private isValidExpire = (expire: number): boolean => expire > -1
}
