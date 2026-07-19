const TONE_CLASSES = {
  rose: 'bg-rose-50 text-rose-500',
  blue: 'bg-sky-50 text-sky-500',
}

function SummaryCard({ icon: Icon, label, value, tone = 'rose' }) {
  return (
    <div className="flex flex-1 items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <span className={`flex h-9 w-9 items-center justify-center rounded-full ${TONE_CLASSES[tone]}`}>
        <Icon size={18} />
      </span>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-lg font-bold text-gray-900">{value}</p>
      </div>
    </div>
  )
}

export default SummaryCard
