import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap'

import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { Korean } from 'flatpickr/dist/l10n/ko.js'

import React, { useState } from 'react'
import { DATA_RANGE_TYPE, ICondition, JOB_DATE } from '@src/entities'
import {
  getDayForDisplay,
  getNextDayForDisplay,
  getPrevDayForDisplay,
  getPlusOrMinusDayForDisplay
} from '@src/utils/DateUtil'

// ** 써드파티 컴포넌트
import { toast } from 'react-toastify'

// ** 커스텀 컴포넌트
import { ToastComponent } from '@src/repositories/network/APIClient'
import { Activity } from 'react-feather'

type Props = {
  condition: ICondition // mobx
}

enum DESCRIPTION_OPTIONS {
  FIRST,
  SECOND,
  TODAY,
  TOMORROW
}

const getTextForLatest = (day: DESCRIPTION_OPTIONS, condition: ICondition) => {
  const displayForLatest = {
    [DESCRIPTION_OPTIONS.FIRST]: condition.label.firstJobDate
      ? getPrevDayForDisplay(condition.label.firstJobDate)
      : '정보없음',
    [DESCRIPTION_OPTIONS.SECOND]: condition.label.firstJobDate
      ? getDayForDisplay(condition.label.firstJobDate)
      : '정보없음',
    [DESCRIPTION_OPTIONS.TODAY]: condition.label.modifiedDatetime
      ? getDayForDisplay(condition.label.modifiedDatetime)
      : '정보없음',
    [DESCRIPTION_OPTIONS.TOMORROW]: condition.label.modifiedDatetime
      ? getNextDayForDisplay(condition.label.modifiedDatetime)
      : '정보없음'
  }
  return displayForLatest[day]
}

/**
 *
 */
function DataRange({ condition }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const [modal, setModal] = useState<number>()

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)
  const toggleModal = (id: number) => {
    if (modal !== id) setModal(id)
    else setModal(-1)
  }

  const changeToWords = (dateType: JOB_DATE) => {
    const words = {
      [JOB_DATE.JOBDATE]: '최근 데이터 사용',
      [JOB_DATE.DAY]: 'ahems',
      [JOB_DATE.NO_DATE]: '전체 데이터 사용',
      [JOB_DATE.RANGE]: '범위',
      [JOB_DATE.TODAY]: `최근 ${condition.jobDateValue}일간의 데이터 사용`
    }
    return words[dateType]
  }

  const executeToast = () => {
    const message = `${condition.simpleDescription} 레이블의 데이터 사용 범위를 변경하였습니다.`
    toast.success(
      <ToastComponent
        title="데이터 범위 변경 완료"
        color="success"
        icon={<Activity />}
        message={message}
      />,
      {
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: false
      }
    )
  }

  const events = {
    changeToToday: () => {
      condition.jobDate = JOB_DATE.JOBDATE
      executeToast()
    },
    changeToAllDay: () => {
      condition.jobDate = JOB_DATE.NO_DATE
      executeToast()
    },
    getDescription: (day: DESCRIPTION_OPTIONS) => {
      let latest = getTextForLatest(day, condition)
      let start
      switch (condition.label.dataRangeType) {
        case DATA_RANGE_TYPE.ALL:
          start = condition.label.firstJobDate
            ? getPrevDayForDisplay(condition.label.firstJobDate)
            : '정보없음'
          return (
            <span>
              <strong>{latest}</strong> ({start}부터 수집된)
            </span>
          )
        case DATA_RANGE_TYPE.AFTER_SPECIFIC_DATE:
          start = condition.label.dataRangeExtra
            ? getPrevDayForDisplay(condition.label.dataRangeExtra)
            : '정보없음'
          break
        case DATA_RANGE_TYPE.LATEST:
          start = condition.label.dataRangeExtra
            ? `${condition.label.dataRangeExtra}`
            : '정보없음'
          return (
            <span>
              <strong>{latest}</strong> (기준 최근 {start})
            </span>
          )
      }

      return `${start} ~ ${latest}`
    },

    // 전체 기간 관련
    relatedNoDate: {
      getDescription: (day: DESCRIPTION_OPTIONS) => {
        let latest = getTextForLatest(day, condition)
        let start = condition.label.firstJobDate
          ? getPrevDayForDisplay(condition.label.firstJobDate)
          : '정보없음'

        return `${start} ~ ${latest}`
      }
    },
    relatedLatest: {
      getDescription: (day: DESCRIPTION_OPTIONS, dayNumberToPlusMinus: number) => {
        let latest = getTextForLatest(day, condition)
        let start = getPlusOrMinusDayForDisplay(latest, (dayNumberToPlusMinus - 1) * -1)

        if (dayNumberToPlusMinus === 1) return `${latest}`
        return `${start} ~ ${latest}`
      }
    },
    getDetailDescription: () => {
      console.log('hello')
    }
  }

  const ModalConfig = [
    {
      id: 1,
      modalTitle: '데이터 사용범위',
      body: (() => {
        // toggleModal(1)

        return (
          <div className="d-flex justify-content-end">
            <InputGroup className="input-group-merge half-width">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>최근</InputGroupText>
              </InputGroupAddon>
              <Input
                type="number"
                placeholder="7"
                className="text-right"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  condition.jobDateValue = e.target.value.toString()
                }}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>일</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </div>
        )
      })(),
      onClick: () => {
        condition.jobDate = JOB_DATE.TODAY
        toggleModal(1)
        executeToast()
      }
    },
    {
      id: 2,
      modalTitle: '데이터 사용 범위',
      body: (() => {
        return (
          <div className="d-flex flex-column align-items-center">
            <Flatpickr
              className="form-control"
              // value={picker}
              options={{ inline: true, locale: Korean }}
              // onChange={(date) => setPicker(date)}
            />
          </div>
        )
      })()
    },
    {
      id: 3,
      modalTitle: '데이터 사용 범위',
      body: (() => {
        return (
          <div className="d-flex flex-column align-items-center">
            <Flatpickr
              // value={picker}
              id="range-picker"
              className="form-control"
              // onChange={date => setPicker(date)}
              options={{
                mode: 'range',
                defaultDate: ['2020-02-01', '2020-02-15']
              }}
            />
          </div>
        )
      })()
    }
  ]

  const renderModal = ModalConfig.map((item) => {
    return (
      <React.Fragment key={item.id}>
        <Modal
          isOpen={modal === item.id}
          toggle={() => toggleModal(item.id)}
          className="modal-dialog-centered"
          modalTransition={{ timeout: 0 }}
          key={item.id}>
          <ModalHeader toggle={() => toggleModal(item.id)}>{item.modalTitle}</ModalHeader>
          <ModalBody>{item.body}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={item.onClick} outline>
              적용
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )
  })

  return (
    <div className="d-flex flex-column justify-content-between font-small-3">
      <strong>{changeToWords(condition.jobDate)}</strong>
      {/* 최근 데이터 사용 */}
      {condition.jobDate === JOB_DATE.JOBDATE && (
        <div className="font-small-2 mt-little text-primary">
          <div>
            오늘 실행시, {events.getDescription(DESCRIPTION_OPTIONS.TODAY)} 데이터 사용
          </div>
          <div>
            내일 실행시, {events.getDescription(DESCRIPTION_OPTIONS.TOMORROW)} 데이터 사용
          </div>
          <div>. . . </div>
        </div>
      )}

      {/* 최근 ~일 데이터 사용 */}
      {condition.jobDate === JOB_DATE.TODAY && (
        <div className="font-small-2 mt-little text-primary">
          <div className="mb-little">
            오늘 실행시,{' '}
            {events.relatedLatest.getDescription(
              DESCRIPTION_OPTIONS.TODAY,
              parseInt(condition.jobDateValue)
            )}{' '}
            의 복수 데이터 사용
          </div>
          <ul>
            <li>{events.getDescription(DESCRIPTION_OPTIONS.FIRST)} 데이터</li>
            <li>{events.getDescription(DESCRIPTION_OPTIONS.SECOND)} 데이터</li>
            <li>. . .</li>
            <li>{events.getDescription(DESCRIPTION_OPTIONS.TODAY)} 데이터</li>
          </ul>
          <div
            className="divider divider-dashed border-0"
            style={{ height: 20, marginRight: 100 }}>
            <div className="divider-text p-0" />
          </div>
          <div className="mb-little">
            내일 실행시,{' '}
            {events.relatedLatest.getDescription(
              DESCRIPTION_OPTIONS.TOMORROW,
              parseInt(condition.jobDateValue)
            )}{' '}
            의 복수 데이터 사용
          </div>
          <ul>
            <li>{events.getDescription(DESCRIPTION_OPTIONS.FIRST)} 데이터</li>
            <li>{events.getDescription(DESCRIPTION_OPTIONS.SECOND)} 데이터 </li>
            <li>. . .</li>
            <li>{events.getDescription(DESCRIPTION_OPTIONS.TOMORROW)} 데이터</li>
          </ul>
          <div>. . . </div>
        </div>
      )}

      {/* 모든 데이터 사용 */}
      {condition.jobDate === JOB_DATE.NO_DATE && (
        <div className="font-small-2 mt-little text-primary">
          <div className="mb-little">
            오늘 실행시, {events.relatedNoDate.getDescription(DESCRIPTION_OPTIONS.TODAY)}{' '}
            의 전체 데이터 사용
          </div>
          <ul>
            <li>{events.getDescription(DESCRIPTION_OPTIONS.FIRST)} 데이터</li>
            <li>{events.getDescription(DESCRIPTION_OPTIONS.SECOND)} 데이터</li>
            <li>. . .</li>
            <li>{events.getDescription(DESCRIPTION_OPTIONS.TODAY)} 데이터</li>
          </ul>
          <div
            className="divider divider-dashed border-0"
            style={{ height: 20, marginRight: 100 }}>
            <div className="divider-text p-0" />
          </div>
          <div className="mb-little">
            내일 실행시,{' '}
            {events.relatedNoDate.getDescription(DESCRIPTION_OPTIONS.TOMORROW)} 의 전체
            데이터 사용
          </div>
          <ul>
            <li>{events.getDescription(DESCRIPTION_OPTIONS.FIRST)} 데이터</li>
            <li>{events.getDescription(DESCRIPTION_OPTIONS.SECOND)} 데이터 </li>
            <li>. . .</li>
            <li>{events.getDescription(DESCRIPTION_OPTIONS.TOMORROW)} 데이터</li>
          </ul>
          <div>. . . </div>
        </div>
      )}

      <Dropdown
        direction="right"
        className="align-self-end"
        isOpen={dropdownOpen}
        toggle={toggleDropdown}>
        <DropdownToggle tag="span" right>
          <Button color="primary" outline size="sm" onClick={toggleDropdown}>
            변경
          </Button>
        </DropdownToggle>

        <DropdownMenu>
          <DropdownItem header className="font-small-2 font-weight-bolder">
            세그먼트 실행마다 갱신된 데이터 사용
          </DropdownItem>
          <DropdownItem onClick={events.changeToToday}>최근 데이터(D-1일)</DropdownItem>
          <DropdownItem onClick={() => toggleModal(1)}>최근 ~ 일간의 데이터</DropdownItem>
          <DropdownItem onClick={events.changeToAllDay}>전체 데이터</DropdownItem>
          <DropdownItem header className="font-small-2 font-weight-bolder">
            세그먼트 실행마다 정해진 데이터 사용
          </DropdownItem>
          <DropdownItem onClick={() => toggleModal(2)}>특정 날짜</DropdownItem>
          <DropdownItem onClick={() => toggleModal(3)}>특정 기간</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {renderModal}
    </div>
  )
}

export default DataRange
