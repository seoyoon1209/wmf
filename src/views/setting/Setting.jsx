// Profile/user info edit + mode toggle/consent/non-diagnostic notice (SFR-014~016)
import { useNavigate } from 'react-router'
import { LogOut, ChevronRight, ClipboardList } from 'lucide-react'
import Layout from '../../components/common/Layout.jsx'
import ProfileForm from '../../components/setting/ProfileForm.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

function Setting() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="px-5 pt-6">
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() => {
              logout()
              navigate('/')
            }}
            className="flex items-center gap-1 text-xs text-gray-400"
          >
            <LogOut size={14} />
            Log out
          </button>
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-lg font-bold text-rose-500">
            {(user?.name ?? '?').slice(0, 1)}
          </span>
          <div>
            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.username}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/onboard')}
          className="mt-5 flex w-full items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 text-left"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-500">
            <ClipboardList size={18} />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">Edit basic info</p>
            <p className="text-xs text-gray-400">Review and update your age, first period, and cycle info</p>
          </div>
          <ChevronRight size={16} className="text-gray-300" />
        </button>

        <div className="mb-6 mt-3">
          <ProfileForm />
        </div>
      </div>
    </Layout>
  )
}

export default Setting
