const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토']

/**
 * 보기 좋은 날짜 형태로 변환합니다.
 * origint Date 예) 2021-05-21T02:12:47.000Z
 * return 예) 02시 12분 47초
 * @param {string} originDate
 */
export function getTimeForDisplay(originDate: string): string {
  const time = originDate.includes('T')
    ? originDate.split('T')[1].split(':')
    : originDate.split(' ')[1].split(':')
  return `${time[0]}시 ${time[1]}분 ${time[2].split('.')[0]}초`
}

/**
 * 보기 좋은 날짜 형태로 변환합니다.
 * origin tDate 예) 2021-05-21T02:12:47.000Z or 2021-05-21 02:12:47
 * return 예) 2021년 05월 21일 (금)
 * @param {string} originDate
 */
export function getDayWithWeekForDisplay(originDate: string): string {
  const day = originDate.includes('T')
    ? originDate.split('T')[0].split('-')
    : originDate.split(' ')[0].split('-')
  const week =
    WEEKDAY[new Date(Number(day[0]), Number(day[1]), Number(day[2]), 0, 0, 0, 0).getDay()]
  return `${day[0]}년 ${day[1]}월 ${day[2]}일 (${week})`
}

export function getDayAndTimeForDisplay(originDate: string): string {
  const [date, time] = originDate.split(' ')
  const dateArr = date.split('-')
  const timeArr = time.split(':')
  return `
          ${dateArr[0].substring(2, 4)}-${dateArr[1]}-${dateArr[1]} 
          ${timeArr[0]}시 ${timeArr[1]}분
         `
}

export function getDayForDisplay(originDate: string): string {
  const day = originDate.includes('T')
    ? originDate.split('T')[0].split('-')
    : originDate.split(' ')[0].split('-')

  return `${day[0].substring(2, 4)}년 ${day[1]}월 ${day[2]}일`
}

export function getNextDayForDisplay(originDate: string): string {
  const day = originDate.includes('T')
    ? originDate.split('T')[0].split('-')
    : originDate.split(' ')[0].split('-')

  let tomorrow = new Date(parseInt(day[0]), parseInt(day[1]), parseInt(day[2]))
  tomorrow.setDate(tomorrow.getDate() + 1)
  return `${tomorrow.getFullYear().toString().substring(2, 4)}년 ${
    tomorrow.getUTCMonth() < 10 ? `0${tomorrow.getUTCMonth()}` : tomorrow.getUTCMonth()
  }월 ${tomorrow.getDate() < 10 ? `0${tomorrow.getDate()}` : tomorrow.getDate()}일`
}

export function getPrevDayForDisplay(originDate: string): string {
  const day = originDate.includes('T')
    ? originDate.split('T')[0].split('-')
    : originDate.split(' ')[0].split('-')

  let yesterDay = new Date(parseInt(day[0]), parseInt(day[1]), parseInt(day[2]))
  yesterDay.setDate(yesterDay.getDate() - 1)

  return `${yesterDay.getFullYear().toString().substring(2, 4)}년 ${
    yesterDay.getUTCMonth() < 10 ? `0${yesterDay.getUTCMonth()}` : yesterDay.getUTCMonth()
  }월 ${yesterDay.getDate() < 10 ? `0${yesterDay.getDate()}` : yesterDay.getDate()}일`
}

export function getPlusOrMinusDayForDisplay(
  originDate: string,
  dayToPlusMinus: number
): string {
  let day = originDate.includes('T')
    ? originDate.split('T')[0].split('-')
    : originDate.split(' ')[0].split('-')

  let newDay = new Date(parseInt(day[0]), parseInt(day[1]), parseInt(day[2]))
  newDay.setDate(newDay.getDate() + dayToPlusMinus)

  if (newDay.toString() === 'Invalid Date') {
    day = originDate.split(' ')
    newDay = new Date(parseInt(day[0]), parseInt(day[1]), parseInt(day[2]))
    newDay.setDate(newDay.getDate() + dayToPlusMinus)
  }

  return `${newDay.getFullYear().toString().substring(2, 4)}년 ${
    newDay.getUTCMonth() < 10 ? `0${newDay.getUTCMonth()}` : newDay.getUTCMonth()
  }월 ${newDay.getDate() < 10 ? `0${newDay.getDate()}` : newDay.getDate()}일`
}

/**
 * 주어진 날짜에 대해 오늘 기준 일수 차이를 반환합니다.
 * origin tDate 예) 2021-05-21T02:12:47.000Z
 * return 예) 51  (일)
 * @param {number} originDate
 */
export function getNumberOfDaysFromToday(originDate: string): number {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const today = new Date(year, month, day)

  const originDay = originDate.split('T')[0].split('-')
  const origin = new Date(
    Number(originDay[0]),
    Number(originDay[1]),
    Number(originDay[2])
  )
  return (today.getTime() - origin.getTime()) / (1000 * 3600 * 24)
}
