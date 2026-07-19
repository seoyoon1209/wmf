// 회원가입 (SFR-001)
import { useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import SignupForm from '../../components/auth/SignupForm.jsx'

function Signup() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-md px-6 pt-16">
        <button type="button" onClick={() => navigate('/')} className="text-gray-400">
          <ArrowLeft size={20} />
        </button>

        <h1 className="mt-6 text-2xl font-bold text-gray-900">회원가입</h1>
        <p className="mt-2 text-sm text-gray-400">WH와 함께 건강한 주기 관리를 시작해보세요.</p>

        <div className="mt-8">
          <SignupForm />
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          이미 계정이 있으신가요?{' '}
          <button type="button" onClick={() => navigate('/login')} className="font-semibold text-rose-400">
            로그인
          </button>
        </p>
      </div>
    </div>
  )
}

export default Signup
