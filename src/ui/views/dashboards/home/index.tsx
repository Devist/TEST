import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'

// ** 컴포넌트
import { Row, Col } from 'reactstrap'

// ** 써드파티 컴포넌트
import Skeleton from 'react-loading-skeleton'

// ** 커스텀 컴포넌트
import CardNotice from './CardNotice'
import CardNewLabels from './CardNewLabels'
import CardMostUsedLabels from './CardMostUsedLabels'

// ** 비즈니스
import { ILabelUsed, INotice } from '@src/entities'
import { LabelService, NoticeService } from '@src/services'
import NoticeRepository from '@src/repositories/NoticeRepository'
import LabelRepository from '@src/repositories/LabelRepository'
import MemoRepository from '@src/repositories/MemoRepository'

const noticeService = new NoticeService(new NoticeRepository())
const labelService = new LabelService(new LabelRepository(), new MemoRepository())

/** ************************************************************************
 * 대시보드 페이지
 * [최근 공지, 레이블 사용 Top10, 신규 레이블, 세그먼트 리스트, 스케줄 타임라인] 등
 * 요약 정보를 보여줍니다.
 *************************************************************************** */
function Home() {
  // ** States
  const [notice, setNotice] = useState<INotice>()
  const [newLabels, setNewLabels] = useState<ILabelUsed[]>()
  const [mostUsedLabels, setMostUsedLabels] = useState<ILabelUsed[]>()

  useEffect(() => {
    noticeService.fetchMostRecent().then((items) => setNotice(items[0]))
    labelService.fetchRecent().then((items) => {
      setNewLabels(items)
    })
    labelService.fetchMostUsed().then((items) => {
      setMostUsedLabels(items)
    })
  }, [])

  return (
    <div>
      <Row className="match-height">
        <Col lg="8" xs="12">
          {/* <CompanyTable /> */}
        </Col>
        <Col lg="4" md="6" xs="12">
          {/* 공지사항 카드 */}
          {!notice ? (
            <Skeleton width={'30wh'} height={'66vh'} />
          ) : (
            <CardNotice {...notice} />
          )}
        </Col>
        <Col lg="4" md="6" xs="12">
          {/* <CardBrowserStates colors={colors} trackBgColor={trackBgColor} /> */}
        </Col>
        <Col lg="4" md="6" xs="12">
          {/* 레이블 사용 TOP 10 카드 */}
          {!mostUsedLabels ? (
            <Skeleton width={'30wh'} height={'66vh'} />
          ) : (
            <CardMostUsedLabels labels={mostUsedLabels ? mostUsedLabels : []} />
          )}
        </Col>
        <Col lg="4" md="6" xs="12">
          {/* 신규 레이블 카드 */}
          {!newLabels ? (
            <Skeleton width={'30wh'} height={'66vh'} />
          ) : (
            <CardNewLabels labels={newLabels} />
          )}
        </Col>
      </Row>
    </div>
  )
}

export default observer(Home)
