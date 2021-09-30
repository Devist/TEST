/** ****************************************************************************
 * 해시태그 관련 데이터 정의
 **************************************************************************** */

export interface IHashtagData {
  id: number
  hashtag: string
  background_color?: null | string
  font_color?: null | string
}

/** ****************************************************************************
 * 해시태그 관련 엔티티 정의
 **************************************************************************** */

export interface IHashtag {
  id: number
  hashtag: string
  backgroundColor?: null | string
  fontColor?: null | string
}
