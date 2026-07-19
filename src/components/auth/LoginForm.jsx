import { useState } from 'react'
import { useNavigate } from 'react-router'
import api from '../../api/axios.js'
import { useAuth } from '../../context/AuthContext.jsx'

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { data } = await api.post('/auth/login', { username, password })
      login(data)
      navigate('/record')
    } catch (err) {
      setError(err.response?.data?.detail ?? 'Login failed.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="block">
        <span className="text-xs text-gray-400">Username</span>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username1"
          className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-rose-300"
        />
      </label>
      <label className="block">
        <span className="text-xs text-gray-400">Password</span>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-rose-300"
        />
      </label>
      {error && <p className="text-xs text-rose-500">{error}</p>}
      <button type="submit" className="mt-2 w-full rounded-xl bg-rose-400 py-3 text-sm font-semibold text-white">
        Log in
      </button>
    </form>
  )
}

export default LoginForm
