// 비로그인 시 기본 화면 - 기능 소개
import { useNavigate } from 'react-router'
import { NotebookPen, Sparkles, Lock } from 'lucide-react'

const FEATURES = [
  {
    icon: NotebookPen,
    tone: 'bg-rose-50 text-rose-500',
    title: '매일 1분 기록',
    desc: '짧은 체크인만으로 주기와 증상을 한눈에 정리해요.',
  },
  {
    icon: Sparkles,
    tone: 'bg-violet-50 text-violet-500',
    title: '미리 알고 대비해요',
    desc: '다가오는 통증 위험을 미리 예측해서 준비할 시간을 드려요.',
  },
  {
    icon: Lock,
    tone: 'bg-emerald-50 text-emerald-500',
    title: '나에게 맞춰지는 예측',
    desc: '기록이 쌓일수록 나만을 위한 정확도로 다듬어져요.',
  },
]

function NoLogin() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white px-6 pb-10 pt-16">
      <div className="mx-auto max-w-md">
        <h1 className="text-3xl font-bold leading-snug text-gray-900">
          매일 조금 더
          <br />
          나를 이해하는 시간,
          <br />
          <span className="text-rose-500">WH</span>
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-gray-400">
          기록이 쌓일수록 예측은 더 정확해져요.
          <br />
          오늘 컨디션부터 가볍게 남겨보세요.
        </p>

        <div className="mt-8 space-y-3">
          {FEATURES.map(({ icon: Icon, tone, title, desc }) => (
            <div key={title} className="flex gap-3 rounded-2xl bg-gray-50 p-4">
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
            className="w-full rounded-xl bg-rose-400 py-3 text-sm font-semibold text-white shadow-sm"
          >
            로그인
          </button>
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="w-full rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-600"
          >
            회원가입
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">이제, 나를 위한 첫 기록을 남겨볼까요?</p>
      </div>
    </div>
  )
}

export default NoLogin
