import { Routes, Route } from 'react-router'
import Home from './views/home/Home.jsx'
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
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/onboard" element={<Onboard />} />
      <Route path="/record" element={<Record />} />
      <Route path="/diary" element={<Diary />} />
      <Route path="/predict" element={<Predict />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/history" element={<History />} />
      <Route path="/setting" element={<Setting />} />
    </Routes>
  )
}

export default App
