// Sign up (SFR-001)
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


        <div className="mt-8">
          <SignupForm />
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Already have an account?{' '}
          <button type="button" onClick={() => navigate('/login')} className="font-semibold text-rose-400">
            Log in
          </button>
        </p>
      </div>
    </div>
  )
}

export default Signup
