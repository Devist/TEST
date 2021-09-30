import React, { memo, useEffect, useState } from 'react'

// ** 컴포넌트
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

// ** 커스텀 컴포넌트
import StepSourceSelect from '@ui/views/segments/list/components/StepSourceSelect'

// ** 비즈니스
import { CREATE_SOURCE, ISegment } from '@src/entities'
import { useStores } from '@src/stores'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'
import StepTemplateOne from '@ui/views/segments/list/components/StepTemplateOne'

type Props = {
  // name: string
  // memoInformation?: ILabelMemo
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  // onSaveButtonClicked: (text: string) => void
  // onDeleteButtonClicked: () => void
}

/** ************************************************************************
 * name :
 * description :
 *
 * todo 작성 필요
 *************************************************************************** */
function CreateModal({ open, setOpen }: Props) {
  const [step, setStep] = useState(1)
  const [title, setTitle] = useState('세그먼트 만들기')

  const { segmentMakeupStore } = useStores()
  const history = useHistory()

  useEffect(() => {
    const titles = [
      '세그먼트 만들기 - 방법 선택',
      '마케팅 템플릿 사용하기(1/2) - 게임 선택',
      '마케팅 템플릿 사용하기(2/2) - ADID 템플릿 선택'
    ]
    setTitle(titles[step - 1])
  }, [step])

  useEffect(() => {
    return () => {
      segmentMakeupStore.init()
    }
  }, [open])

  const events = {
    handleCancel: () => {
      setOpen(false)
    },
    handleNext: () => {
      setStep(step + 1)
    },
    handlePrev: () => {
      setStep(step - 1)
    },
    moveToEditPage: () => {
      history.push('/segment/edit')
    }
  }

  return (
    <Modal
      isOpen={open}
      className="modal-dialog-centered modal-lg"
      toggle={() => setOpen(false)}>
      {/* 모달 타이틀 영역 */}
      <ModalHeader toggle={events.handleCancel}>{title}</ModalHeader>

      <ModalBody>
        {step === 1 && <StepSourceSelect />}
        {step === 2 && <StepTemplateOne />}
      </ModalBody>

      {/* 버튼 모음 */}
      <ModalFooter className="d-flex flex-row-reverse justify-content-between">
        {step !== 3 && segmentMakeupStore.createSource === CREATE_SOURCE.TEMPLATE ? (
          <Button
            color="primary"
            disabled={step === 2 && !segmentMakeupStore.games}
            onClick={events.handleNext}>
            다음
          </Button>
        ) : (
          <Button color="primary" onClick={events.moveToEditPage}>
            적용하기
          </Button>
        )}
        {step !== 1 && <Button onClick={events.handlePrev}>{'< 이전'}</Button>}

        {/* {memoInformation ? ( */}

        {/* ) : ( */}
        {/*  <div /> */}
        {/* )} */}
        {/* <div> */}
        {/*  <Button */}
        {/*    color="secondary" */}
        {/*    className="mr-2" */}
        {/*    onClick={() => events.handleCancel()}> */}
        {/*    취소 */}
        {/*  </Button> */}
        {/*  <Button color="primary" onClick={events.handleSave}> */}
        {/*    {memoInformation ? '다음' : '해당 템플릿 사용'} */}
        {/*  </Button> */}
        {/* </div> */}
      </ModalFooter>
    </Modal>
  )
}

export default memo(observer(CreateModal))
