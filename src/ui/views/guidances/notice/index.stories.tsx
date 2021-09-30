import Notice from '@ui/views/guidances/notice'
import { useStores } from '@src/stores'
import { GAME_STATUS_TYPE } from '@src/entities'
import React from 'react'

export default {
  title: '페이지 /공지사항',
  component: Page,
  parameters: {
    docs: {
      description: {
        component: '공지 사항을 조회합니다.'
      }
    }
  }
}

export function Page() {
  const { userStore } = useStores()
  userStore.addGames([
    {
      code: 'soulkingglobal',
      name: '소울킹 글로벌',
      status: GAME_STATUS_TYPE.OPEN
    },
    { code: 'projectp', name: '블라썸파티', status: GAME_STATUS_TYPE.OPEN }
  ])
  return (
    <>
      <Notice test={true} />
    </>
  )
}
