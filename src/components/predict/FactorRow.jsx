function FactorRow({ label, value }) {
  const positive = value > 0
  const width = Math.min(Math.abs(value) * 200, 100)

  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <span className="text-sm text-gray-600">{label}</span>
      <div className="flex flex-1 items-center gap-2">
        <div className="h-1.5 flex-1 rounded-full bg-gray-100">
          <div
            className={`h-1.5 rounded-full ${positive ? 'bg-rose-400' : 'bg-gray-400'}`}
            style={{ width: `${width}%` }}
          />
        </div>
        <span className={`w-12 text-right text-xs font-semibold ${positive ? 'text-rose-500' : 'text-gray-400'}`}>
          {positive ? '+' : ''}
          {value.toFixed(2)}
        </span>
      </div>
    </div>
  )
}

export default FactorRow
