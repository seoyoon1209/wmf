import { ChevronLeft, ChevronRight } from 'lucide-react'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function toDateStr(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function buildMonthCells(year, month) {
  const startWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < startWeekday; i++) {
    cells.push(null)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ day, dateStr: toDateStr(year, month, day) })
  }
  return cells
}

function Calendar({ year, month, onPrevMonth, onNextMonth, selectedDate, onSelectDate, periodDates, todayStr }) {
  const cells = buildMonthCells(year, month)

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <button type="button" onClick={onPrevMonth} className="text-gray-400">
          <ChevronLeft size={18} />
        </button>
        <span className="font-semibold text-gray-900">
          {new Date(year, month, 1).toLocaleString('en-US', { month: 'long' })} {year}
        </span>
        <button type="button" onClick={onNextMonth} className="text-gray-400">
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="grid grid-cols-7 text-center text-xs text-gray-400">
        {WEEKDAYS.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-y-2">
        {cells.map((cell, i) => {
          if (!cell) return <div key={i} />
          const isSelected = cell.dateStr === selectedDate
          const isPeriod = periodDates.has(cell.dateStr)
          const isToday = cell.dateStr === todayStr
          return (
            <div key={cell.dateStr} className="flex justify-center">
              <button
                type="button"
                onClick={() => onSelectDate(cell.dateStr)}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors ${
                  isSelected
                    ? 'bg-rose-400 font-medium text-white'
                    : isPeriod
                      ? 'bg-rose-100 font-medium text-rose-600'
                      : isToday
                        ? 'border border-rose-300 text-rose-500'
                        : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {cell.day}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar
