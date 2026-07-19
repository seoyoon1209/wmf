function FeedbackQuestion({ label, value, onChange }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <p className="text-sm font-medium text-gray-900">{label}</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`rounded-xl py-2 text-sm font-medium ${
            value === true ? 'bg-rose-400 text-white' : 'border border-gray-200 text-gray-500'
          }`}
        >
          있었어요
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`rounded-xl py-2 text-sm font-medium ${
            value === false ? 'bg-rose-400 text-white' : 'border border-gray-200 text-gray-500'
          }`}
        >
          없었어요
        </button>
      </div>
    </div>
  )
}

export default FeedbackQuestion
