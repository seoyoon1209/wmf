// 월경 기록 (SFR-003)
import { useEffect, useState } from 'react'
import { Repeat, Droplet, Lightbulb } from 'lucide-react'
import Layout from '../../components/common/Layout.jsx'
import Calendar from '../../components/record/Calendar.jsx'
import SummaryCard from '../../components/record/SummaryCard.jsx'
import HistoryItem from '../../components/record/HistoryItem.jsx'
import api from '../../api/axios.js'
import { useAuth } from '../../context/AuthContext.jsx'

function formatRange(startDate, endDate) {
  const format = (d) => {
    const date = new Date(d)
    return `${date.getMonth() + 1}월 ${date.getDate()}일`
  }
  return endDate ? `${format(startDate)} - ${format(endDate)}` : `${format(startDate)} ~ 진행중`
}

function daysBetween(startDate, endDate) {
  if (!endDate) return null
  const ms = new Date(endDate) - new Date(startDate)
  return Math.round(ms / (1000 * 60 * 60 * 24)) + 1
}

function Record() {
  const { user } = useAuth()
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
          (new Date(completed[0].start_date) - new Date(completed[completed.length - 1].start_date)) /
            (1000 * 60 * 60 * 24 * (completed.length - 1)),
        )
      : null

  const handleStart = async () => {
    const today = new Date().toISOString().slice(0, 10)
    await api.post(`/records/${user.username}`, { start_date: today })
    loadRecords()
  }

  const handleEnd = async () => {
    const today = new Date().toISOString().slice(0, 10)
    try {
      await api.patch(`/records/${user.username}/latest`, { end_date: today })
      loadRecords()
    } catch {
      // 종료할 진행 중인 기록이 없는 경우 조용히 무시
    }
  }

  return (
    <Layout>
      <div className="px-5 pt-6">
        <h1 className="text-2xl font-bold text-gray-900">월경 기록</h1>
        <p className="mt-1 text-sm text-gray-400">오늘의 상태를 기록하고 주기를 확인하세요.</p>

        <div className="mt-5">
          <Calendar />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleStart}
            className="rounded-xl bg-rose-400 py-3 text-sm font-semibold text-white shadow-sm"
          >
            시작일 입력
          </button>
          <button
            type="button"
            onClick={handleEnd}
            className="rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-500"
          >
            종료일 입력
          </button>
        </div>

        <h2 className="mt-6 text-sm font-semibold text-gray-900">최근 요약</h2>
        <div className="mt-2 flex gap-3">
          <SummaryCard icon={Repeat} label="평균 주기" value={avgCycle ? `${avgCycle}일` : '- '} />
          <SummaryCard icon={Droplet} label="평균 기간" value={avgDuration ? `${avgDuration}일` : '-'} tone="blue" />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">지난 기록</h2>
          <button type="button" className="text-xs text-rose-400">
            전체 보기
          </button>
        </div>
        <ul className="mt-2 space-y-2">
          {records.map((r) => {
            const days = daysBetween(r.start_date, r.end_date)
            return (
              <HistoryItem
                key={r.record_id}
                range={formatRange(r.start_date, r.end_date)}
                detail={days ? `${days}일 동안` : '진행 중'}
              />
            )
          })}
        </ul>

        <div className="mb-6 mt-6 flex gap-3 rounded-2xl bg-rose-50 p-4">
          <Lightbulb size={18} className="mt-0.5 shrink-0 text-rose-400" />
          <div>
            <p className="text-sm font-semibold text-rose-500">건강 팁</p>
            <p className="mt-1 text-xs leading-relaxed text-rose-400">
              충분한 수분 섭취와 규칙적인 스트레칭은 생리 전 증후군 완화에 큰 도움이 됩니다. 오늘 하루도 당신의
              몸을 아껴주세요.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Record
