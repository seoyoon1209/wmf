// 증상/생활/호르몬 자가보고 (SFR-004~006)
// 각 항목은 data.csv의 *_ord 피처(0~5 척도)와 1:1 대응
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Brain, Flame, Activity, Smile, BatteryLow, Utensils, Soup, Wind, Cookie, Dumbbell, Moon, Gauge, Star } from 'lucide-react'
import Layout from '../../components/common/Layout.jsx'
import SymptomSlider from '../../components/diary/SymptomSlider.jsx'
import api from '../../api/axios.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'
import { todayStr } from '../../utils/date.js'

function Diary() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [headache, setHeadache] = useState(0)
  const [stomachache, setStomachache] = useState(0)
  const [soreBreasts, setSoreBreasts] = useState(0)
  const [moodSwing, setMoodSwing] = useState(0)
  const [fatigue, setFatigue] = useState(0)
  const [appetite, setAppetite] = useState(0)
  const [indigestion, setIndigestion] = useState(0)
  const [bloating, setBloating] = useState(0)
  const [foodCravings, setFoodCravings] = useState(0)
  const [exerciseLevel, setExerciseLevel] = useState(0)
  const [sleep, setSleep] = useState(3)
  const [stress, setStress] = useState(0)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')
    try {
      await api.post(`/diaries/${user.username}`, {
        entry_date: todayStr(),
        headache,
        stomachache,
        sore_breasts: soreBreasts,
        mood_swing: moodSwing,
        fatigue,
        appetite,
        indigestion,
        bloating,
        food_cravings: foodCravings,
        exercise_level: exerciseLevel,
        sleep_quality: sleep,
        stress,
      })
      showToast('오늘의 기록이 저장되었습니다')
      navigate('/history')
    } catch (err) {
      setError(err.response?.data?.detail ?? '저장에 실패했어요.')
    }
  }

  return (
    <Layout>
      <div className="px-5 pt-6">
        <h1 className="text-2xl font-bold text-gray-900">오늘의 증상</h1>
        <p className="mt-1 text-sm text-gray-400">각 항목을 0(없음)~5(심함)로 남겨주세요.</p>

        <div className="mt-5 space-y-2">
          <SymptomSlider icon={Brain} label="두통" value={headache} onChange={setHeadache} />
          <SymptomSlider icon={Flame} label="복통" value={stomachache} onChange={setStomachache} />
          <SymptomSlider icon={Activity} label="유방 압통" value={soreBreasts} onChange={setSoreBreasts} />
          <SymptomSlider icon={Smile} label="기분 변화" value={moodSwing} onChange={setMoodSwing} />
          <SymptomSlider icon={BatteryLow} label="피로" value={fatigue} onChange={setFatigue} />
        </div>

        <h2 className="mt-6 text-sm font-semibold text-gray-900">생활 기록</h2>
        <div className="mt-2 space-y-2">
          <SymptomSlider icon={Utensils} label="식욕 변화" value={appetite} onChange={setAppetite} />
          <SymptomSlider icon={Soup} label="소화불량" value={indigestion} onChange={setIndigestion} />
          <SymptomSlider icon={Wind} label="복부 팽만" value={bloating} onChange={setBloating} />
          <SymptomSlider icon={Cookie} label="음식 갈망" value={foodCravings} onChange={setFoodCravings} />
          <SymptomSlider icon={Dumbbell} label="운동량" value={exerciseLevel} onChange={setExerciseLevel} />

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

          <SymptomSlider icon={Gauge} label="스트레스 수준" value={stress} onChange={setStress} />
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
