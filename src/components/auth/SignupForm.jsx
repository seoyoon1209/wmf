import { useState } from 'react'
import { useNavigate } from 'react-router'
import api from '../../api/axios.js'
import { useAuth } from '../../context/AuthContext.jsx'

function SignupForm() {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { data } = await api.post('/auth/signup', { username, password, name })
      login(data)
      navigate('/onboard')
    } catch (err) {
      setError(err.response?.data?.detail ?? 'Sign up failed.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="block">
        <span className="text-xs text-gray-400">Name</span>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
          className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-rose-300"
        />
      </label>
      <label className="block">
        <span className="text-xs text-gray-400">Username</span>
        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username11"
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
        Sign up
      </button>
    </form>
  )
}

export default SignupForm
