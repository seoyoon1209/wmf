// Default screen when logged out - feature intro
import { useNavigate } from 'react-router'
import { NotebookPen, Sparkles, Lock } from 'lucide-react'

const FEATURES = [
  {
    icon: NotebookPen,
    tone: 'bg-rose-50 text-rose-500',
    title: '1 minute a day',
    desc: 'A quick check-in is all it takes to track your cycle and symptoms.',
  },
  {
    icon: Sparkles,
    tone: 'bg-violet-50 text-violet-500',
    title: 'Know before it happens',
    desc: 'We predict upcoming pain risk so you have time to prepare.',
  },
  {
    icon: Lock,
    tone: 'bg-emerald-50 text-emerald-500',
    title: 'Predictions tuned to you',
    desc: 'The more you log, the more accurate it gets for you.',
  },
]

function NoLogin() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white px-6 pb-10 pt-16">
      <div className="mx-auto max-w-md">
        <h1 className="text-3xl font-bold leading-snug text-gray-900">
          A little more
          <br />
          time to understand you,
          <br />
          <span className="text-rose-500">CrampCast</span>
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-gray-400">
          The more you log, the more accurate the prediction gets.
          <br />
          Start with today&apos;s condition.
        </p>

        <div className="mt-8 space-y-3">
          {FEATURES.map(({ icon: Icon, tone, title, desc }) => (
            <div key={title} className="flex gap-3 rounded-2xl bg-white p-4">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${tone}`}>
                <Icon size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900">{title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-gray-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-2">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full rounded-xl bg-rose-400 py-3 text-sm font-semibold text-white"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="w-full rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-600"
          >
            Sign up
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">Ready to log your first entry?</p>
      </div>
    </div>
  )
}

export default NoLogin
