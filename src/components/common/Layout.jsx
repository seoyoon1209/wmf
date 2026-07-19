import BottomNav from './BottomNav.jsx'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-md pb-24">{children}</div>
      <BottomNav />
    </div>
  )
}

export default Layout
