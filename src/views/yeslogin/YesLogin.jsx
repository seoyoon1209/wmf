// Main screen when logged in
import { useNavigate } from 'react-router'
import { NotebookPen, Sparkles, Clock } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import Layout from '../../components/common/Layout.jsx'

const QUICK_LINKS = [
  { to: '/record', icon: NotebookPen, label: 'Period tracking', desc: "Log today's status" },
  { to: '/predict', icon: Sparkles, label: 'Prediction & analysis', desc: 'Check your upcoming cycle' },
  { to: '/history', icon: Clock, label: 'History', desc: 'Browse past records' },
]

function YesLogin() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="px-5 pt-6">

        <div className="mt-6 space-y-3">
          {QUICK_LINKS.map(({ to, icon: Icon, label, desc }) => (
            <button
              key={to}
              type="button"
              onClick={() => navigate(to)}
              className="flex w-full items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 text-left"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-500">
                <Icon size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default YesLogin
