import React, { useEffect, useReducer, useState } from 'react'

// 컴포넌트
import { Nav, Row, Col, TabContent, TabPane } from 'reactstrap'

// 커스텀 컴포넌트
import Paging from '@src/ui/components/organisms/Paging'
import NoticeCollapse from '@ui/components/molecules/app-collapse/notice'

import Delete from './Delete'
import LeftTab from './LeftTab'
import TopBar from './TopBar'
import CreateOrUpdate from './CreateOrUpdate'

// ** 스타일
import illustration from '@ui/assets/images/illustration/email.svg'
import '@styles/react/apps/app-users.scss'
import '@styles/base/pages/page-faq.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/base/pages/page-faq.scss'

// 비즈니스
import { INotice, mockNotices, NOTICE_CATEGORY_TYPE } from '@src/entities'
import { useStores } from '@src/stores'

type innerData = {
  category: NOTICE_CATEGORY_TYPE | '전체'
  notices: INotice[]
}

/** ************************************************************************
 * name : 공지사항 페이지 컴포넌트
 * description :
 * 공지사항 페이지에 진입했을 때 보여집니다.
 * - 공통 : 공지사항 리스트 확인
 * - 공통 : 특정 공지사항 상세 확인
 * - 관리자 : 추가,수정,삭제
 * 의 기능을 수행합니다.
 *************************************************************************** */
function Notice({ test = false }) {
  const initialState: innerData[] = [
    {
      category: '전체',
      notices: []
    },
    {
      category: NOTICE_CATEGORY_TYPE.NOTICE,
      notices: []
    },
    {
      category: NOTICE_CATEGORY_TYPE.RELEASE,
      notices: []
    }
  ]

  const [data, setData] = useState<INotice[]>([])
  const [dataToRender] = useState<innerData[]>(initialState)
  const [activeTab, setActiveTab] = useState<string>('전체')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const { noticeStore } = useStores()
  const [ignored, forceUpdate] = useReducer((x) => !x, true)

  const handlers = {
    /**
     * 검색어 입력 시에 searchTerm 에 해당 입력어 저장
     */
    handleNoticeFilter: (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
    },

    /**
     * 최초 진입 혹은 공지사항 CUD 시에 공지사항 리스트 갱신
     */
    refresh: () => {
      test
        ? setData(mockNotices())
        : noticeStore.fetch().then(() => {
            setData(noticeStore.getNotices)
          })
    }
  }

  const events = {
    toggleTab: (tab: string) => setActiveTab(tab)
  }

  useEffect(() => {
    handlers.refresh()
  }, [])
  useEffect(() => {
    dataToRender[0].notices = []
    dataToRender[1].notices = []
    dataToRender[2].notices = []
    Object.entries(data).forEach(([key, val]) => {
      dataToRender[0].notices.push(val)
      const idx = dataToRender.findIndex(
        (entry: innerData) => entry.category === val.category
      )
      dataToRender[idx].notices.push(val)
    })
    forceUpdate()
  }, [data])

  const renderTabContent = () => {
    return dataToRender.map((item: innerData) => {
      return (
        <TabPane key={item.category} tabId={item.category}>
          {/* 공지사항 상단 바 */}
          <TopBar
            item={item}
            searchTerm={searchTerm}
            handleNoticeFilter={handlers.handleNoticeFilter}
            refresh={handlers.refresh}
          />
          {/* 공지사항 리스트 */}
          {Paging(
            item.notices.filter(
              (notice: INotice) =>
                notice.content.includes(searchTerm) || notice.title.includes(searchTerm)
            ),
            <NoticeCollapse
              data={[]}
              className="mt-2"
              type="margin"
              titleKey="title"
              contentKey="content"
              accordion
              slotTitleDate="modifiedDatetime"
              slotContentUpdate={
                <CreateOrUpdate type="update" refresh={handlers.refresh} />
              }
              slotContentDelete={<Delete refresh={handlers.refresh} />}
            />,
            10
          )}
        </TabPane>
      )
    })
  }

  return (
    <div id="faq-tabs">
      <Row>
        {/* 공지사항 좌측 필터 */}
        <Col lg="3" md="4" sm="12">
          <div className="faq-navigation d-flex justify-content-between flex-column mb-2 mb-md-0">
            <Nav tag="ul" className="nav-left" pills vertical>
              <LeftTab
                categories={dataToRender.map((element) => element.category)}
                activeTab={activeTab}
                toggleTab={events.toggleTab}
              />
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
        {/* 공지사항 우측 페이지 */}
        <Col lg="9" md="8" sm="12">
          <TabContent activeTab={activeTab}>{renderTabContent()}</TabContent>
        </Col>
      </Row>
    </div>
  )
}

export default Notice
