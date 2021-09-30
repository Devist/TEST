import React from 'react'

// ** 컴포넌트
import { Button, Col, Input, Label, Row } from 'reactstrap'
import { User } from 'react-feather'

// ** 써드파티 컴포넌트
import Skeleton from 'react-loading-skeleton'
import Avatar from '@core-components/avatar'

// ** 유틸
import { debounce } from '@src/utils/debounce'

type Props = {
  isLoading: boolean
  keywordChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  openCreateModalHandler: () => void
}

function TopBar({ keywordChangeHandler, isLoading, openCreateModalHandler }: Props) {
  return (
    <Row className="mx-0 px-1 py-1">
      <Col className="d-flex align-items-center mt-little" md="4">
        {isLoading ? (
          <Skeleton width={240} height={38} />
        ) : (
          <>
            <Label className="mr-1 " for="segment-search-input">
              검색
            </Label>
            <Input
              className="dataTable-filter mb-50"
              type="text"
              id="segment-search-input"
              placeholder="검색어를 입력하세요"
              onChange={debounce(keywordChangeHandler, 300, false)}
            />
          </>
        )}
      </Col>
      <Col className="d-flex align-items-center" md="4">
        <Avatar color="light-primary" className="ml-3 mr-1" icon={<User size={14} />} />
        <span className="font-small-3">PID</span>
        <Avatar color="light-danger" className="ml-3 mr-1" icon={<User size={14} />} />
        <span className="font-small-3">ADID</span>
      </Col>
      <Col className="d-flex align-items-center justify-content-end" md="4">
        {isLoading ? (
          <Skeleton width={151.8} height={38} />
        ) : (
          <Button color="primary" onClick={openCreateModalHandler}>
            + 세그먼트 만들기
          </Button>
        )}
      </Col>
    </Row>
  )
}
export default TopBar
