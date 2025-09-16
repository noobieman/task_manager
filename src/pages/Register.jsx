import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../api'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/api/auth/register', form)
      const { token, user } = res.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      navigate('/dashboard')
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Registration failed'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-vh-100 bg-light">
      <header className="container py-4 d-flex justify-content-between align-items-center">
        <div className="fs-5 fw-semibold text-dark">TASK MANAGER</div>
        <nav className="d-flex gap-2">
          <Link to="/login" className="btn btn-outline-purple">LOGIN</Link>
          <Link to="/register" className="btn btn-purple">SIGN UP</Link>
        </nav>
      </header>

      <div className="d-flex align-items-center justify-content-center p-3">
      <div className="w-100" style={{maxWidth: 420}}>
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h1 className="h4 fw-semibold mb-3">Register</h1>
            {error && (
              <div className="alert alert-danger py-2" role="alert">{error}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input name="name" value={form.name} onChange={handleChange} type="text" className="form-control" placeholder="Your name" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input name="email" value={form.email} onChange={handleChange} type="email" className="form-control" placeholder="you@example.com" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input 
                  name="password" 
                  value={form.password} 
                  onChange={handleChange} 
                  type="password" 
                  className="form-control" 
                  placeholder="At least 8 chars, include number & special" 
                  required 
                  minLength={8}
                  pattern="(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}"
                  title="Minimum 8 characters with at least one number and one special character"
                />
              </div>
              <button type="submit" className="btn btn-purple w-100" disabled={loading}>
                {loading ? 'Creating...' : 'Create account'}
              </button>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}


