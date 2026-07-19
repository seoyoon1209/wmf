import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Lock } from 'lucide-react'
import api from '../../api/axios.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'

function FieldRow({ label, value, onChange, unit }) {
  return (
    <label className="block">
      <span className="text-xs text-gray-400">{label}</span>
      <div className="mt-1 flex items-end justify-between border-b border-gray-200 pb-2">
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
  const { showToast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    api.get(`/onboard/${user.username}`).then(({ data }) => {
      if (!data) return
      setAge(data.age)
      setMenarcheAge(data.menarche_age)
      setCycleLength(data.cycle_length)
      setRegular(data.cycle_regular)
      setPainHistory(data.pain_history === 'Mild period pain')
    })
  }, [user.username])

  const handleSubmit = async () => {
    setError('')
    try {
      await api.put(`/onboard/${user.username}`, {
        age,
        menarche_age: menarcheAge,
        cycle_length: cycleLength,
        cycle_regular: regular,
        pain_history: painHistory ? 'Mild period pain' : 'No pain',
      })
      showToast('Your basic info has been saved')
      navigate('/record')
    } catch (err) {
      setError(err.response?.data?.detail ?? 'Failed to save.')
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <p className="text-sm font-semibold text-gray-900">Basic info</p>
        <div className="mt-4 space-y-4">
          <FieldRow label="Age" value={age} onChange={setAge} unit="yrs" />
          <FieldRow label="Age at first period" value={menarcheAge} onChange={setMenarcheAge} unit="yrs" />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <p className="text-sm font-semibold text-gray-900">Cycle pattern</p>
        <div className="mt-4">
          <FieldRow label="Average cycle length" value={cycleLength} onChange={setCycleLength} unit="days" />
        </div>
        <div className="mt-4">
          <p className="mb-2 text-xs text-gray-400">Cycle regularity</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRegular(true)}
              className={`rounded-xl py-2 text-sm font-medium ${
                regular ? 'bg-rose-400 text-white' : 'border border-gray-200 text-gray-500'
              }`}
            >
              Regular
            </button>
            <button
              type="button"
              onClick={() => setRegular(false)}
              className={`rounded-xl py-2 text-sm font-medium ${
                !regular ? 'bg-rose-400 text-white' : 'border border-gray-200 text-gray-500'
              }`}
            >
              Irregular
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5">
        <div>
          <p className="text-sm font-medium text-gray-900">History of period pain</p>
          <p className="mt-1 text-xs text-gray-400">Used for symptom prediction modeling</p>
        </div>
        <button
          type="button"
          onClick={() => setPainHistory((v) => !v)}
          className={`h-6 w-11 shrink-0 rounded-full transition-colors ${
            painHistory ? 'bg-rose-400' : 'bg-gray-200'
          }`}
        >
          <span
            className={`block h-5 w-5 rounded-full bg-white transition-transform ${
              painHistory ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      <div className="flex gap-3 rounded-2xl bg-white p-4 text-xs leading-relaxed text-gray-400">
        <Lock size={16} className="mt-0.5 shrink-0" />
        <p>
          All the health information you enter is encrypted end-to-end. Your data is only used to power cycle
          prediction, and you can request deletion at any time.
        </p>
      </div>

      {error && <p className="text-center text-xs text-rose-500">{error}</p>}
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full rounded-xl bg-rose-400 py-3 text-sm font-semibold text-white"
      >
        Get started
      </button>
      <p className="pb-6 text-center text-xs text-gray-400">
        By continuing, you agree to our <span className="text-rose-400 underline">privacy policy</span>.
      </p>
    </div>
  )
}

export default OnboardForm
