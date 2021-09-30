import React, { useState } from 'react'

import { Row, Col, Button } from 'reactstrap'
import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  Edit,
  Edit3,
  Minus,
  MoreVertical,
  Plus,
  Trash,
  User
} from 'react-feather'

import DisplayBoxWithTitle from '@ui/components/molecules/DisplayBoxWithTitle'
import Avatar from '@core-components/avatar'
import { ILabel, ILabelMemo } from '@src/entities'
import LabelComposition from '@ui/views/labels/detail/ContentInfo/LabelComposition'
import ProfileInfo from '@ui/views/labels/detail/ContentInfo/ProfileInfo'
import RecentData from '@ui/views/labels/detail/ContentInfo/RecentData'
import MemoModal from '@ui/views/labels/list/MemoModal'
import { toast } from 'react-toastify'
import { ToastComponent } from '@src/repositories/network/APIClient'
import { useStores } from '@src/stores'
import DisplayBoxWithButton from '@ui/components/molecules/DisplayBoxWithTitle/DisplayBoxWithButton'

type selectedLabel = {
  name: string
  id: number
  memo?: ILabelMemo
}

type Props = { item: ILabel }

/** ************************************************************************
 * name :
 * description :

 * todo 작성 필요
 *************************************************************************** */
function ContentInfo({ item }: Props) {
  const rangeCalc = (rangeType: number, rangeExtra?: string | null): string => {
    switch (rangeType) {
      case 0:
        return '전체 기간'
      case 2:
        return '최근 ' + rangeExtra
      case 3:
        return '당일'
    }
    return 'rangeType error'
  }
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [memoModalOpen, setMemoModalOpen] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState<selectedLabel>({ name: '', id: -1 })
  const { labelStore, userStore } = useStores()

  const eventHandler = {
    /**
     * selectedLabel 정보를 가지고 각 레이블 카드의 이벤트를 처리를 담당합니다.
     */
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
        item.memo = targetMemo
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

      labelStore.deleteMemo(selectedLabel.id, selectedLabel.memo.id, item).then(() => {
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
    }
  }

  return (
    <div>
      <Row>
        <Col xl="4" md="12" xs="12">
          <DisplayBoxWithTitle title="레이블 정보" className="label-info-small-box">
            <p dangerouslySetInnerHTML={{ __html: item.translate }} />
          </DisplayBoxWithTitle>
        </Col>
        <Col xl="4" md="12" xs="12" className="mt-2 mt-lg-0">
          <DisplayBoxWithTitle title="담당자" className="label-info-small-box">
            <div>
              <User size="14" className="mr-1" /> {item.managerName}
            </div>
            <div>
              <CreditCard size="14" className="mr-1" /> {item.departmentName}
            </div>
            {/*<div>*/}
            {/*  <User size="14" className="mr-1" /> {item.departmentName}*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*  <User size="14" className="mr-1" /> {item.managerName}*/}
            {/*</div>*/}
          </DisplayBoxWithTitle>
        </Col>
        <Col xl="4" md="12" xs="12" className="mt-2 mt-lg-0">
          <DisplayBoxWithButton
            title="나의 메모"
            button={
              <Button
                className="btn-icon"
                color="primary"
                size="sm"
                key={`delete-memo-${item.id}`}
                onClick={() => eventHandler.openMemoModal(item)}>
                {item.memo ? (
                  <Edit3 className="" size="9" />
                ) : (
                  <Plus className="" size="9" />
                )}
              </Button>
            }
            className="label-info-small-box">
            <div style={{ whiteSpace: 'pre-line' }}>
              {item.memo ? item.memo : '메모가 없습니다.'}
            </div>
          </DisplayBoxWithButton>
        </Col>
      </Row>

      {showDetail && (
        <>
          <Row>
            <Col xl="6" md="12" xs="12" className="mt-2 mt-lg-3">
              <DisplayBoxWithTitle title="레이블 구성" className="label-info-big-box">
                <LabelComposition item={item} rangeCalc={rangeCalc} />
              </DisplayBoxWithTitle>
            </Col>
            <Col xl="6" md="12" xs="12" className="mt-2 mt-lg-3">
              {item.profile && (
                <DisplayBoxWithTitle
                  title="이 레이블을 사용하는 프로필 설정 정보"
                  className="label-info-big-box">
                  <ProfileInfo item={item.profile} />
                </DisplayBoxWithTitle>
              )}
              {!item.profile && (
                <DisplayBoxWithTitle
                  title="이 레이블에 연결된 프로필 정보"
                  className="label-info-big-box align-center">
                  <h5>연결된 프로필이 없습니다.</h5>
                </DisplayBoxWithTitle>
              )}
            </Col>
          </Row>
          <Row>
            <Col className="py-4">
              <Button
                block
                className="round"
                color="primary"
                onClick={() => setShowDetail(false)}>
                <ChevronUp size={14} />
                <span className="align-middle ml-25">간단히</span>
              </Button>
            </Col>
          </Row>
        </>
      )}
      {!showDetail && (
        <Row>
          <Col className="py-4">
            <Button
              block
              className="round"
              color="primary"
              onClick={() => setShowDetail(true)}>
              <ChevronDown size={14} />
              <span className="align-middle ml-25">자세히</span>
            </Button>
          </Col>
        </Row>
      )}
      <RecentData
        criterias={item.aggregationCriterias?.sort(
          (a: any, b: any) => b.latest_data_count - a.latest_data_count
        )}
      />

      <MemoModal
        name={selectedLabel.name}
        memoInformation={selectedLabel.memo}
        open={memoModalOpen}
        setOpen={setMemoModalOpen}
        onSaveButtonClicked={eventHandler.saveOrUpdateMemo}
        onDeleteButtonClicked={eventHandler.deleteMemo}
      />
    </div>
  )
}

export default ContentInfo
