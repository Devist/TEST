import Segments from '@ui/views/segments/list/index'
import { useStores } from '@src/stores'
import { GAME_STATUS_TYPE } from '@src/entities'

export default {
  title: '페이지 /세그먼트',
  component: Segments,
  parameters: {
    docs: {
      description: {
        component: '세그먼트 리스트 페이지.'
      }
    }
  }
}

export function 리스트_페이지() {
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
      <Segments test={true} />
    </>
  )
}
