import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Tooltip
} from 'reactstrap'
import { Archive, Copy, Edit3, MoreVertical, Play, Trash2, ZoomIn } from 'react-feather'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ISegment } from '@src/entities/segment/segment.types'
import { ID_TYPE } from '@src/entities'
import { useStores } from '@src/stores'
import { getDayWithWeekForDisplay, getTimeForDisplay } from '@src/utils/DateUtil'

export const customStyles = {
  cells: {
    style: {
      height: '100% !important',
      display: 'flex',
      alignSelf: 'center',
      fontSize: '12px'
    }
  }
}

export const columns = [
  {
    name: '집계기준',
    grow: 0.8,
    minWidth: '108px',
    selector: 'idType',
    sortable: true,
    // eslint-disable-next-line react/display-name
    cell: (row: ISegment) => (
      // <>
      //   <Avatar
      //     color={
      //       row.queryConfig.meta.idType === ID_TYPE.PID ? 'light-primary' : 'light-danger'
      //     }
      //     icon={<User size={14} />}
      //     className="mr-little"
      //   />
      <span
        className={`font-small-3 ${
          row.queryConfig.meta.idType === ID_TYPE.PID ? 'text-primary' : 'text-danger'
        }`}>
        {row.queryConfig.meta.idType}
      </span>
      // </>
    )
  },
  {
    name: '세그먼트',
    grow: 2,
    minWidth: '180px',
    selector: 'name',
    sortable: true,
    class: 'font-weight-bolder'
  },

  {
    name: '타겟 게임',
    grow: 2,
    minWidth: '180px',
    selector: 'targetGames',
    sortable: true,
    // eslint-disable-next-line react/display-name
    cell: (row: ISegment) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { userStore } = useStores()

      return (
        <div style={{ whiteSpace: 'pre-wrap' }}>
          {row.targetGames.map((gameCode, index) => {
            if (gameCode === 'all_games') {
              return (
                <Badge
                  key={`game-badge-${gameCode}`}
                  color="light-secondary"
                  pill
                  className="mr-little font-weight-light mt-little">
                  모든 게임
                </Badge>
              )
            }
            if (index === 3)
              return (
                <Badge
                  key={`game-badge-${gameCode}`}
                  color="light-info"
                  pill
                  className="font-weight-medium">
                  + {row.targetGames.length - 3}
                </Badge>
              )

            if (index < 3)
              return (
                <Badge
                  key={`game-badge-${gameCode}`}
                  color="light-secondary"
                  pill
                  className=" font-weight-light m-little">
                  {userStore.getGameNameFromCode(gameCode)}
                </Badge>
              )
          })}
        </div>
      )
    }
  },

  {
    name: '설명',
    grow: 4,
    selector: 'description',
    sortable: true
  },
  {
    name: '스케쥴',
    grow: 0.5,
    selector: 'age',
    // eslint-disable-next-line react/display-name
    cell: function ScheduleCell(row: ISegment) {
      const [tooltipOpen, setTooltipOpen] = useState(false)
      const toggle = () => setTooltipOpen(!tooltipOpen)
      return row.schedules.length > 0 ? (
        <>
          <span
            className="font-small-3 text-primary"
            id={`segment-per-schedule-${row.id}`}
            style={{ textDecoration: 'underline' }}>
            {row.schedules.length}개
          </span>
          <Tooltip
            placement="right"
            isOpen={tooltipOpen}
            target={`segment-per-schedule-${row.id}`}
            toggle={toggle}>
            {row.schedules.map((item) => {
              return <div key={`schedule-${row.id}-${item.id}`}>{item.name}</div>
            })}
          </Tooltip>
        </>
      ) : (
        <span>-</span>
      )
    }
  },
  {
    name: '담당자',
    grow: 0.1,
    selector: 'managerName',
    sortable: true
  },
  {
    name: '최근실행일',
    grow: 1.3,
    minWidth: '153px',
    selector: 'status',
    sortable: true,
    // eslint-disable-next-line react/display-name
    cell: (row: ISegment) => {
      return (
        <>
          <span className="font-small-2">
            {getDayWithWeekForDisplay(row.endDatetime)}
            <br />
            {getTimeForDisplay(row.endDatetime)}
          </span>
        </>
      )
    }
  },
  {
    name: '',
    grow: 1,
    allowOverflow: true,
    // eslint-disable-next-line react/display-name
    cell: function ActionCell(row: ISegment) {
      const history = useHistory()
      const routeToDetail = (segmentId: number) => {
        history.push(`/segments/${segmentId}`)
      }
      return (
        <div className="d-flex">
          <div className="p-little cursor-pointer" onClick={() => routeToDetail(row.id)}>
            <ZoomIn size={18} />
          </div>
          <div className="p-little cursor-pointer">
            <Play size={18} />
          </div>

          <UncontrolledDropdown className="p-little">
            <DropdownToggle className="pr-1 cursor-pointer" tag="span">
              <MoreVertical size={18} />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e: any) => e.preventDefault()}>
                <Edit3 size={15} />
                <span className="align-middle ml-50">수정</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e: any) => e.preventDefault()}>
                <Copy size={15} />
                <span className="align-middle ml-50">복제</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e: any) => e.preventDefault()}>
                <Archive size={15} />
                <span className="align-middle ml-50">템플릿에 추가</span>
              </DropdownItem>
              <DropdownItem
                tag="a"
                href="/"
                className="w-100"
                onClick={(e: any) => e.preventDefault()}>
                <Trash2 size={15} />
                <span className="align-middle ml-50">삭제</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      )
    }
  }
]
