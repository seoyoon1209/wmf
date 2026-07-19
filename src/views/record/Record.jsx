// Period tracking (SFR-003)
import { useEffect, useState } from 'react'
import { Repeat, Droplet, Lightbulb } from 'lucide-react'
import Layout from '../../components/common/Layout.jsx'
import Calendar from '../../components/record/Calendar.jsx'
import SummaryCard from '../../components/record/SummaryCard.jsx'
import HistoryItem from '../../components/record/HistoryItem.jsx'
import api from '../../api/axios.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'
import { parseLocalDate } from '../../utils/date.js'

function toDateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function formatRange(startDate, endDate) {
  const format = (d) => {
    const date = parseLocalDate(d)
    return `${date.toLocaleString('en-US', { month: 'short' })} ${date.getDate()}`
  }
  return endDate ? `${format(startDate)} - ${format(endDate)}` : `${format(startDate)} ~ ongoing`
}

function daysBetween(startDate, endDate) {
  if (!endDate) return null
  const ms = parseLocalDate(endDate) - parseLocalDate(startDate)
  return Math.round(ms / (1000 * 60 * 60 * 24)) + 1
}

function buildPeriodDates(records) {
  const dates = new Set()
  records.forEach((r) => {
    const start = parseLocalDate(r.start_date)
    const end = r.end_date ? parseLocalDate(r.end_date) : new Date()
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.add(toDateStr(d))
    }
  })
  return dates
}

function Record() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState(toDateStr(today))
  const [records, setRecords] = useState([])

  const loadRecords = () => {
    api.get(`/records/${user.username}`).then(({ data }) => setRecords(data))
  }

  useEffect(() => {
    loadRecords()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const completed = records.filter((r) => r.end_date)
  const avgDuration = completed.length
    ? Math.round(completed.reduce((sum, r) => sum + daysBetween(r.start_date, r.end_date), 0) / completed.length)
    : null
  const avgCycle =
    completed.length > 1
      ? Math.round(
          (parseLocalDate(completed[0].start_date) - parseLocalDate(completed[completed.length - 1].start_date)) /
            (1000 * 60 * 60 * 24 * (completed.length - 1)),
        )
      : null

  const handlePrevMonth = () => {
    const next = new Date(viewYear, viewMonth - 1, 1)
    setViewYear(next.getFullYear())
    setViewMonth(next.getMonth())
  }

  const handleNextMonth = () => {
    const next = new Date(viewYear, viewMonth + 1, 1)
    setViewYear(next.getFullYear())
    setViewMonth(next.getMonth())
  }

  const handleStart = async () => {
    await api.post(`/records/${user.username}`, { start_date: selectedDate })
    showToast('Start date saved')
    loadRecords()
  }

  const handleEnd = async () => {
    try {
      await api.patch(`/records/${user.username}/latest`, { end_date: selectedDate })
      showToast('End date saved')
      loadRecords()
    } catch {
      showToast('No ongoing record to end')
    }
  }

  const handleDelete = async (recordId) => {
    if (!window.confirm('Delete this record?')) return
    await api.delete(`/records/${user.username}/${recordId}`)
    showToast('Record deleted')
    loadRecords()
  }

  return (
    <Layout>
      <div className="px-5 pt-6">

        <div className="mt-5">
          <Calendar
            year={viewYear}
            month={viewMonth}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            periodDates={buildPeriodDates(records)}
            todayStr={toDateStr(today)}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleStart}
            className="rounded-xl bg-rose-400 py-3 text-sm font-semibold text-white"
          >
            Log start date
          </button>
          <button
            type="button"
            onClick={handleEnd}
            className="rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-500"
          >
            Log end date
          </button>
        </div>

        <h2 className="mt-6 text-sm font-semibold text-gray-900">Recent summary</h2>
        <div className="mt-2 flex gap-3">
          <SummaryCard icon={Repeat} label="Avg. cycle" value={avgCycle ? `${avgCycle}d` : '- '} />
          <SummaryCard icon={Droplet} label="Avg. length" value={avgDuration ? `${avgDuration}d` : '-'} tone="blue" />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Past records</h2>
        </div>
        <ul className="mt-2 space-y-2">
          {records.map((r) => {
            const days = daysBetween(r.start_date, r.end_date)
            return (
              <HistoryItem
                key={r.record_id}
                range={formatRange(r.start_date, r.end_date)}
                detail={days ? `${days} days` : 'Ongoing'}
                onDelete={() => handleDelete(r.record_id)}
              />
            )
          })}
        </ul>

        <div className="mb-6 mt-6 flex gap-3 rounded-2xl bg-rose-50 p-4">
          <Lightbulb size={18} className="mt-0.5 shrink-0 text-rose-400" />
          <div>
            <p className="text-sm font-semibold text-rose-500">Health tip</p>
            <p className="mt-1 text-xs leading-relaxed text-rose-400">
              Staying hydrated and stretching regularly can go a long way toward easing PMS. Take care of yourself
              today too.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Record
