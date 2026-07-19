import { useEffect, useState } from 'react'
import api from '../../api/axios.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { useToast } from '../../context/ToastContext.jsx'
import { todayStr } from '../../utils/date.js'

function HormoneField({ label, unit, value, onChange }) {
  return (
    <label className="block">
      <span className="text-xs text-gray-400">{label}</span>
      <div className="mt-1 flex items-end justify-between border-b border-gray-100 pb-2">
        <input
          type="number"
          step="0.1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full text-lg font-semibold text-gray-900 outline-none"
        />
        <span className="pb-1 text-xs text-gray-400">{unit}</span>
      </div>
    </label>
  )
}

function HormoneForm() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [lh, setLh] = useState('')
  const [e3g, setE3g] = useState('')
  const [pdg, setPdg] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    api.get(`/diaries/${user.username}`).then(({ data }) => {
      const latest = data.find((d) => d.lh != null || d.e3g != null || d.pdg != null)
      if (latest) {
        setLh(latest.lh ?? '')
        setE3g(latest.e3g ?? '')
        setPdg(latest.pdg ?? '')
      }
    })
  }, [user.username])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.put(`/diaries/${user.username}/hormone`, {
        entry_date: todayStr(),
        lh: lh === '' ? null : Number(lh),
        e3g: e3g === '' ? null : Number(e3g),
        pdg: pdg === '' ? null : Number(pdg),
      })
      showToast('호르몬 수치가 저장되었습니다')
    } catch (err) {
      setError(err.response?.data?.detail ?? '저장에 실패했어요.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-gray-900">호르몬 자가보고</p>
      <p className="mt-1 text-xs text-gray-400">정밀 모드 예측에 활용돼요. 검사 결과가 없으면 비워두셔도 돼요.</p>
      <div className="mt-4 space-y-4">
        <HormoneField label="LH" unit="mIU/mL" value={lh} onChange={setLh} />
        <HormoneField label="에스트로겐 (E3G)" unit="ng/mL" value={e3g} onChange={setE3g} />
        <HormoneField label="프로게스테론 (PdG)" unit="µg/mL" value={pdg} onChange={setPdg} />
      </div>

      {error && <p className="mt-3 text-center text-xs text-rose-500">{error}</p>}
      <button
        type="submit"
        className="mt-4 w-full rounded-xl bg-rose-400 py-3 text-sm font-semibold text-white shadow-sm"
      >
        호르몬 수치 저장
      </button>
    </form>
  )
}

export default HormoneForm
