import React, { memo, useRef } from 'react'
import { useHistory } from 'react-router-dom'

// ** 컴포넌트
import { Button } from 'reactstrap'
import Timeline from '@core-components/timeline'
import { User } from 'react-feather'

// ** 커스텀 컴포넌트
import MoreCard from '@src/ui/components/organisms/MoreCard'

// ** 비즈니스
import { ILabelUsed } from '@src/entities'

// ** 유틸
import { getDayWithWeekForDisplay } from '@src/utils/DateUtil'

type Props = {
  labels: ILabelUsed[]
}

/** ************************************************************************
 * 신규 레이블 카드
 * 1개월 이내에 신규 생성된 레이블을 최신 순으로 보여줍니다.
 *************************************************************************** */
function CardNewLabel({ labels }: Props) {
  const colors = useRef(['primary', 'info', 'danger', 'success'])
  const history = useHistory()

  const events = {
    clickLabel: (id: number) => {
      history.push(`labels/detail/${id}`)
    }
  }

  const handlers = {
    clickMore: () => {
      history.push('/labels')
    }
  }

  const methods = {
    getNewLabels: () =>
      labels.reduce((acc: any, cur, idx) => {
        acc.push({
          title: cur.simpleDescription,
          content: getDayWithWeekForDisplay(
            `${cur.createdDatetime.split(' ').join('T')}.000Z`
          ),
          color: colors.current[idx % 4],
          className: 'cursor-pointer hoverEffect rounded',
          onClick: () => events.clickLabel(cur.id),
          customContent: (
            <div className="d-flex align-items-center">
              <Button
                color={colors.current[idx % 4]}
                className={'btn-icon rounded-circle mr-1'}
                size="sm">
                <User size={12} className="m-50" />
              </Button>
              <div>
                <h6 className="mb-n2">{cur.managerName}</h6>
                <br />
                {cur.departmentName}
              </div>
            </div>
          )
        })
        return acc
      }, [])
  }

  return (
    <MoreCard title="신규 레이블 (1개월 이내)" clickHandler={handlers.clickMore}>
      {labels && <Timeline className="ml-50 mb-0" data={methods.getNewLabels()} />}
      {labels.length === 0 && (
        <div className="d-flex bg-light h-100 justify-content-center align-items-center rounded">
          1개월 이내 신규 레이블이 없습니다.
        </div>
      )}
    </MoreCard>
  )
}

export default memo(CardNewLabel)
