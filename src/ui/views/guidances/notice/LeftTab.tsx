import React, { memo } from 'react'
import { Bell } from 'react-feather'
import { NavItem, NavLink } from 'reactstrap'

type Props = {
  categories: string[]
  activeTab: string
  toggleTab: (element: string) => void
}

/** ************************************************************************
 * name : 공지사항 필터 컴포넌트
 * description :
 * 공지사항 필터 컴포넌트입니다.
 * 현재, 공지사항 타입에 따라 [전체,공지, 배포] 필터를 선택할 수 있습니다.
 *************************************************************************** */
function LeftTab({ categories, activeTab, toggleTab }: Props) {
  return (
    <>
      {categories.map((element: string) => (
        <NavItem key={element} tag="li">
          <NavLink active={activeTab === element} onClick={() => toggleTab(element)}>
            <Bell size={18} className="mr-1" />
            <span className="font-weight-bold">
              {element.replace('notice', '공지').replace('release', '배포')}
            </span>
          </NavLink>
        </NavItem>
      ))}
    </>
  )
}
export default memo(LeftTab)
