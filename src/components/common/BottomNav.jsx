import { Link, useLocation } from 'react-router'
import { NotebookPen, Sparkles, Clock, User } from 'lucide-react'

const TABS = [
  { label: 'Log', to: '/record', icon: NotebookPen, match: (p) => p === '/record' || p === '/diary' },
  { label: 'Guide', to: '/predict', icon: Sparkles, match: (p) => p === '/predict' },
  { label: 'History', to: '/history', icon: Clock, match: (p) => p === '/history' },
  { label: 'Profile', to: '/setting', icon: User, match: (p) => p === '/setting' },
]

function BottomNav() {
  const { pathname } = useLocation()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-gray-100 bg-white">
      <ul className="mx-auto flex max-w-md justify-between px-2 py-2">
        {TABS.map(({ label, to, icon: Icon, match }) => {
          const active = match(pathname)
          return (
            <li key={label} className="flex-1">
              <Link
                to={to}
                className={`flex flex-col items-center gap-1 py-1 text-[11px] ${
                  active ? 'text-rose-500' : 'text-gray-400'
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.4 : 1.8} />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default BottomNav
