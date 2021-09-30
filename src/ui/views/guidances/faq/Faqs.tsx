import React, { useState } from 'react'

// ** 컴포넌트
import { Nav, NavItem, NavLink, Row, Col, TabContent, TabPane } from 'reactstrap'
import { HelpCircle } from 'react-feather'

// ** 커스텀 컴포넌트
import FaqCollapse from '@ui/components/molecules/app-collapse/faq'

// ** 스타일
import illustration from '@src/ui/assets/images/illustration/faq-illustrations.svg'

// ** 비즈니스
import { FaqData } from '@src/entities/faq/faq.mock'
import { IFaq } from '@src/entities/faq'

/** ************************************************************************
 * name : FAQ 리스트 컴포넌트
 * description : FAQ 리스트를 보여줍니다.
 * todo : index 와 통합되어야 함
 *************************************************************************** */
function Faqs() {
  const dataToRender: IFaq[] = [
    {
      title: '전체',
      qAndA: []
    }
  ]

  const [activeTab, setActiveTab] = useState('전체')

  const toggleTab = (tab: string) => setActiveTab(tab)
  Object.entries(FaqData).forEach(([key, val]) => {
    dataToRender[0].qAndA.push(...val.qAndA)
    dataToRender.push(val)
  })

  const renderTabs = () => {
    return dataToRender.map((item) => {
      return (
        <NavItem key={item.title} tag="li">
          <NavLink
            active={activeTab === item.title}
            onClick={() => toggleTab(item.title)}>
            <HelpCircle size={18} className="mr-1" />
            <span className="font-weight-bold">{item.title}</span>
          </NavLink>
        </NavItem>
      )
    })
  }

  const renderTabContent = () => {
    return dataToRender.map((item) => {
      return (
        <TabPane key={item.title} tabId={item.title}>
          <div className="d-flex align-items-center">
            <div className="avatar avatar-tag bg-light-primary mr-1">
              <HelpCircle size={20} />
            </div>
            <div>
              <h4 className="mb-0">{item.title}</h4>
            </div>
          </div>
          <FaqCollapse
            className="mt-2"
            type="margin"
            data={item.qAndA}
            titleKey="question"
            contentKey="ans"
            accordion
          />
        </TabPane>
      )
    })
  }

  return (
    <div id="faq-tabs">
      <Row>
        <Col lg="3" md="4" sm="12">
          <div className="faq-navigation d-flex justify-content-between flex-column mb-2 mb-md-0">
            <Nav tag="ul" className="nav-left" pills vertical>
              {renderTabs()}
            </Nav>
            <img
              className="img-fluid d-none d-md-block"
              src={illustration}
              alt="illustration"
              style={{
                transform: 'scaleX(1)'
              }}
            />
          </div>
        </Col>
        <Col lg="9" md="8" sm="12">
          <TabContent activeTab={activeTab}>{renderTabContent()}</TabContent>
        </Col>
      </Row>
    </div>
  )
}

export default Faqs
