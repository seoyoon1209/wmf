// Symptom/lifestyle/hormone self-report (SFR-004~006)
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Brain, Flame, Smile, BatteryLow, Activity, Plus, Moon, Gauge, Star } from 'lucide-react'
import Layout from '../../components/common/Layout.jsx'
import SymptomButton from '../../components/diary/SymptomButton.jsx'
import api from '../../api/axios.js'
import { useAuth } from '../../context/AuthContext.jsx'

const SYMPTOMS = [
  { key: 'headache', label: 'Headache', icon: Brain },
  { key: 'stomachache', label: 'Cramps', icon: Flame },
  { key: 'mood', label: 'Mood', icon: Smile },
  { key: 'fatigue', label: 'Fatigue', icon: BatteryLow },
  { key: 'tenderness', label: 'Sore breasts', icon: Activity },
  { key: 'add', label: 'Add', icon: Plus },
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
        mood: selected.includes('mood') ? 'low' : null,
        fatigue: selected.includes('fatigue') ? painLevel : null,
        sleep_quality: sleep,
        stress,
      })
      navigate('/history')
    } catch (err) {
      setError(err.response?.data?.detail ?? 'Failed to save.')
    }
  }

  return (
    <Layout>
      <div className="px-5 pt-6">

        <div className="mt-5 grid grid-cols-3 gap-3">
          {SYMPTOMS.map(({ key, label, icon }) => (
            <SymptomButton key={key} icon={icon} label={label} active={selected.includes(key)} onClick={() => toggle(key)} />
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-900">Pain level</span>
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
            <span>None</span>
            <span>Severe</span>
          </div>
        </div>

        <h2 className="mt-6 text-sm font-semibold text-gray-900">Lifestyle log</h2>
        <div className="mt-2 space-y-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <span className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <Moon size={16} className="text-gray-400" />
              Sleep quality
            </span>
            <div className="mt-3 flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button type="button" key={n} onClick={() => setSleep(n)}>
                  <Star size={22} className={n <= sleep ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 font-medium text-gray-900">
                <Gauge size={16} className="text-gray-400" />
                Stress level
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
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
        </div>

        {error && <p className="mt-4 text-center text-xs text-rose-500">{error}</p>}
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-6 w-full rounded-xl bg-rose-400 py-3 text-sm font-semibold text-white"
        >
          Log entry
        </button>
        <p className="mb-6 mt-2 text-center text-xs text-gray-400">
          This data is for wellness reference only and is not a diagnostic tool.
        </p>
      </div>
    </Layout>
  )
}

export default Diary
