// ** Styles
import '@styles/react/apps/app-users.scss'
import '@styles/base/pages/page-faq.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import React, { useState, useEffect } from 'react'

import { Card, CardHeader, CardBody, TabContent, TabPane, Row, Col } from 'reactstrap'

// ** other components
import { LabelService } from '@src/services'
import LabelRepository from '@src/repositories/LabelRepository'
import { useStores } from '@src/stores'
import { ILabel } from '@src/entities'
import MemoRepository from '@src/repositories/MemoRepository'
import Breadcrumbs from '@core-components/breadcrumbs'
import ContentInfo from '@ui/views/labels/detail/ContentInfo'
import Header from '@ui/views/labels/detail/Header'
import Tabs from '@ui/views/labels/detail/Tabs'

import ContentData from '@ui/views/labels/detail/ContentData'
import Skeleton from 'react-loading-skeleton'

/** ************************************************************************
 * name :
 * description :

 * todo 작성 필요
 *************************************************************************** */
function labelDetail(history: any) {
  const [labelData, setLabelData] = useState<ILabel>()
  const [activeTab, setActiveTab] = useState<string>('1')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { userStore } = useStores()
  const labelService = new LabelService(new LabelRepository(), new MemoRepository())

  useEffect(() => {
    setIsLoading(true)
    userStore.fetch().then(() => {
      labelService
        .fetch({ id: parseInt(history.match.params.id) }, userStore.custom)
        .then((response) => {
          setLabelData(response)
          setIsLoading(false)
        })
    })
  }, [])

  const eventHandler = {
    toggleTab: (tab: string): void => {
      if (activeTab !== tab) setActiveTab(tab)
    }
  }

  const renderSkeleton = {
    header: () => (
      <div className="d-flex flex-column">
        <Skeleton width={250} height={28} />
        <Skeleton width={150} height={13} className="mt-little" />
      </div>
    ),
    contentInfo: () => (
      <>
        <Row>
          <Col xl="4" md="12" xs="12">
            <Skeleton width={60} height={18} />
            <Skeleton height={110} />
          </Col>
          <Col xl="4" md="12" xs="12" className="mt-2 mt-xl-0">
            <Skeleton width={50} height={18} />
            <Skeleton height={110} />
          </Col>
          <Col xl="4" md="12" xs="12" className="mt-2 mt-xl-0">
            <Skeleton width={55} height={18} />
            <Skeleton height={110} />
          </Col>
        </Row>
      </>
    )
  }

  return (
    <>
      {/* 빵 부스러기 */}
      <Breadcrumbs
        breadCrumbTitle="BACK"
        breadCrumbParent="레이블 리스트"
        breadCrumbParentLink="/labels"
        breadCrumbActive={`ID : ${history.match.params.id}`}
      />

      <Card>
        <CardHeader>
          {!labelData || isLoading ? (
            renderSkeleton.header()
          ) : (
            <Header item={labelData} />
          )}
        </CardHeader>
        <CardBody>
          <Tabs activeTab={activeTab} onTabClicked={eventHandler.toggleTab} />
          <TabContent activeTab={activeTab} className="mt-3">
            <TabPane tabId="1" className="px-2">
              {!labelData || isLoading ? (
                renderSkeleton.contentInfo()
              ) : (
                <ContentInfo item={labelData} />
              )}
            </TabPane>
            {activeTab === '2' ? (
              <TabPane tabId="2" className="px-2">
                <ContentData />
              </TabPane>
            ) : null}
            {/* <TabPane tabId="3"><ContentGuide/></TabPane> */}
          </TabContent>
        </CardBody>
      </Card>
    </>
  )
}

export default labelDetail
