import React from 'react'

// ** 컴포넌트
import { Menu } from 'react-feather'
import { Row, Col } from 'reactstrap'

type Props = {
  resultNumber: number
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

/** ************************************************************************
 * name : 레이블 리스트 조회 페이지 - 헤더 컴포넌트
 * description :
 * 브라우저 사이즈에 따라 반응형으로,
 * - 모바일 사이즈에서 사이드 필터를 토글하는 버튼
 * - PC 사이즈에서 총 레이블 개수를 보여주는 텍스트
 * 를 표출합니다.
 *************************************************************************** */
function Header({ resultNumber, setSidebarOpen }: Props) {
  return (
    <div className="ecommerce-header">
      <Row>
        <Col sm="12">
          <div className="ecommerce-header-items">
            <div className="result-toggler">
              <button
                className="navbar-toggler shop-sidebar-toggler"
                onClick={() => setSidebarOpen(true)}>
                <span className="navbar-toggler-icon d-block d-lg-none">
                  <Menu size={14} />
                </span>
              </button>
              <span className="search-results">{resultNumber} 개의 레이블</span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Header
