import React, { useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react'

// ** 컴포넌트
import { Card } from 'reactstrap'
import { ChevronDown } from 'react-feather'

// ** 써드파티 컴포넌트
import DataTable from 'react-data-table-component'
import Skeleton from 'react-loading-skeleton'

// ** 커스텀 컴포넌트
import TopBar from './TopBar'
import FilterCardSearchSegments from '@ui/components/organisms/FilterCards/FilterCardSearchSegments'
import { columns, customStyles } from './columns'

// ** 스타일
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** 비즈니스
import { useStores } from '@src/stores'
import { ID_TYPE } from '@src/entities'
import CreateModal from '@ui/views/segments/list/CreateModal'

type Props = {
  test: boolean
}

/** ************************************************************************
 * name : 세그먼트 리스트 페이지
 * description :
 * - 세그먼트 리스트 조회
 * - 신규 세그먼트 생성
 * 기능을 제공합니다.
 *************************************************************************** */
function SegmentList({ test = false }: Props) {
  // ** State
  const [isLoading, setIsLoading] = useState(true)
  const [createModalOpen, setCreateModalOpen] = useState(false)

  // ** store
  const { segmentStore } = useStores()

  useEffect(() => {
    segmentStore.fetchAll().then(() => {
      setIsLoading(false)
    })
  }, [])

  const handlers = {
    lookupSegments: useCallback(
      (gameCode: string, idType: ID_TYPE, manager: string): void => {
        segmentStore.setFilterGameCode(gameCode)
        segmentStore.setFilterIdType(idType)
        segmentStore.setFilterMine(manager)
      },
      []
    ),
    searchFromResult: (e: React.ChangeEvent<HTMLInputElement>) => {
      segmentStore.setFilterKeyword(e.target.value)
    },
    activeCreateModal: () => setCreateModalOpen(true)
  }

  return (
    <>
      {/* 상단 필터 영역 */}
      <FilterCardSearchSegments changeHandler={handlers.lookupSegments} />

      <Card>
        {/* 세그먼트 리스트 탑바 */}
        <TopBar
          isLoading={isLoading}
          keywordChangeHandler={handlers.searchFromResult}
          openCreateModalHandler={handlers.activeCreateModal}
        />

        {/* 세그먼트 리스트 테이블 */}
        {isLoading ? (
          <div className="m-2">
            <Skeleton height={500} />
          </div>
        ) : (
          <DataTable
            noHeader
            pagination
            data={segmentStore.getSegments}
            customStyles={customStyles}
            expandableRows
            columns={columns}
            expandOnRowClicked
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
            // expandableRowsComponent={<ExpandableTable />}
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
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
        )}
      </Card>

      <CreateModal open={createModalOpen} setOpen={setCreateModalOpen} />
    </>
  )
}

export default observer(SegmentList)
