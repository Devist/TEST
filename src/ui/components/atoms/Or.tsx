import classnames from 'classnames'

type Props = {
  type: string
  className?: string
}

/** ************************************************************************
 * name : Or 조건 컴포넌트 페이지
 * description : 세그먼트를 구성하는 레이블 간의 Or 조건의 설정을 나타내주는 컴포넌트입니다.
 * type 에 따라 [기본형 | 아이콘형] 이 있습니다.
 * todo type 에 따라 다른 디스플레이 보여주도록 함
 *************************************************************************** */
function Or({ className }: Props) {
  return (
    <div
      className={classnames(
        'divider divider-dashed ml-1 border-0 w-50 or-divider',
        className
      )}>
      <div className="divider-text text-body-heading font-weight-bold">또는</div>
    </div>
  )
}
export default Or
