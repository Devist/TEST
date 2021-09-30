/** ****************************************************************************
 * FAQ 관련 엔티티 정의
 **************************************************************************** */

export interface IFaqs {
  segment: IFaq
  label: IFaq
}

export interface IFaq {
  title: string
  qAndA: IQna[]
}

export interface IQna {
  question: string
  ans: string
}
