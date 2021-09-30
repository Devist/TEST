import React, { useState } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { Clock, Database, Gift, GitPullRequest, Info } from 'react-feather'

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
            <Info size={16} />
            <span className="align-middle d-none d-sm-block">정보</span>
          </NavLink>
        </NavItem>
        {/* 데이터 탭 */}
        <NavItem>
          <NavLink active={activeTab === '2'} onClick={() => events.toggle('2')}>
            <GitPullRequest size={16} />
            <span className="align-middle d-none d-sm-block">레이블(조건)</span>
          </NavLink>
        </NavItem>
        {/* 스케줄 탭 */}
        <NavItem>
          <NavLink active={activeTab === '3'} onClick={() => events.toggle('3')}>
            <Clock size={16} />
            <span className="align-middle d-none d-sm-block">스케줄</span>
          </NavLink>
        </NavItem>
      </Nav>
    </>
  )
}

export default Tabs
