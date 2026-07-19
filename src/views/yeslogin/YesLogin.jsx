// 로그인 시 메인 화면
import { useNavigate } from 'react-router'
import { NotebookPen, Sparkles, Clock } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import Layout from '../../components/common/Layout.jsx'

const QUICK_LINKS = [
  { to: '/record', icon: NotebookPen, label: '월경 기록', desc: '오늘의 상태를 기록해요' },
  { to: '/predict', icon: Sparkles, label: '예측 및 분석', desc: '다가오는 주기를 확인해요' },
  { to: '/history', icon: Clock, label: '이력 조회', desc: '지난 기록을 살펴봐요' },
]

function YesLogin() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="px-5 pt-6">
        <h1 className="text-2xl font-bold text-gray-900">안녕하세요, {user?.name ?? '회원'}님</h1>
        <p className="mt-1 text-sm text-gray-400">오늘도 건강한 하루 보내세요.</p>

        <div className="mt-6 space-y-3">
          {QUICK_LINKS.map(({ to, icon: Icon, label, desc }) => (
            <button
              key={to}
              type="button"
              onClick={() => navigate(to)}
              className="flex w-full items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-sm"
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
