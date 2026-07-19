import { useEffect, useState } from 'react'
import api from '../../api/axios.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'

function ProfileForm() {
  const { user, updateUser } = useAuth()
  const { showToast } = useToast()
  const [name, setName] = useState(user?.name ?? '')
  const [mode, setMode] = useState('simple')
  const [consent, setConsent] = useState(true)
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
      showToast('변경사항이 저장되었습니다')
    } catch (err) {
      setError(err.response?.data?.detail ?? '저장에 실패했어요.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold text-gray-900">사용자 정보</p>
        <div className="mt-4 space-y-4">
          <label className="block">
            <span className="text-xs text-gray-400">이름</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border-b border-gray-100 pb-2 text-lg font-semibold text-gray-900 outline-none focus:border-rose-300"
            />
          </label>
          <label className="block">
            <span className="text-xs text-gray-400">아이디</span>
            <p className="mt-1 border-b border-gray-100 pb-2 text-lg font-semibold text-gray-400">{user?.username}</p>
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold text-gray-900">예측 모드</p>
        <p className="mt-1 text-xs text-gray-400">정밀 모드는 호르몬 수치 입력을 포함해요.</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setMode('precision')}
            className={`rounded-xl py-2 text-sm font-medium ${
              mode === 'precision' ? 'bg-rose-400 text-white' : 'border border-gray-200 text-gray-500'
            }`}
          >
            정밀 모드
          </button>
          <button
            type="button"
            onClick={() => setMode('simple')}
            className={`rounded-xl py-2 text-sm font-medium ${
              mode === 'simple' ? 'bg-rose-400 text-white' : 'border border-gray-200 text-gray-500'
            }`}
          >
            간편 모드
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div>
          <p className="text-sm font-medium text-gray-900">건강정보 수집·이용 동의</p>
          <p className="mt-1 text-xs text-gray-400">동의를 철회하면 예측 기능 사용이 제한돼요.</p>
        </div>
        <button
          type="button"
          onClick={() => setConsent((v) => !v)}
          className={`h-6 w-11 shrink-0 rounded-full transition-colors ${consent ? 'bg-rose-400' : 'bg-gray-200'}`}
        >
          <span
            className={`block h-5 w-5 rounded-full bg-white shadow transition-transform ${
              consent ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      <p className="rounded-2xl bg-gray-50 p-4 text-xs leading-relaxed text-gray-400">
        본 서비스는 진단 도구가 아닌 참고용 건강 관리 도우미입니다. 증상이 지속되면 의료진과 상담해주세요.
      </p>

      {error && <p className="text-center text-xs text-rose-500">{error}</p>}
      <button type="submit" className="w-full rounded-xl bg-rose-400 py-3 text-sm font-semibold text-white shadow-sm">
        변경사항 저장
      </button>
    </form>
  )
}

export default ProfileForm
