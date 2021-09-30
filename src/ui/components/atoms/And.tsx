import classnames from 'classnames'

type Props = {
  type: string
  className?: string
}

/** ************************************************************************
 * name : And 조건 컴포넌트 페이지
 * description : 세그먼트를 구성하는 레이블 간의 And 조건의 설정을 나타내주는 컴포넌트입니다.
 * type 에 따라 [기본형 | 아이콘형] 이 있습니다.
 * todo type 에 따라 다른 디스플레이 보여주도록 함
 *************************************************************************** */
function And({ className }: Props) {
  return (
    <div className={classnames('text-body-heading font-weight-bold ml-1', className)}>
      그리고
    </div>
  )
}
export default And
