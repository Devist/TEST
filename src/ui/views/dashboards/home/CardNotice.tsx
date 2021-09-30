import React, { memo } from 'react'
import { useHistory } from 'react-router-dom'

// ** 컴포넌트
import { Badge, Card, CardTitle, CardBody, Media } from 'reactstrap'
import { Calendar } from 'react-feather'
import Avatar from '@core-components/avatar'

// ** 비즈니스
import {
  getDayWithWeekForDisplay,
  getNumberOfDaysFromToday,
  getTimeForDisplay
} from '@src/utils/DateUtil'

// ** 스타일
import illustration from '@ui/assets/images/illustration/email.svg'

type Props = {
  title: string
  content: string
  createdDatetime: string
}

/** ************************************************************************
 * 최근 공지사항 카드
 * 가장 최근의 공지사항을 보여주며,
 * 가장 최근의 공지사항이 30일 이내의 공지일 경우, 'New' 라벨을 붙여줍니다.
 *************************************************************************** */
function CardNotice({ title, content, createdDatetime }: Props) {
  const history = useHistory()

  const events = {
    moreNotices: () => {
      history.push('/notice')
    }
  }

  const methods = {
    createMarkup: () => {
      return { __html: content }
    }
  }

  return (
    <Card className="card-developer-meetup overflow-hidden">
      <div className="meetup-img-wrapper rounded-top text-center position-relative">
        <h4 className="position-absolute p-1">공지</h4>
        <img src={illustration} height="170" />
      </div>
      <CardBody>
        <div className="meetup-header d-flex align-items-center">
          <div className="my-auto">
            <CardTitle tag="h4" className="mb-25">
              <span className="mr-1">{title}</span>
              {getNumberOfDaysFromToday(createdDatetime) < 35 && (
                <Badge color="success" pill size="sm">
                  New
                </Badge>
              )}
            </CardTitle>
          </div>
        </div>
        <Media>
          <Avatar
            color="light-primary"
            className="rounded mr-1"
            icon={<Calendar size={18} />}
          />
          <Media body>
            <h6 className="mb-0">
              {createdDatetime && getDayWithWeekForDisplay(createdDatetime)}
            </h6>
            <small>{createdDatetime && getTimeForDisplay(createdDatetime)}</small>
          </Media>
        </Media>

        <p
          id="notice-content-area"
          className="border mt-1 p-1 nowrap"
          dangerouslySetInnerHTML={methods.createMarkup()}
        />
        <p className="text-right cursor-pointer" onClick={events.moreNotices}>
          + 더보기
        </p>
      </CardBody>
    </Card>
  )
}

export default memo(CardNotice)
