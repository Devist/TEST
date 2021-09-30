import React, { memo } from 'react'
import { useHistory } from 'react-router-dom'

// ** 컴포넌트
import Avatar from '@core-components/avatar'

// ** 커스텀 컴포넌트
import MoreCard from '@src/ui/components/organisms/MoreCard'

// ** 비즈니스
import { ILabelUsed } from '@src/entities'

type Props = { labels: ILabelUsed[] }

/** ************************************************************************
 * Top 10 레이블 카드
 * 자주 사용한 레이블을 사용 횟수에 따라 최대 10개까지 보여줍니다.
 *************************************************************************** */
function CardMostUsedLabels({ labels }: Props) {
  const history = useHistory()

  const events = {
    clickLabel: (e: any, id: any) => {
      history.push(`labels/${id}`)
    }
  }

  const handlers = {
    clickMore: () => {
      history.push('/labels')
    }
  }

  return (
    <MoreCard title="레이블 사용 TOP 10" clickHandler={handlers.clickMore}>
      <div className="d-flex justify-content-between px-3 mb-2">
        <h5 className="">레이블 타이틀</h5>
        <h5>사용 횟수</h5>
      </div>
      {labels.map((element: ILabelUsed, index) => {
        return (
          <div
            key={`mostUsedLabel-${element.id}`}
            className="d-flex align-items-center p-1 cursor-pointer hoverEffect "
            onClick={(e: React.MouseEvent) => {
              events.clickLabel(e, element.id)
            }}>
            <Avatar
              className="mr-1"
              color="primary"
              content={(index + 1).toString()}
              icon={null}
            />
            {element.simpleDescription}
            <div className="flex-grow-1" />
            <span className="mr-1">{element.segmentJobDefinitionsSize}</span>
          </div>
        )
      })}
    </MoreCard>
  )
}

export default memo(CardMostUsedLabels)
