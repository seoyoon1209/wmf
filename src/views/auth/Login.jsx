// 로그인 (SFR-001)
import { useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import LoginForm from '../../components/auth/LoginForm.jsx'

function Login() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-md px-6 pt-16">
        <button type="button" onClick={() => navigate('/')} className="text-gray-400">
          <ArrowLeft size={20} />
        </button>

        <h1 className="mt-6 text-2xl font-bold text-gray-900">로그인</h1>
        <p className="mt-2 text-sm text-gray-400">다시 만나서 반가워요.</p>

        <div className="mt-8">
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          계정이 없으신가요?{' '}
          <button type="button" onClick={() => navigate('/signup')} className="font-semibold text-rose-400">
            회원가입
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login
