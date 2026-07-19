import { ChevronLeft, ChevronRight } from 'lucide-react'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

const DAYS = [
  { day: 28 }, { day: 29 }, { day: 30 },
  { day: 1, current: true }, { day: 2, current: true }, { day: 3, current: true }, { day: 4, current: true },
  { day: 5, current: true }, { day: 6, current: true }, { day: 7, current: true }, { day: 8, current: true },
  { day: 9, current: true }, { day: 10, current: true }, { day: 11, current: true },
  { day: 12, current: true },
  { day: 13, current: true, period: true },
  { day: 14, current: true, period: true },
  { day: 15, current: true, period: true, today: true },
  { day: 16, current: true, period: true },
  { day: 17, current: true, period: true },
  { day: 18, current: true }, { day: 19, current: true }, { day: 20, current: true }, { day: 21, current: true },
  { day: 22, current: true }, { day: 23, current: true }, { day: 24, current: true }, { day: 25, current: true },
]

function Calendar() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <button type="button" className="text-gray-400">
          <ChevronLeft size={18} />
        </button>
        <span className="font-semibold text-gray-900">2024년 5월</span>
        <button type="button" className="text-gray-400">
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="grid grid-cols-7 text-center text-xs text-gray-400">
        {WEEKDAYS.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-y-2">
        {DAYS.map(({ day, current, period, today }, i) => (
          <div key={i} className="flex justify-center">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${
                !current
                  ? 'text-gray-300'
                  : period
                    ? 'bg-rose-200 font-medium text-rose-700'
                    : today
                      ? 'border border-rose-400 font-medium text-rose-500'
                      : 'text-gray-700'
              }`}
            >
              {day}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
