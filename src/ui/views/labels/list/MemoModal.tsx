import React, { memo, useEffect, useState } from 'react'

// ** 컴포넌트
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

// ** 커스텀 컴포넌트
import Textarea from '@ui/components/molecules/Textarea'

// ** 비즈니스
import { ILabelMemo } from '@src/entities'

type Props = {
  name: string
  memoInformation?: ILabelMemo
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSaveButtonClicked: (text: string) => void
  onDeleteButtonClicked: () => void
}

/** ************************************************************************
 * name : 레이블 리스트 조회 페이지 - 메모 작성 모달 컴포넌트
 * description :
 * 특정 레이블에 대해 사용자가 메모를 작성할 수 있는 모달입니다.
 * 신규 메모를 작성하는지, 수정하는 것인지에 따라 다른 처리를 수행합니다.
 *************************************************************************** */
function MemoModal({
  name,
  memoInformation = undefined,
  open,
  setOpen,
  onSaveButtonClicked,
  onDeleteButtonClicked
}: Props) {
  const [text, setText] = useState('')

  useEffect(() => {
    setText(memoInformation ? memoInformation.memo : '')
  }, [open, memoInformation])

  const events = {
    handleSave: () => {
      onSaveButtonClicked(text)
    },
    handleCancel: () => {
      setOpen(false)
    },
    handleDelete: () => {
      onDeleteButtonClicked()
    }
  }

  return (
    <Modal isOpen={open} className="modal-dialog-centered modal-lg">
      {/* 모달 타이틀 영역 */}
      <ModalHeader toggle={events.handleCancel}>메모 ({name})</ModalHeader>

      {/* 메모 입력 영역 */}
      <ModalBody>
        {
          <Textarea
            text={text}
            setText={setText}
            length={1000}
            label="메모"
            placeholder="메모"
            lines={1}
          />
        }
      </ModalBody>

      {/* 버튼 모음 */}
      <ModalFooter className="d-flex justify-content-between">
        {memoInformation ? (
          <Button color="danger" onClick={events.handleDelete}>
            삭제
          </Button>
        ) : (
          <div />
        )}
        <div>
          <Button
            color="secondary"
            className="mr-2"
            onClick={() => events.handleCancel()}>
            취소
          </Button>
          <Button color="primary" onClick={events.handleSave}>
            {memoInformation ? '수정' : '저장'}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default memo(MemoModal)
