import { Button } from 'reactstrap'

/** ************************************************************************
 * name : 세그먼트 생성/수정 페이지 - [취소, 예상치, 생성] 버튼 모음
 * description :
 * - Floating 버튼 모음으로,
 * - 전체 조작에 대한 기능 수행 버튼들이 포함되어 있습니다.
 *************************************************************************** */
function FloatingButtons() {
  return (
    <div className="d-flex justify-content-center fixed-bottom mb-2">
      <Button className="mx-1" color="danger">
        취소하기
      </Button>
      <Button className="mx-1" color="info">
        예상결과 확인
      </Button>
      <Button className="mx-1" color="primary">
        세그먼트 생성
      </Button>
    </div>
  )
}

export default FloatingButtons
