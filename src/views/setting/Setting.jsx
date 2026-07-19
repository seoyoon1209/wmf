// 프로필/사용자 정보 수정 + 모드 전환/개인정보 동의/비진단 고지 (SFR-014~016)
import { useNavigate } from 'react-router'
import { LogOut } from 'lucide-react'
import Layout from '../../components/common/Layout.jsx'
import ProfileForm from '../../components/setting/ProfileForm.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

function Setting() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="px-5 pt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">프로필</h1>
          <button
            type="button"
            onClick={() => {
              logout()
              navigate('/')
            }}
            className="flex items-center gap-1 text-xs text-gray-400"
          >
            <LogOut size={14} />
            로그아웃
          </button>
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-lg font-bold text-rose-500">
            {(user?.name ?? '?').slice(0, 1)}
          </span>
          <div>
            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.username}</p>
          </div>
        </div>

        <div className="mb-6 mt-5">
          <ProfileForm />
        </div>
      </div>
    </Layout>
  )
}

export default Setting
