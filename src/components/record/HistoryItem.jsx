import { Calendar as CalendarIcon, ChevronRight } from 'lucide-react'

function HistoryItem({ range, detail }) {
  return (
    <li className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 text-rose-500">
          <CalendarIcon size={18} />
        </span>
        <div>
          <p className="text-sm font-medium text-gray-900">{range}</p>
          <p className="text-xs text-gray-400">{detail}</p>
        </div>
      </div>
      <ChevronRight size={16} className="text-gray-300" />
    </li>
  )
}

export default HistoryItem
