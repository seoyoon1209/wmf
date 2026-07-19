// 실제 결과 피드백/개인화 (SFR-012)
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import FeedbackQuestion from '../../components/feedback/FeedbackQuestion.jsx'
import api from '../../api/axios.js'
import { useAuth } from '../../context/AuthContext.jsx'

function Feedback() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [headache, setHeadache] = useState(null)
  const [stomachache, setStomachache] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')
    try {
      await api.post('/feedback', {
        username: user.username,
        headache_actual: Boolean(headache),
        stomachache_actual: Boolean(stomachache),
      })
      navigate('/history')
    } catch (err) {
      setError(err.response?.data?.detail ?? '제출에 실패했어요.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-md px-5 pt-6">
        <button type="button" onClick={() => navigate(-1)} className="text-gray-400">
          <ArrowLeft size={20} />
        </button>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">예측 결과가 맞았나요?</h1>
        <p className="mt-2 text-sm text-gray-400">
          실제로 겪은 증상을 알려주시면 다음 예측이 더 정확해져요.
        </p>

        <div className="mt-6 space-y-3">
          <FeedbackQuestion label="두통이 있었나요?" value={headache} onChange={setHeadache} />
          <FeedbackQuestion label="복통이 있었나요?" value={stomachache} onChange={setStomachache} />
        </div>

        {error && <p className="mt-4 text-center text-xs text-rose-500">{error}</p>}
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-6 w-full rounded-xl bg-rose-400 py-3 text-sm font-semibold text-white shadow-sm"
        >
          제출하기
        </button>
      </div>
    </div>
  )
}

export default Feedback
