// Onboarding - basic info input (SFR-002)
import { useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import OnboardForm from '../../components/onboard/OnboardForm.jsx'

function Onboard() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-md px-5 pt-6">
        <div className="flex items-center justify-between">
          <button type="button" onClick={() => navigate(-1)} className="text-gray-400">
            <ArrowLeft size={20} />
          </button>
          <div className="flex gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
            <span className="h-1.5 w-1.5 rounded-full bg-gray-200" />
            <span className="h-1.5 w-1.5 rounded-full bg-gray-200" />
          </div>
        </div>


        <div className="mt-6">
          <OnboardForm />
        </div>
      </div>
    </div>
  )
}

export default Onboard
