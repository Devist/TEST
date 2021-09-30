import Breadcrumbs from '@core-components/breadcrumbs'
import React, { useEffect, useState } from 'react'

import { Card, CardHeader, CardBody, TabContent, TabPane, Row, Col } from 'reactstrap'

import { useParams } from 'react-router-dom'
import Tabs from '@ui/views/segments/detail/Tabs'
import ContentInfo from '@ui/views/segments/detail/ContentInfo'
import ContentData from '@ui/views/labels/detail/ContentData'
import { ISegment, Segment } from '@src/entities/segment'
import { useStores } from '@src/stores'
import { SegmentService } from '@src/services'
import SegmentRepository from '@src/repositories/SegmentRepository'
import Skeleton from 'react-loading-skeleton'

/** ************************************************************************
 * name : 세그먼트 상세 페이지
 * description :

 * todo 작성 필요
 *************************************************************************** */
const SegmentDetail: React.FC = (history: any) => {
  const [segmentData, setSegmentData] = useState<ISegment>()
  const [activeTab, setActiveTab] = useState<string>('1')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { id } = useParams<{ id: string }>()
  const { userStore } = useStores()
  const segmentService = new SegmentService(new SegmentRepository())

  const eventHandler = {
    toggleTab: (tab: string): void => {
      if (activeTab !== tab) setActiveTab(tab)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    userStore.fetch().then(() => {
      // segmentService
      //   .fetch({ id: parseInt(history.match.params.id) }, userStore.getUser())
      //   .then((response) => {
      //     console.info(response)
      //     setSegmentData(response)
      //     setIsLoading(false)
      //   })
      // setSegmentData(new Segment(mockSegmentData()[0], userStore.getUser()))
      setIsLoading(false)
    })
  }, [])

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
      <Breadcrumbs
        breadCrumbTitle="BACK"
        breadCrumbParent="세그먼트 리스트"
        breadCrumbParentLink="/segments"
        breadCrumbActive={`ID : ${id}`}
      />

      <Card>
        <CardHeader>
          <div className="d-flex full-width">
            <h3>{segmentData?.name}</h3>
          </div>
        </CardHeader>
        <CardBody>
          <Tabs activeTab={activeTab} onTabClicked={eventHandler.toggleTab} />
          <TabContent activeTab={activeTab} className="mt-3">
            <TabPane tabId="1" className="px-2">
              {!segmentData || isLoading ? (
                renderSkeleton.contentInfo()
              ) : (
                <ContentInfo item={segmentData} />
              )}
            </TabPane>
            {/* {activeTab === '2' ? ( */}
            <TabPane tabId="2" className="px-2">
              {/*<ContentData />*/}
            </TabPane>
            {/* ) : null} */}
            <TabPane tabId="3">{/*<ContentGuide/>*/}</TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </>
  )
}

export default SegmentDetail
