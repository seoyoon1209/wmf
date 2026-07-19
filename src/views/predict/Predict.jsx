// 예측 결과/근거/대비 가이드 (SFR-008~011)
import { useEffect, useState } from 'react'
import { Heart, AlertTriangle, Activity, Sparkles } from 'lucide-react'
import Layout from '../../components/common/Layout.jsx'
import RiskCard from '../../components/predict/RiskCard.jsx'
import FactorRow from '../../components/predict/FactorRow.jsx'
import api from '../../api/axios.js'
import { useAuth } from '../../context/AuthContext.jsx'

const RISK_PERCENT = { 낮음: 25, 보통: 50, 높음: 75, 매우높음: 90 }
const HIGH_RISK = new Set(['높음', '매우높음'])
const PHASE_KO = { Menstrual: '월경기', Follicular: '난포기', Fertility: '가임기', Luteal: '황체기' }

function Predict() {
  const { user } = useAuth()
  const [prediction, setPrediction] = useState(null)
  const [phase, setPhase] = useState(null)
  const [guide, setGuide] = useState(null)
  const [guideError, setGuideError] = useState('')

  useEffect(() => {
    api.get(`/predictions/${user.username}/phase`).then(({ data }) => setPhase(data))
    api.get(`/predictions/${user.username}`).then(({ data }) => {
      setPrediction(data)
      setGuide(null)
      setGuideError('')
      api
        .get(`/predictions/${user.username}/guide`)
        .then(({ data: g }) => setGuide(g.guide))
        .catch((err) => setGuideError(err.response?.data?.detail ?? 'AI 가이드를 불러오지 못했어요.'))
    })
  }, [user.username])

  const factors = prediction?.factors ?? []
  const maxAbs = Math.max(...factors.map((f) => Math.abs(f.value)), 0.01)

  return (
    <Layout>
      <div className="px-5 pt-6">
        <h1 className="text-2xl font-bold text-gray-900">예측 및 분석</h1>
        <p className="mt-1 text-sm text-gray-400">데이터 기반 건강 예측 보고서</p>

        <div className="mt-5 rounded-2xl bg-rose-400 p-5 text-white shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-rose-100">다음 주기 예측</span>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
              {PHASE_KO[phase?.phase] ?? '분석 중'}
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold">
            {phase?.days_to_period != null ? `${phase.days_to_period}일 후` : '계산 중'}
          </p>
          <p className="mt-1 text-sm text-rose-100">
            {phase?.days_to_period != null ? '생리 시작 예정' : '월경 기록을 남기면 예측이 시작돼요'}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-1.5 flex-1 rounded-full bg-white/30">
              <div className="h-1.5 w-4/5 rounded-full bg-white" />
            </div>
            <Heart size={18} className="shrink-0 fill-white" />
          </div>
        </div>

        <h2 className="mt-6 text-sm font-semibold text-gray-900">위험도 분석</h2>
        <div className="mt-2 flex gap-3">
          <RiskCard
            icon={AlertTriangle}
            label="두통 위험도"
            level={prediction?.headache_risk ?? '-'}
            percent={RISK_PERCENT[prediction?.headache_risk] ?? 0}
            tone={HIGH_RISK.has(prediction?.headache_risk) ? 'high' : 'low'}
          />
          <RiskCard
            icon={Activity}
            label="복통 위험도"
            level={prediction?.stomachache_risk ?? '-'}
            percent={RISK_PERCENT[prediction?.stomachache_risk] ?? 0}
            tone={HIGH_RISK.has(prediction?.stomachache_risk) ? 'high' : 'low'}
          />
        </div>

        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">예측 근거</h2>
            <span className="text-xs text-gray-400">모델 기여도 분석</span>
          </div>
          <div className="mt-2 divide-y divide-gray-50">
            {factors.map((f) => (
              <FactorRow key={f.label} {...f} maxAbs={maxAbs} />
            ))}
          </div>
          {prediction?.confidence != null && (
            <p className="mt-2 text-xs leading-relaxed text-gray-400">
              모델 확신도 {Math.round(prediction.confidence * 100)}% · 기록이 쌓일수록 정확해져요.
            </p>
          )}
        </div>

        <div className="mb-6 mt-6 rounded-2xl bg-rose-50 p-4">
          <div className="flex gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-rose-400">
              <Sparkles size={16} />
            </span>
            <p className="text-sm leading-relaxed text-gray-700">
              {guideError ? guideError : (guide ?? 'AI가 오늘의 가이드를 작성하고 있어요...')}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Predict
