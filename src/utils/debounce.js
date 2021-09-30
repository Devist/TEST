export const debounce = (func, wait, leading = false) => {
  let inDebounce
  return function () {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this
    const args = arguments

    // inDebounce 값이 변하기 전에 미리 저장하기 위해 사용
    const callNow = leading && !inDebounce

    // leading 이 아닌 경우에만 wait 이후 func 가 실행되도록 함
    const later = () => {
      inDebounce = null
      if (!leading) func.apply(context, args)
    }

    // setTimeout 이 실행된 Timeout 의 ID를 반환하고, clearTimeout()으로 이를 해제할 수 있음을 이용
    clearTimeout(inDebounce)
    inDebounce = setTimeout(later, wait)

    // 만약 leading=true 이고 inDebounce 가 없으면 func 를 실행
    if (callNow) func.apply(context, args)
  }
}
