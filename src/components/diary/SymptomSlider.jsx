function SymptomSlider({ icon: Icon, label, value, onChange, max = 5 }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 font-medium text-gray-900">
          <Icon size={16} className="text-gray-400" />
          {label}
        </span>
        <span className="font-semibold text-rose-500">{value}</span>
      </div>
      <input
        type="range"
        min="0"
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-rose-400"
      />
      <div className="mt-1 flex justify-between text-xs text-gray-400">
        <span>None</span>
        <span>Severe</span>
      </div>
    </div>
  )
}

export default SymptomSlider
