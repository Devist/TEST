import { Profile } from '@src/entities'

export const customStyles = {
  cells: {
    style: {
      height: '100% !important'
    }
  }
}

export const columns = [
  {
    name: '프로필 이름',
    selector: 'name',
    sortable: true,
    grow: 2,
    cell: (row: Profile) => row.name
  },
  {
    name: '프로필값',
    selector: 'value',
    sortable: true,
    grow: 2,
    cell: (row: Profile) => row.value
  },
  {
    name: '프로필 설명',
    minWidth: '300px',
    selector: 'role',
    sortable: false,
    grow: 4,
    // eslint-disable-next-line react/display-name
    cell: (row: Profile) => {
      return (
        <>
          {/* pre-wrap 으로 문자열중 줄바꿈 '/n' 인식하도록 함 */}
          <div style={{ whiteSpace: 'pre-wrap' }}>{row.description}</div>
        </>
      )
    }
  },
  {
    name: '유효기간',
    minWidth: '138px',
    selector: 'currentPlan',
    sortable: false,
    grow: 2,
    cell: (row: Profile) => row.expiredDate
  }
]
