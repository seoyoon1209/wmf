// Prediction result/rationale/guide (SFR-008~011)
import { useEffect, useState } from 'react'
import { Heart, AlertTriangle, Activity, Sparkles, RefreshCw } from 'lucide-react'
import Layout from '../../components/common/Layout.jsx'
import RiskCard from '../../components/predict/RiskCard.jsx'
import FactorRow from '../../components/predict/FactorRow.jsx'
import api from '../../api/axios.js'
import { useAuth } from '../../context/AuthContext.jsx'

const RISK_PERCENT = { Low: 25, Moderate: 50, High: 75, 'Very High': 90 }
const HIGH_RISK = new Set(['High', 'Very High'])
const PHASE_LABEL = { Menstrual: 'Menstrual', Follicular: 'Follicular', Fertility: 'Fertile window', Luteal: 'Luteal' }

function Predict() {
  const { user } = useAuth()
  const [prediction, setPrediction] = useState(null)
  const [phase, setPhase] = useState(null)
  const [guide, setGuide] = useState(null)
  const [guideError, setGuideError] = useState('')
  const [guideLoading, setGuideLoading] = useState(false)

  const loadGuide = () => {
    setGuideLoading(true)
    setGuideError('')
    api
      .get(`/predictions/${user.username}/guide`)
      .then(({ data: g }) => setGuide(g.guide))
      .catch((err) => setGuideError(err.response?.data?.detail ?? 'Could not load the AI guide.'))
      .finally(() => setGuideLoading(false))
  }

  useEffect(() => {
    api.get(`/predictions/${user.username}/phase`).then(({ data }) => setPhase(data))
    api.get(`/predictions/${user.username}`).then(({ data }) => {
      setPrediction(data)
      loadGuide()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.username])

  const factors = prediction?.factors ?? []
  const maxAbs = Math.max(...factors.map((f) => Math.abs(f.value)), 0.01)

  return (
    <Layout>
      <div className="px-5 pt-6">

        <div className="mt-5 rounded-2xl bg-rose-400 p-5 text-white">
          <div className="flex items-center justify-between">
            <span className="text-sm text-rose-100">Next cycle prediction</span>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
              {PHASE_LABEL[phase?.phase] ?? 'Analyzing'}
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold">
            {phase?.days_to_period != null ? `${phase.days_to_period} days` : 'Calculating'}
          </p>
          <p className="mt-1 text-sm text-rose-100">
            {phase?.days_to_period != null ? 'until your next period' : 'Log a period to start predicting'}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-1.5 flex-1 rounded-full bg-white/30">
              <div className="h-1.5 w-4/5 rounded-full bg-white" />
            </div>
            <Heart size={18} className="shrink-0 fill-white" />
          </div>
        </div>

        <h2 className="mt-6 text-sm font-semibold text-gray-900">Risk analysis</h2>
        <div className="mt-2 flex gap-3">
          <RiskCard
            icon={AlertTriangle}
            label="Headache risk"
            level={prediction?.headache_risk ?? '-'}
            percent={RISK_PERCENT[prediction?.headache_risk] ?? 0}
            tone={HIGH_RISK.has(prediction?.headache_risk) ? 'high' : 'low'}
          />
          <RiskCard
            icon={Activity}
            label="Cramp risk"
            level={prediction?.stomachache_risk ?? '-'}
            percent={RISK_PERCENT[prediction?.stomachache_risk] ?? 0}
            tone={HIGH_RISK.has(prediction?.stomachache_risk) ? 'high' : 'low'}
          />
        </div>

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Why this prediction</h2>
            <span className="text-xs text-gray-400">Model contribution analysis</span>
          </div>
          <div className="mt-2 divide-y divide-gray-50">
            {factors.map((f) => (
              <FactorRow key={f.label} {...f} maxAbs={maxAbs} />
            ))}
          </div>
          {prediction?.confidence != null && (
            <p className="mt-2 text-xs leading-relaxed text-gray-400">
              Model confidence {Math.round(prediction.confidence * 100)}% · gets more accurate as you log more.
            </p>
          )}
        </div>

        <div className="mb-6 mt-6 rounded-2xl bg-rose-50 p-4">
          <div className="flex gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-rose-400">
              <Sparkles size={16} />
            </span>
            <p className="flex-1 text-sm leading-relaxed text-gray-700">
              {guideError ? guideError : (guide ?? 'AI is writing today’s guide...')}
            </p>
            <button
              type="button"
              onClick={loadGuide}
              disabled={guideLoading}
              aria-label="Refresh AI guide"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-rose-400 disabled:opacity-50"
            >
              <RefreshCw size={14} className={guideLoading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Predict
