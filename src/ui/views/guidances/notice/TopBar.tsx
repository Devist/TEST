import React, { memo } from 'react'

// ** 컴포넌트
import { Input, InputGroup, InputGroupAddon, InputGroupText, Row, Col } from 'reactstrap'
import { Bell, Search } from 'react-feather'

// ** 커스텀 컴포넌트
import { PermissionsGate } from '@ui/acl/PermissionsGate'
import CreateOrUpdate from './CreateOrUpdate'

// ** 비즈니스
import { CAN } from '@ui/acl/permission-maps'

type Props = {
  item: any
  searchTerm: string
  handleNoticeFilter: (e: React.ChangeEvent<HTMLInputElement>) => void
  refresh: () => void
}

/** ************************************************************************
 * name : 공지사항 상단바 컴포넌트
 * description :
 * - 현재 표시되는 공지사항 리스트의 공지 타입을 표시
 * - [공지사항 제목, 내용]에 대한 검색
 * - 신규 등록 버튼
 *************************************************************************** */
function TopBar({ item, searchTerm, handleNoticeFilter, refresh }: Props) {
  return (
    <Row className="align-items-center">
      <Col md="9" sm="12" className="d-flex align-items-center">
        <div className="avatar avatar-tag bg-light-primary mr-1">
          <Bell size={20} />
        </div>
        <h4 className="mb-0 mr-2" style={{ width: '70px' }}>
          {item.category.replace('notice', '공지').replace('release', '배포')}
        </h4>
        <InputGroup className="input-group-merge">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <Search size={14} />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            type={'text'}
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNoticeFilter(e)}
            placeholder="검색어를 입력하세요. (제목, 내용)"
          />
        </InputGroup>
      </Col>
      <Col md="3" sm="12" className="d-flex justify-content-end">
        <PermissionsGate errorProps={{ disabled: true }} scopes={[CAN.MANAGE_NOTICE]}>
          <CreateOrUpdate type="create" refresh={refresh} />
        </PermissionsGate>
      </Col>
    </Row>
  )
}
export default memo(TopBar)
