import { GAME_STATUS_TYPE, IGame } from '../game'
import { IUser, IUserData, UserRoleType } from './user.types'

import aesjs from 'aes-js'
import { ICustom } from '../custom'

export class User implements IUser {
  name!: string
  role!: UserRoleType
  email!: string
  department!: string
  phoneNumber!: string
  games!: IGame[] | []
  custom!: ICustom

  constructor(data: string | IUserData, custom: ICustom) {
    typeof data === 'string'
      ? this.setInformation(User.getDecryptedInfo(data))
      : this.setInformation(data)

    this.custom = custom
  }

  private setInformation(userData: IUserData): void {
    this.name = userData.name
    this.role = userData.role
    this.email = userData.email
    this.department = `${userData.company} ${userData.department}`
    this.phoneNumber = userData.primary_phone

    const gameCodes =
      userData.games === '[]' ? [] : User.convertFromStringToArray(userData.games)

    const gameNames =
      userData.game_names === '[]'
        ? []
        : User.convertFromStringToArray(userData.game_names)

    const gameStatus: GAME_STATUS_TYPE[] =
      userData.game_status === '[]'
        ? []
        : this.convertFromStringToGameStatus(userData.game_status)

    const games = []
    if (User.isValidateGameList(gameCodes, gameNames, gameStatus))
      for (const index in gameCodes) {
        games.push({
          code: gameCodes[index],
          status: gameStatus[index],
          name: gameNames[index]
        })
      }

    this.games = games
  }

  private static getDecryptedInfo(data: string): IUserData {
    const decryption = {
      key: process.env.REACT_APP_AES_KEY ? process.env.REACT_APP_AES_KEY : '',
      iv: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
    }

    const encryptedBytes = aesjs.utils.hex.toBytes(data)
    const aesCbc = new aesjs.ModeOfOperation.cbc(
      aesjs.utils.utf8.toBytes(decryption.key),
      decryption.iv
    )
    const decryptedBytes = aesCbc.decrypt(encryptedBytes)
    const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes).trim()
    return JSON.parse(
      decryptedText
        .substring(0, decryptedText.indexOf('}') + 1)
        .replace(/=/g, ':')
        .replace(/'/g, '"')
        .replace(/([a-zA-Z0-9-_]+):/g, '"$1":')
    )
  }

  private convertFromStringToGameStatus(arrayString: string): GAME_STATUS_TYPE[] {
    return arrayString
      .replace('[', '')
      .replace(']', '')
      .split(', ')
      .map((x) => (x === 'open' ? GAME_STATUS_TYPE.OPEN : GAME_STATUS_TYPE.CLOSE))
  }

  private static convertFromStringToArray(arrayString: string) {
    return arrayString.replace('[', '').replace(']', '').split(', ')
  }

  private static isValidateGameList(
    gameNames: string[],
    gameCodes: string[],
    gameStatus: string[]
  ) {
    return gameCodes.length === gameNames.length && gameCodes.length === gameStatus.length
  }

  validate(): boolean {
    throw new Error('Method not implemented.')
  }
}
