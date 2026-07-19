// 온보딩 - 기초정보 입력 (SFR-002)
import { ArrowLeft } from 'lucide-react'
import OnboardForm from '../../components/onboard/OnboardForm.jsx'

function Onboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-md px-5 pt-6">
        <div className="flex items-center justify-between">
          <button type="button" className="text-gray-400">
            <ArrowLeft size={20} />
          </button>
          <div className="flex gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-gray-200" />
            <span className="h-1.5 w-1.5 rounded-full bg-gray-200" />
          </div>
        </div>

        <h1 className="mt-6 text-2xl font-bold text-gray-900">건강 정보 설정</h1>
        <p className="mt-2 text-sm leading-relaxed text-gray-400">
          보다 정확한 생리 주기 예측과 건강 관리를 위해 기본 정보를 입력해 주세요.
        </p>

        <div className="mt-6">
          <OnboardForm />
        </div>
      </div>
    </div>
  )
}

export default Onboard
