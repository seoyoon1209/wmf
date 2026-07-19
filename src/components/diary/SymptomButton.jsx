function SymptomButton({ icon: Icon, label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border py-4 text-xs font-medium ${
        active ? 'border-rose-300 bg-rose-50 text-rose-500' : 'border-gray-200 bg-white text-gray-500'
      }`}
    >
      <Icon size={20} />
      {label}
    </button>
  )
}

export default SymptomButton
