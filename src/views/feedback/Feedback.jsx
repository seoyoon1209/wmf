// Actual outcome feedback / personalization (SFR-012)
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
      setError(err.response?.data?.detail ?? 'Failed to submit.')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-md px-5 pt-6">
        <button type="button" onClick={() => navigate(-1)} className="text-gray-400">
          <ArrowLeft size={20} />
        </button>


        <div className="mt-6 space-y-3">
          <FeedbackQuestion label="Did you have a headache?" value={headache} onChange={setHeadache} />
          <FeedbackQuestion label="Did you have cramps?" value={stomachache} onChange={setStomachache} />
        </div>

        {error && <p className="mt-4 text-center text-xs text-rose-500">{error}</p>}
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-6 w-full rounded-xl bg-rose-400 py-3 text-sm font-semibold text-white"
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default Feedback
