// 'YYYY-MM-DD' 문자열을 로컬 타임존 기준으로 파싱한다.
// new Date('YYYY-MM-DD')는 UTC 자정으로 해석되어, UTC보다 시간대가 늦은 지역에서
// getDate()/getMonth() 호출 시 하루 앞당겨지는 문제가 있어 이를 피한다.
export function parseLocalDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

// 로컬 타임존 기준 오늘 날짜를 'YYYY-MM-DD'로 반환한다.
// new Date().toISOString()은 UTC 기준이라 자정 근처 시간대에서 하루가 밀릴 수 있다.
export function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
