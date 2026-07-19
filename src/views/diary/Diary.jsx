// 증상/생활/호르몬 자가보고 (SFR-004~006)
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Brain, Flame, Smile, BatteryLow, Activity, Plus, Moon, Gauge, Star } from 'lucide-react'
import Layout from '../../components/common/Layout.jsx'
import SymptomButton from '../../components/diary/SymptomButton.jsx'
import api from '../../api/axios.js'
import { useAuth } from '../../context/AuthContext.jsx'

const SYMPTOMS = [
  { key: 'headache', label: '두통', icon: Brain },
  { key: 'stomachache', label: '복통', icon: Flame },
  { key: 'mood', label: '기분/감정', icon: Smile },
  { key: 'fatigue', label: '피로', icon: BatteryLow },
  { key: 'tenderness', label: '유방압통', icon: Activity },
  { key: 'add', label: '추가', icon: Plus },
]

function Diary() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(['headache', 'stomachache', 'mood'])
  const [painLevel, setPainLevel] = useState(3)
  const [sleep, setSleep] = useState(3)
  const [stress, setStress] = useState(5)
  const [error, setError] = useState('')

  const toggle = (key) => {
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))
  }

  const handleSubmit = async () => {
    setError('')
    const today = new Date().toISOString().slice(0, 10)
    try {
      await api.post(`/diaries/${user.username}`, {
        entry_date: today,
        headache: selected.includes('headache') ? painLevel : null,
        stomachache: selected.includes('stomachache') ? painLevel : null,
        mood: selected.includes('mood') ? '저하' : null,
        fatigue: selected.includes('fatigue') ? painLevel : null,
        sleep_quality: sleep,
        stress,
      })
      navigate('/history')
    } catch (err) {
      setError(err.response?.data?.detail ?? '저장에 실패했어요.')
    }
  }

  return (
    <Layout>
      <div className="px-5 pt-6">
        <h1 className="text-2xl font-bold text-gray-900">오늘의 증상</h1>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {SYMPTOMS.map(({ key, label, icon }) => (
            <SymptomButton key={key} icon={icon} label={label} active={selected.includes(key)} onClick={() => toggle(key)} />
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-900">통증 강도</span>
            <span className="font-semibold text-rose-500">{painLevel}</span>
          </div>
          <input
            type="range"
            min="0"
            max="5"
            value={painLevel}
            onChange={(e) => setPainLevel(Number(e.target.value))}
            className="mt-3 w-full accent-rose-400"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-400">
            <span>없음</span>
            <span>심함</span>
          </div>
        </div>

        <h2 className="mt-6 text-sm font-semibold text-gray-900">생활 기록</h2>
        <div className="mt-2 space-y-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <span className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <Moon size={16} className="text-gray-400" />
              수면의 질
            </span>
            <div className="mt-3 flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button type="button" key={n} onClick={() => setSleep(n)}>
                  <Star size={22} className={n <= sleep ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 font-medium text-gray-900">
                <Gauge size={16} className="text-gray-400" />
                스트레스 수준
              </span>
              <span className="text-gray-400">{stress}</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={stress}
              onChange={(e) => setStress(Number(e.target.value))}
              className="mt-3 w-full accent-rose-400"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-400">
              <span>낮음</span>
              <span>높음</span>
            </div>
          </div>
        </div>

        {error && <p className="mt-4 text-center text-xs text-rose-500">{error}</p>}
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-6 w-full rounded-xl bg-rose-400 py-3 text-sm font-semibold text-white shadow-sm"
        >
          기록 완료
        </button>
        <p className="mb-6 mt-2 text-center text-xs text-gray-400">
          데이터는 건강 관리를 위한 참고용이며 진단 목적이 아닙니다.
        </p>
      </div>
    </Layout>
  )
}

export default Diary
