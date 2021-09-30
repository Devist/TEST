import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'

// ** 컴포넌트
import Breadcrumbs from '@core-components/breadcrumbs'
import { Minus, Plus } from 'react-feather'

// ** 써드파티 컴포넌트
import Skeleton from 'react-loading-skeleton'
import { toast } from 'react-toastify'
import * as classnames from 'classnames'

// ** 커스텀 컴포넌트
import Searchbar from '@ui/components/molecules/SearchBar'
import Header from './Header'
import Sidebar from './Sidebar'
import LabelCard from './LabelCard'
import MemoModal from './MemoModal'
import { ToastComponent } from '@src/repositories/network/APIClient'
import Paging2 from '@ui/components/organisms/Paging2'

// ** 스타일
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/react/apps/app-users.scss'
import '@styles/base/pages/app-ecommerce.scss'

// ** 비즈니스
import { AGGREGATE_BASE_1, DATA_TYPE, ILabel, ILabelMemo } from '@src/entities'
import { useStores } from '@src/stores'

type selectedLabel = {
  name: string
  id: number
  memo?: ILabelMemo
}

/** ************************************************************************
 * 레이블 리스트 조회 페이지
 *************************************************************************** */
function Labels() {
  const { labelStore, userStore } = useStores()

  const history = useHistory()

  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [memoModalOpen, setMemoModalOpen] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState<selectedLabel>({ name: '', id: -1 })

  useEffect(() => {
    labelStore.fetch().then(() => {
      setIsLoading(false)
    })
    return () => {
      labelStore.filterInit()
    }
  }, [])

  const handlers = {
    /**
     * selectedLabel 정보를 가지고 각 레이블 카드의 이벤트를 처리를 담당합니다.
     */
    card: {
      openMemoModal: (label: ILabel): void => {
        const presentMemo = userStore.getMemo(label.id)
        presentMemo
          ? setSelectedLabel({
              name: label.description,
              id: label.id,
              memo: presentMemo
            })
          : setSelectedLabel({ name: label.description, id: label.id })
        setMemoModalOpen(true)
      },
      saveOrUpdateMemo: (targetMemo: string): void => {
        const data: ILabelMemo = {
          labelId: selectedLabel.id,
          memo: targetMemo,
          id: selectedLabel.memo ? selectedLabel.memo.id : undefined
        }
        labelStore.updateMemo(data).then(() => {
          setMemoModalOpen(false)

          const message = `[ ${selectedLabel.name}] 레이블에 메모가 등록되었습니다.`
          toast.success(
            <ToastComponent
              title="메모 등록 완료"
              color="success"
              icon={<Plus />}
              message={message}
            />,
            {
              autoClose: 3500,
              hideProgressBar: true,
              closeButton: false
            }
          )
        })
      },
      deleteMemo: (): void => {
        if (!selectedLabel.memo) return
        if (!selectedLabel.memo.id) return

        labelStore
          .deleteMemo(
            selectedLabel.id,
            selectedLabel.memo.id,
            // @ts-ignore
            labelStore.getFromPage().find((element) => element.id === selectedLabel.id)
          )
          .then(() => {
            setMemoModalOpen(false)

            const message = `[ ${selectedLabel.name}] 레이블에 메모가 삭제되었습니다.`
            toast.success(
              <ToastComponent
                title="메모 삭제 완료"
                color="success"
                icon={<Minus />}
                message={message}
              />,
              {
                autoClose: 3500,
                hideProgressBar: true,
                closeButton: false
              }
            )
          })
      },
      routeToDetail: (labelId: number) => {
        history.push(`/labels/${labelId}`)
      }
    },
    filter: {
      labelToAggregationBaseOne: (aggregation: AGGREGATE_BASE_1 | number) => {
        labelStore.filterToAggregation(aggregation)
      },
      labelToDataType: (dataType: DATA_TYPE | string) => {
        labelStore.filterToDataType(dataType)
      },
      labelToSearch: (searchText: string) => {
        labelStore.filterToSearch(searchText)
      },
      init: () => {
        labelStore.filterInit()
      },
      findFromKeyword: (keyword: string, checked: boolean): void => {
        labelStore.findFromKeyword(keyword, checked)
      }
    },
    changePage: (pageNumber: string | number) => {
      if (pageNumber === 'next') {
        const maxLength = labelStore.filteredLabels
          ? Math.ceil(labelStore.filteredLabels.length / 10)
          : Math.ceil(labelStore.labels.length / 10)
        labelStore.page !== maxLength ? labelStore.setPage(labelStore.page + 1) : null
      } else if (pageNumber === 'prev') {
        labelStore.page !== 1 ? labelStore.setPage(labelStore.page - 1) : null
      } else if (typeof pageNumber === 'number') labelStore.setPage(pageNumber)
    }
  }

  const renderSkeleton = {
    sidebar: () => (
      <div className="d-none d-lg-flex flex-column mt-1">
        <Skeleton width={30} height={20} />
        <Skeleton width={250} height={500} className="my-2" />
      </div>
    ),
    body: () => (
      <div className="d-flex flex-column mt-1">
        <Skeleton width={100} height={20} />
        <Skeleton height={48} className="my-2" />
        <Skeleton height={186} className="mb-2" />
        <Skeleton height={186} className="mb-2" />
        <Skeleton height={186} className="mb-2" />
        <Skeleton height={186} className="mb-2" />
        <Skeleton height={186} className="mb-2" />
        <Skeleton height={186} className="mb-2" />
      </div>
    )
  }

  return (
    <>
      <Breadcrumbs breadCrumbTitle="레이블" breadCrumbActive="레이블 리스트" />

      {/* 왼쪽 사이드바(필터) 영역 */}
      <div className="sidebar-detached sidebar-left">
        {isLoading ? (
          renderSkeleton.sidebar()
        ) : (
          <Sidebar
            sidebarOpen={sidebarOpen}
            onAggregationFilterClicked={handlers.filter.labelToAggregationBaseOne}
            onDataTypeFilterClicked={handlers.filter.labelToDataType}
            onInitFilterButtonClicked={handlers.filter.init}
            onKeywordFilterClicked={handlers.filter.findFromKeyword}
          />
        )}
      </div>

      {/* 오른쪽 레이블 리스트 영역 */}
      <div className="content-detached content-right">
        <div className="content-body">
          {isLoading ? (
            renderSkeleton.body()
          ) : (
            <>
              <Header
                resultNumber={
                  labelStore.filteredLabels
                    ? labelStore.filteredLabels.length
                    : labelStore.labels.length
                }
                setSidebarOpen={setSidebarOpen}
              />
              <Searchbar
                placeholder="레이블 검색"
                onSearched={handlers.filter.labelToSearch}
              />

              {labelStore.getFromPage().length ? (
                <>
                  {labelStore.getFromPage().map((label) => (
                    <LabelCard
                      key={`label-${label.id}-card`}
                      information={label}
                      onMemoButtonClicked={() => handlers.card.openMemoModal(label)}
                      onDetailButtonClicked={handlers.card.routeToDetail}
                    />
                  ))}

                  <Paging2
                    totalNumber={
                      labelStore.filteredLabels
                        ? labelStore.filteredLabels.length
                        : labelStore.labels.length
                    }
                    onItemClicked={handlers.changePage}
                    store={labelStore}
                  />
                </>
              ) : (
                <div className="d-flex justify-content-center mt-2">
                  <p>결과가 없습니다</p>
                </div>
              )}

              {/* 반응형(모바일)에서 필터 킬 경우, 오버레이 */}
              <div
                className={classnames('body-content-overlay', {
                  show: sidebarOpen
                })}
                onClick={() => setSidebarOpen(false)}
              />
            </>
          )}
        </div>
      </div>

      <MemoModal
        name={selectedLabel.name}
        memoInformation={selectedLabel.memo}
        open={memoModalOpen}
        setOpen={setMemoModalOpen}
        onSaveButtonClicked={handlers.card.saveOrUpdateMemo}
        onDeleteButtonClicked={handlers.card.deleteMemo}
      />
    </>
  )
}

export default observer(Labels)
