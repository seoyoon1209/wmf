// Log in (SFR-001)
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


        <div className="mt-8">
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Don&apos;t have an account?{' '}
          <button type="button" onClick={() => navigate('/signup')} className="font-semibold text-rose-400">
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login
