import React from 'react'
import { Link } from 'react-router-dom'

// ** 컴포넌트
import { Card, CardBody, CardText, Button, Badge, Row, Col } from 'reactstrap'
import { BookOpen, Edit3 } from 'react-feather'

// ** 커스텀 컴포넌트
import Favorites from '@ui/components/organisms/Favorites'

// ** 유틸
import { getDayAndTimeForDisplay } from '@src/utils/DateUtil'

// ** 비즈니스
import { ILabel } from '@src/entities'

type Props = {
  information: ILabel
  onMemoButtonClicked: () => void
  onDetailButtonClicked: (labelId: number) => void
}

/** ************************************************************************
 * name : 레이블 리스트 조회 페이지 - 레이블 카드 컴포넌트
 * description :
 * 레이블의 요약 정보가 담겨 있는 카드입니다.
 * - 이름
 * - 자동 설명
 * - 키워드
 * - 메모내용
 * - 즐겨찾기 여부
 * - 최근 업데이트 일자
 * - 적재건수
 *************************************************************************** */
function LabelCard({ information, onMemoButtonClicked, onDetailButtonClicked }: Props) {
  const events = {
    openMemoController: () => {
      onMemoButtonClicked()
    },
    goToDetail: () => {
      onDetailButtonClicked(information.id)
    }
  }

  return (
    <div className={'list-view'}>
      <Card className="ecommerce-card">
        <CardBody>
          <h6 className="item-name">
            {/* 레이블 이름 */}
            <div className="d-flex align-items-center justify-content-between">
              <Link
                className="text-body text-body-heading"
                to={`/labels/${information.id}`}>
                {information.simpleDescription}
              </Link>
              {/* 즐겨찾기. Pin to Top */}
              <Favorites
                isTop={information.isTop ? information.isTop : false}
                labelTitle={information.simpleDescription}
                labelId={information.id}
              />
            </div>

            {/* 메모 */}
            <div className="mt-1 text-success item-memo">{information.memo}</div>

            {/* 키워드 모음 */}
            <CardText tag="span" className="item-company text-break">
              <Row>
                <Col>
                  {information.hashtags.map((hashtag) => (
                    <Badge
                      key={`hashtag-${hashtag.id}`}
                      color="warning"
                      pill
                      className="company-name mt-little">
                      {hashtag.hashtag}
                    </Badge>
                  ))}
                </Col>
              </Row>
            </CardText>
          </h6>

          {/* 레이블 설명 */}
          <CardText
            className="item-description"
            dangerouslySetInnerHTML={{ __html: information.translate }}
          />
        </CardBody>

        {/* 버튼 모음 영역 */}
        <div className="item-options text-center">
          <div className="item-wrapper">
            {/* 최근 업데이트 일자 */}
            <p className="font-small-3">
              최근 업데이트 :
              {information.latestDataCompletionDatetime
                ? `${getDayAndTimeForDisplay(information.latestDataCompletionDatetime)} `
                : '알 수 없음'}
            </p>

            {/* 적재 건수 */}
            <div className="item-cost">
              <h4 className="item-price font-small-3">
                적재 건수 :
                {information.latestDataCount
                  ? `${information.latestDataCount.toLocaleString()}건`
                  : '알 수 없음'}
              </h4>
            </div>
          </div>

          {/* 메모 버튼 */}
          <Button
            className="btn-memo"
            color={information.memo ? 'success' : 'light'}
            outline={!!information.memo}
            onClick={() => events.openMemoController()}>
            <Edit3 className="mr-50" size={14} />
            <span>메모</span>
          </Button>

          {/* 자세히 버튼 */}
          <Button
            color="primary"
            tag={'hello'}
            className="btn-cart move-cart"
            onClick={() => events.goToDetail()}>
            <BookOpen className="mr-50" size={14} />
            <span>자세히</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default LabelCard
