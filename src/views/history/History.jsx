// 이력 조회/관리 (SFR-013)
import { useEffect, useState } from 'react'
import { Droplet, NotebookText, ChevronRight } from 'lucide-react'
import Layout from '../../components/common/Layout.jsx'
import api from '../../api/axios.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { parseLocalDate } from '../../utils/date.js'

function formatDate(d) {
  const date = parseLocalDate(d)
  return `${date.getMonth() + 1}월 ${date.getDate()}일`
}

const NOTABLE_SYMPTOMS = [
  ['headache', '두통'],
  ['stomachache', '복통'],
  ['sore_breasts', '유방 압통'],
  ['mood_swing', '기분 변화'],
  ['fatigue', '피로'],
  ['bloating', '복부 팽만'],
]

function symptomSummary(diary) {
  const parts = NOTABLE_SYMPTOMS.filter(([key]) => diary[key] > 1).map(([, label]) => label)
  return parts.length ? parts.join(' · ') : '특이 증상 없음'
}

function History() {
  const { user } = useAuth()
  const [items, setItems] = useState([])

  useEffect(() => {
    api.get(`/history/${user.username}`).then(({ data }) => {
      const records = data.records.map((r) => ({
        key: `record-${r.record_id}`,
        type: 'record',
        title: r.end_date ? `${formatDate(r.start_date)} - ${formatDate(r.end_date)}` : `${formatDate(r.start_date)}~`,
        detail: r.end_date ? '월경 기록' : '진행 중',
      }))
      const diaries = data.diaries.map((d) => ({
        key: `diary-${d.diary_id}`,
        type: 'diary',
        title: `${formatDate(d.entry_date)} 증상 기록`,
        detail: symptomSummary(d),
      }))
      setItems([...records, ...diaries])
    })
  }, [user.username])

  return (
    <Layout>
      <div className="px-5 pt-6">
        <h1 className="text-2xl font-bold text-gray-900">이력 조회</h1>
        <p className="mt-1 text-sm text-gray-400">지난 월경 기록과 증상 기록을 한눈에 확인하세요.</p>

        <ul className="mt-5 space-y-2">
          {items.map((item) => {
            const Icon = item.type === 'record' ? Droplet : NotebookText
            const tone = item.type === 'record' ? 'bg-rose-50 text-rose-500' : 'bg-sky-50 text-sky-500'
            return (
              <li
                key={item.key}
                className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full ${tone}`}>
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.detail}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-300" />
              </li>
            )
          })}
        </ul>
      </div>
    </Layout>
  )
}

export default History
