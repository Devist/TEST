import { ICustom, ICustomData } from './custom.types'
import { Custom } from './custom'

export const mockCustomData = (): ICustomData[] => [
  {
    favorite_labels: [
      {
        id: 10,
        label_id: 103
      }
    ],
    label_memos: [
      {
        id: 10,
        memo: '메모입니다',
        label_id: 103
      }
    ],
    hashtag_colors: [
      {
        id: 10,
        hashtag_id: 50,
        background_color: '#ffee00',
        font_color: '#ffee00'
      }
    ]
  }
]

export const mockCustom = (data: ICustomData[] = mockCustomData()): ICustom[] =>
  data.map((item) => new Custom(item))
