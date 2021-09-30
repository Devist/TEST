import React, { useCallback, useMemo, useState } from 'react'

// ** 컴포넌트
import { Card, Row, Col, Label, Input, Button } from 'reactstrap'
import { ChevronDown, Clipboard } from 'react-feather'

// ** 써드파티 컴포넌트
import DataTable from 'react-data-table-component'
import Skeleton from 'react-loading-skeleton'
import { toast } from 'react-toastify'

// ** 커스텀 컴포넌트
import FilterCardSearchProfile from '@ui/components/organisms/FilterCards/FilterCardSearchProfile'
import { ToastComponent } from '@src/repositories/network/APIClient'

// ** 스타일
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** 데이터
import { columns, customStyles } from './columns'

// ** 비즈니스
import { ProfileService } from '@src/services'
import ProfileRepository from '@src/repositories/ProfileRepository'
import { mockProfileDataFromOrders, mockProfileSummaryData, Profile } from '@src/entities'
import { debounce } from '@src/utils/debounce'

type Props = {
  test: boolean
}

/** ************************************************************************
 * name :프로필 조회 페이지
 * description : 프로필이란 특정 PID 또는 ADID (게임유저)에 대한 레이블 모음입니다.
 * 다시 말해, 유저 프로필 - 게임 유저의 레이블(정보) 모음 입니다.
 * 해당 페이지는 이러한 프로필을 조회할 수 있습니다.
 *
 * @param test boolean 타입. 스토리북에서 목업 데이터로 페이지를 확인할 때 사용됩니다.
 *
 *************************************************************************** */
function Profiles({ test = false }: Props) {
  // ** state
  const [searchValue, setSearchValue] = useState('')
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([])
  const [showResult, setShowResult] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const profileService = test
    ? new ProfileService(new ProfileRepository())
    : new ProfileService(
        new ProfileRepository(),
        mockProfileSummaryData(),
        mockProfileDataFromOrders()
      )

  const checks = {
    canSearch: useMemo(() => {
      return profiles.length ? true : null
    }, [profiles]),
    canCopy: useMemo(() => {
      if (searchValue.length && filteredProfiles.length) return true
      if (profiles.length > 0 && searchValue.length === 0) return true

      return null
    }, [searchValue, profiles])
  }

  // ** 인터페이스 처리
  const handlers = {
    /**
     * 클립보드에 복사 버튼 클릭시,
     * 조회된 프로파일 정보를 클립보드에 복사합니다.
     */
    CopyToClipboard: (): void => {
      const t = document.createElement('textarea')
      document.body.appendChild(t)
      t.value = JSON.stringify(profileService.getProfiles(), null, 2)
      t.select()
      document.execCommand('copy')
      document.body.removeChild(t)
      toast.success(
        <ToastComponent
          title="클립보드로 복사 완료!"
          color="success"
          icon={<Clipboard />}
          message="원하는 곳에 단축키 [ Ctrl(Cmd) + v ] 를 입력하여 붙여넣으세요."
        />,
        {
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false
        }
      )
    },

    LookupProfiles: useCallback(
      (type: string, gameCode: string, id: string): void => {
        setSearchValue('')
        setProfiles([]) // 지워도 되는 코드인지 불확실. 실계에서 추후 확인
        setShowResult(true)
        setIsLoading(true)

        profileService.fetchProfiles(type, id, gameCode).then((result: any) => {
          setProfiles(result)
          setIsLoading(false)
        })
      },
      [profiles]
    ),

    /**
     * 검색어 입력시,
     * 조회된 프로파일 정보를 검색어로 필터링 합니다.
     */
    SearchFromResult: (e: React.ChangeEvent<HTMLInputElement>): void => {
      const searched = e.target.value
      let searchResult: Profile[] = []

      if (searched.length) searchResult = profileService.filter(searched, profiles)

      setFilteredProfiles(searchResult)
      setSearchValue(searched)
    }
  }

  return (
    <>
      {/* 필터 영역 */}
      <FilterCardSearchProfile clickHandler={handlers.LookupProfiles} />

      {/* 결과 영역 */}

      {showResult && (
        <Card>
          <Row className="justify-content-between mx-0">
            <Col
              className="d-flex align-items-center justify-content-start mt-1 ml-1"
              md="2"
              sm="12">
              {isLoading ? (
                <Skeleton width={100} height={25} />
              ) : (
                <>
                  <Button
                    color="primary"
                    size="sm"
                    disabled={!checks.canCopy}
                    onClick={handlers.CopyToClipboard}>
                    클립보드에 복사
                  </Button>
                </>
              )}
            </Col>
            <Col
              className="d-flex align-items-center justify-content-end mt-1 mr-1"
              md="6"
              sm="12">
              {isLoading ? (
                <Skeleton width={200} height={25} />
              ) : (
                <>
                  <Label className="mr-1" for="search-input">
                    검색
                  </Label>
                  <Input
                    className="dataTable-filter mb-50"
                    type="text"
                    bsSize="sm"
                    id="search-input"
                    placeholder="검색어를 입력하세요"
                    disabled={!checks.canSearch}
                    onChange={debounce(handlers.SearchFromResult, 300)}
                  />
                </>
              )}
            </Col>
          </Row>

          {isLoading ? (
            <div className="m-2">
              <Skeleton height={300} />
            </div>
          ) : (
            <Row className="p-1">
              <DataTable
                noHeader
                pagination
                columns={columns}
                paginationPerPage={10}
                className="react-dataTable m-2"
                sortIcon={<ChevronDown size={10} />}
                data={searchValue.length ? filteredProfiles : profiles}
                customStyles={customStyles}
                paginationComponentOptions={{
                  rowsPerPageText: '페이지 당 줄 수',
                  rangeSeparatorText: '총'
                }}
                noDataComponent={
                  <div
                    className="p-2 text-center d-flex align-items-center"
                    style={{ height: '300px' }}>
                    결과가 없습니다.
                  </div>
                }
              />
            </Row>
          )}
        </Card>
      )}
    </>
  )
}

export default Profiles
