import { useEffect, useState } from 'react'
import api from '../../api/axios.js'
import { useAuth } from '../../context/AuthContext.jsx'

function ProfileForm() {
  const { user, updateUser } = useAuth()
  const [name, setName] = useState(user?.name ?? '')
  const [mode, setMode] = useState('simple')
  const [consent, setConsent] = useState(true)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get(`/settings/${user.username}`).then(({ data }) => {
      setMode(data.mode)
      setConsent(data.consent)
    })
  }, [user.username])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { data } = await api.put(`/auth/${user.username}`, { name })
      updateUser(data)
      await api.put(`/settings/${user.username}/mode`, { mode })
      await api.put(`/settings/${user.username}/consent`, { consent })
      setSaved(true)
      setTimeout(() => setSaved(false), 1500)
    } catch (err) {
      setError(err.response?.data?.detail ?? 'Failed to save.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <p className="text-sm font-semibold text-gray-900">User info</p>
        <div className="mt-4 space-y-4">
          <label className="block">
            <span className="text-xs text-gray-400">Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border-b border-gray-200 pb-2 text-lg font-semibold text-gray-900 outline-none focus:border-rose-300"
            />
          </label>
          <label className="block">
            <span className="text-xs text-gray-400">Username</span>
            <p className="mt-1 border-b border-gray-200 pb-2 text-lg font-semibold text-gray-400">{user?.username}</p>
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <p className="text-sm font-semibold text-gray-900">Prediction mode</p>
        <p className="mt-1 text-xs text-gray-400">Precision mode includes hormone level input.</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setMode('precision')}
            className={`rounded-xl py-2 text-sm font-medium ${
              mode === 'precision' ? 'bg-rose-400 text-white' : 'border border-gray-200 text-gray-500'
            }`}
          >
            Precision
          </button>
          <button
            type="button"
            onClick={() => setMode('simple')}
            className={`rounded-xl py-2 text-sm font-medium ${
              mode === 'simple' ? 'bg-rose-400 text-white' : 'border border-gray-200 text-gray-500'
            }`}
          >
            Simple
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-5">
        <div>
          <p className="text-sm font-medium text-gray-900">Health data consent</p>
          <p className="mt-1 text-xs text-gray-400">Withdrawing consent limits prediction features.</p>
        </div>
        <button
          type="button"
          onClick={() => setConsent((v) => !v)}
          className={`h-6 w-11 shrink-0 rounded-full transition-colors ${consent ? 'bg-rose-400' : 'bg-gray-200'}`}
        >
          <span
            className={`block h-5 w-5 rounded-full bg-white transition-transform ${
              consent ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      <p className="rounded-2xl bg-white p-4 text-xs leading-relaxed text-gray-400">
        This service is a wellness helper for reference only, not a diagnostic tool. Please consult a doctor if
        symptoms persist.
      </p>

      {error && <p className="text-center text-xs text-rose-500">{error}</p>}
      <button type="submit" className="w-full rounded-xl bg-rose-400 py-3 text-sm font-semibold text-white">
        {saved ? 'Saved' : 'Save changes'}
      </button>
    </form>
  )
}

export default ProfileForm
