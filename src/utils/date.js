// Parse a 'YYYY-MM-DD' string using the local timezone.
// new Date('YYYY-MM-DD') is interpreted as UTC midnight, which can shift the date
// back a day when calling getDate()/getMonth() in timezones behind UTC. This avoids that.
export function parseLocalDate(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

// Return today's date as 'YYYY-MM-DD' in the local timezone.
// new Date().toISOString() is UTC-based and can be off by a day near midnight.
export function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
