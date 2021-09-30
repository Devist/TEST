import React, { memo, useState } from 'react'

// ** 컴포넌트
import { Minus, Plus, Star } from 'react-feather'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

// ** 써드파티 컴포넌트
import { toast } from 'react-toastify'

// ** 커스텀 컴포넌트
import { ToastComponent } from '@src/repositories/network/APIClient'

// ** 비즈니스
import { useStores } from '@src/stores'

type Props = {
  isTop: boolean
  labelTitle: string
  labelId: number
}

/** ************************************************************************
 * name :
 * description :

 * todo 작성 필요
 *************************************************************************** */
function Favorites({ isTop, labelTitle, labelId }: Props) {
  const [favorite, setFavorite] = useState<boolean>(isTop)
  const [modalOpen, setModalOpen] = useState(false)

  const { labelStore } = useStores()

  const events = {
    toggle: () => setModalOpen(!modalOpen),
    cancelFavorite: () => {
      labelStore.cancelFavorite(labelId)?.then(() => {
        setModalOpen(false)
        setFavorite(false)
        showToast('canceled')
      })
    },
    addFavorite: () => {
      labelStore.addFavorite(labelId).then(() => {
        setModalOpen(false)
        setFavorite(true)
        showToast('added')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
    }
  }

  const showToast = (state: string) => {
    const message =
      state === 'added'
        ? `[ ${labelTitle}] 레이블이 즐겨찾기 되었습니다.`
        : `[ ${labelTitle}] 레이블이 즐겨찾기 해제되었습니다.`

    toast.success(
      <ToastComponent
        title={`즐겨찾기 ${state === 'added' ? '추가' : '해제'} 완료`}
        color="success"
        icon={state === 'added' ? <Plus /> : <Minus />}
        message={message}
      />,
      {
        autoClose: 3500,
        hideProgressBar: true,
        closeButton: false
      }
    )
  }
  return (
    <>
      <Star
        size={14}
        fill={favorite ? 'red' : 'none'}
        className="text-danger cursor-pointer"
        onClick={events.toggle}
      />

      <Modal
        isOpen={modalOpen}
        className="modal-dialog-centered modal-md"
        toggle={events.toggle}>
        {/* 모달 타이틀 영역 */}
        <ModalHeader toggle={events.toggle}>즐겨찾기</ModalHeader>

        {/* 메모 입력 영역 */}
        <ModalBody>
          {favorite ? (
            <>
              <div>
                <strong>{labelTitle}</strong> 레이블을 즐겨찾기에서 해제하겠습니까?
              </div>
              <div>해제시 조회할 때 가장 먼저 보이지 않습니다.</div>
            </>
          ) : (
            <>
              <div>
                <strong>{labelTitle}</strong> 레이블을 즐겨찾기에 추가하겠습니까?
              </div>
              <div>
                목록을 조회하거나 세그먼트를 만들 때 리스트에서 가장 먼저 보여집니다.
              </div>
            </>
          )}
        </ModalBody>

        {/* 버튼 모음 */}
        <ModalFooter>
          <Button
            color={favorite ? 'warning' : 'primary'}
            onClick={favorite ? events.cancelFavorite : events.addFavorite}>
            {favorite ? '해제' : '즐겨찾기에 추가'}
          </Button>
          {/*</div>*/}
        </ModalFooter>
      </Modal>
    </>
  )
}

export default memo(Favorites)
