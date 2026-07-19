import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Lock } from 'lucide-react'
import api from '../../api/axios.js'
import { useAuth } from '../../context/AuthContext.jsx'

function FieldRow({ label, value, onChange, unit }) {
  return (
    <label className="block">
      <span className="text-xs text-gray-400">{label}</span>
      <div className="mt-1 flex items-end justify-between border-b border-gray-100 pb-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full text-2xl font-bold text-gray-900 outline-none"
        />
        <span className="pb-1 text-sm text-gray-400">{unit}</span>
      </div>
    </label>
  )
}

function OnboardForm() {
  const [age, setAge] = useState(25)
  const [menarcheAge, setMenarcheAge] = useState(13)
  const [cycleLength, setCycleLength] = useState(28)
  const [regular, setRegular] = useState(true)
  const [painHistory, setPainHistory] = useState(false)
  const [error, setError] = useState('')
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setError('')
    try {
      await api.put(`/onboard/${user.username}`, {
        age,
        menarche_age: menarcheAge,
        cycle_length: cycleLength,
        cycle_regular: regular,
        pain_history: painHistory ? '경미한 생리통 있음' : '통증 없음',
      })
      navigate('/record')
    } catch (err) {
      setError(err.response?.data?.detail ?? '저장에 실패했어요.')
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold text-gray-900">기본 신체 정보</p>
        <div className="mt-4 space-y-4">
          <FieldRow label="나이" value={age} onChange={setAge} unit="세" />
          <FieldRow label="초경 연령" value={menarcheAge} onChange={setMenarcheAge} unit="세" />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold text-gray-900">주기 패턴</p>
        <div className="mt-4">
          <FieldRow label="평균 주기 길이" value={cycleLength} onChange={setCycleLength} unit="일" />
        </div>
        <div className="mt-4">
          <p className="mb-2 text-xs text-gray-400">주기 규칙성</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRegular(true)}
              className={`rounded-xl py-2 text-sm font-medium ${
                regular ? 'bg-rose-400 text-white' : 'border border-gray-200 text-gray-500'
              }`}
            >
              규칙적
            </button>
            <button
              type="button"
              onClick={() => setRegular(false)}
              className={`rounded-xl py-2 text-sm font-medium ${
                !regular ? 'bg-rose-400 text-white' : 'border border-gray-200 text-gray-500'
              }`}
            >
              불규칙적
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div>
          <p className="text-sm font-medium text-gray-900">과거 생리통 경험 여부</p>
          <p className="mt-1 text-xs text-gray-400">증상 예측 모델링에 활용됩니다</p>
        </div>
        <button
          type="button"
          onClick={() => setPainHistory((v) => !v)}
          className={`h-6 w-11 shrink-0 rounded-full transition-colors ${
            painHistory ? 'bg-rose-400' : 'bg-gray-200'
          }`}
        >
          <span
            className={`block h-5 w-5 rounded-full bg-white shadow transition-transform ${
              painHistory ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      <div className="flex gap-3 rounded-2xl bg-gray-50 p-4 text-xs leading-relaxed text-gray-400">
        <Lock size={16} className="mt-0.5 shrink-0" />
        <p>
          입력하신 모든 건강 정보는 종단간 암호화되어 보호됩니다. 귀하의 데이터는 생리 주기 예측 기능을 수행하는
          목적 이외에는 사용되지 않으며, 언제든지 삭제를 요청하실 수 있습니다.
        </p>
      </div>

      {error && <p className="text-center text-xs text-rose-500">{error}</p>}
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full rounded-xl bg-rose-400 py-3 text-sm font-semibold text-white shadow-sm"
      >
        시작하기
      </button>
      <p className="pb-6 text-center text-xs text-gray-400">
        계속 진행함으로써 <span className="text-rose-400 underline">개인정보 처리방침</span>에 동의하게 됩니다.
      </p>
    </div>
  )
}

export default OnboardForm
