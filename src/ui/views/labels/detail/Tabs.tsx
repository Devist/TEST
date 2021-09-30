import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { Database, Info } from 'react-feather'

type Props = {
  activeTab: string
  onTabClicked: (tab: string) => void
}

/** ************************************************************************
 * name :
 * description :

 * todo 작성 필요
 *************************************************************************** */
function Tabs({ activeTab, onTabClicked }: Props) {
  const events = {
    toggle: (tab: string) => {
      onTabClicked(tab)
    }
  }
  return (
    <>
      <Nav pills>
        {/* 정보 탭 */}
        <NavItem>
          <NavLink active={activeTab === '1'} onClick={() => events.toggle('1')}>
            <Info size={14} />
            <span className="align-middle d-none d-sm-block">정보</span>
          </NavLink>
        </NavItem>

        {/* 데이터 탭 */}
        <NavItem>
          <NavLink active={activeTab === '2'} onClick={() => events.toggle('2')}>
            <Database size={14} />
            <span className="align-middle d-none d-sm-block">데이터</span>
          </NavLink>
        </NavItem>

        {/* 가이드 탭 */}
        {/* <NavItem> */}
        {/*  <NavLink active={activeTab === '3'} onClick={() => events.toggle('3')}> */}
        {/*    <Gift size={14} /> */}
        {/*    <span className="align-middle d-none d-sm-block">가이드(예정)</span> */}
        {/*  </NavLink> */}
        {/* </NavItem> */}
      </Nav>
    </>
  )
}

export default Tabs
