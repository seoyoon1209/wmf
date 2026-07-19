import { Routes, Route } from 'react-router'
import { useAuth } from './context/AuthContext.jsx'
import RequireAuth from './components/common/RequireAuth.jsx'
import NoLogin from './views/nologin/NoLogin.jsx'
import YesLogin from './views/yeslogin/YesLogin.jsx'
import Login from './views/auth/Login.jsx'
import Signup from './views/auth/Signup.jsx'
import Onboard from './views/onboard/Onboard.jsx'
import Record from './views/record/Record.jsx'
import Diary from './views/diary/Diary.jsx'
import Predict from './views/predict/Predict.jsx'
import Feedback from './views/feedback/Feedback.jsx'
import History from './views/history/History.jsx'
import Setting from './views/setting/Setting.jsx'

function App() {
  const { isLoggedIn } = useAuth()

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <YesLogin /> : <NoLogin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/onboard"
        element={
          <RequireAuth>
            <Onboard />
          </RequireAuth>
        }
      />
      <Route
        path="/record"
        element={
          <RequireAuth>
            <Record />
          </RequireAuth>
        }
      />
      <Route
        path="/diary"
        element={
          <RequireAuth>
            <Diary />
          </RequireAuth>
        }
      />
      <Route
        path="/predict"
        element={
          <RequireAuth>
            <Predict />
          </RequireAuth>
        }
      />
      <Route
        path="/feedback"
        element={
          <RequireAuth>
            <Feedback />
          </RequireAuth>
        }
      />
      <Route
        path="/history"
        element={
          <RequireAuth>
            <History />
          </RequireAuth>
        }
      />
      <Route
        path="/setting"
        element={
          <RequireAuth>
            <Setting />
          </RequireAuth>
        }
      />
    </Routes>
  )
}

export default App
