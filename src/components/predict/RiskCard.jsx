const TONE_CLASSES = {
  high: { bar: 'bg-rose-400', level: 'text-rose-500' },
  low: { bar: 'bg-sky-400', level: 'text-sky-500' },
}

function RiskCard({ icon: Icon, label, level, percent, tone }) {
  const { bar, level: levelColor } = TONE_CLASSES[tone]

  return (
    <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-4">
      <div className="flex items-center gap-1.5 text-xs text-gray-400">
        <Icon size={14} />
        {label}
      </div>
      <p className={`mt-2 text-lg font-bold ${levelColor}`}>
        {level} <span className="text-sm font-medium text-gray-400">{percent}%</span>
      </p>
      <div className="mt-2 h-1.5 rounded-full bg-gray-100">
        <div className={`h-1.5 rounded-full ${bar}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

export default RiskCard
