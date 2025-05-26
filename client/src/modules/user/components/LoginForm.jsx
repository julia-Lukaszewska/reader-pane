/**
 * @file LoginForm.jsx
 * @description
 * React form component for user login.
 * Uses RTK Query login mutation and updates access token on success.
 */

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from '@/store/slices/authSlice'
import { useLoginMutation } from '@/store/api/authApi'

//----------------------------------------------------------------------------- 
// Component: LoginForm
//-----------------------------------------------------------------------------  

export default function LoginForm() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { isLoading, error }] = useLoginMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await login({ email, password }).unwrap()
      dispatch(setCredentials({ access: result.access }))
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Log In'}
      </button>

      {error && <p style={{ color: 'red' }}>Login failed. Check credentials.</p>}
    </form>
  )
}
