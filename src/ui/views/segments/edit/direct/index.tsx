import Sidebar from '@ui/views/segments/edit/direct/sidebar'
import React from 'react'
import ConfigArea from '@ui/views/segments/edit/direct/ConfigArea'

/** ************************************************************************
 * name : 세그먼트 [직접] 생성/수정 컴포넌트
 * description :
 * 세그먼트 생성,수정 페이지가 [템플릿을 통한] 상태가 아닌 [직접 생성] 상태일 때의
 * 전반적인 화면 정보(컨테이너 컴포넌트) 입니다.
 *
 *************************************************************************** */
function Direct() {
  return (
    <div className="segment-edit">
      <div className="d-flex">
        {/* 레이블 선택 사이드 바 영역*/}
        <div className="sg-sidebar">
          <Sidebar />
        </div>

        {/* 레이블 구성 영역 */}
        <div className="sg-labels-area">
          <h5 className="font-weight-bolder mb-1">세그먼트 구성</h5>
          <ConfigArea />
        </div>
      </div>

      {/* 하단 가이드 */}
      <div
        id="explanation-of-set-segment"
        className="border-top-dark p-little bg-light font-small-3 font-weight-bolder">
        왼쪽의 목록 중 하나를 선택하여, 오른쪽 세그먼트 구성 영역으로 드래그 & 드랍하여
        추가할 수 있습니다.
      </div>
    </div>
  )
}

export default Direct
