import React from 'react'

// ** 컴포넌트
import { Button } from 'reactstrap'
import { Trash2, X } from 'react-feather'

// ** 써드파티 컴포넌트
import { toast } from 'react-toastify'

// ** 커스텀 컴포넌트
import { ToastComponent } from '@src/repositories/network/APIClient'

// ** 비즈니스
import { INotice } from '@src/entities'
import { useStores } from '@src/stores'

type Props = {
  data?: INotice
  refresh: () => void
}

/** ************************************************************************
 * name : 공지사항 삭제 컴포넌트
 * description :
 * 특정 공지사항에서 삭제 버튼을 클릭하면 모달 형태로 표시됩니다.
 *
 * TODO alert -> 모달로 변경 필요
 *************************************************************************** */
function Delete({ data, refresh }: Props) {
  const { noticeStore } = useStores()

  let deleteNotice = () => {
    if (confirm('삭제하시겠습니까?')) {
      if (data?.id) {
        let payload = {
          id: data.id
        }
        noticeStore.delete(payload).then(() => {
          toast.success(
            <ToastComponent
              title="공지사항 삭제"
              color="success"
              icon={<X />}
              message="공지사항이 삭제되었습니다."
            />,
            {
              autoClose: 2000,
              hideProgressBar: true,
              closeButton: false
            }
          )
          refresh()
        })
      }
    }
  }

  return (
    <Button className="mr-2" color="primary" onClick={deleteNotice}>
      <Trash2 size={16} />
    </Button>
  )
}

export default Delete
