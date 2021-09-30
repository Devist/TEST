/** ****************************************************************************
 * 커스텀 관련 데이터 정의
 **************************************************************************** */

export interface IFavoriteLabelData {
  id: number
  label_id: number
}

export interface IHashtagColorData {
  id: number
  hashtag_id: number
  background_color: string
  font_color: string
}

export interface ILabelMemoData {
  id: number
  memo: string
  label_id: number
}

export interface ICustomData {
  favorite_labels: IFavoriteLabelData[]
  hashtag_colors: IHashtagColorData[]
  label_memos: ILabelMemoData[]
}

/** ****************************************************************************
 * 커스텀 관련 엔티티 정의
 **************************************************************************** */

export interface IFavoriteLabel {
  id: number
  labelId: number
}

export interface IHashtagColor {
  id: number
  hashtagId: number
  backgroundColor: string
  fontColor: string
}

export interface ILabelMemo {
  id?: number
  memo: string
  labelId: number
  email?: string
}

export interface ICustom {
  favoriteLabels: IFavoriteLabel[] | []
  hashtagColors: IHashtagColor[] | []
  labelMemos: ILabelMemo[] | []
}
