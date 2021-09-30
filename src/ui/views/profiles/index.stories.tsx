import Profiles from '@ui/views/profiles/index'
import { useStores } from '@src/stores'
import { GAME_STATUS_TYPE } from '@src/entities'

export default {
  title: '페이지 /유저프로필',
  component: Page,
  parameters: {
    docs: {
      description: {
        component: '유저 프로필을 조회합니다.'
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
      <Profiles test={true} />
    </>
  )
}
