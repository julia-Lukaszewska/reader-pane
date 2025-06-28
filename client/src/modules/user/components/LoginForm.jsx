/**
 * @file LoginForm.jsx
 * @description Styled login form using RTK Query and Redux auth slice.
 */

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '@/store/api/authApi/authApi'
import { setCredentials } from '@/store/slices/authSlice'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.4em;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 0.75em;
`

const Input = styled.input`
  padding: 0.6em 1em;
  border-radius: 0.6em;
  font-size: 1em;
  font-weight: 500;
  border: 1px solid var(--color-dark-600);
  background: var(--glass-bg);
  filter: brightness(1.35) ;
  color: var(--color-light-0);
  outline: none;
  margin-top: 0.4em;
`

const SubmitButton = styled.button`
  padding: 0.8em 1.2em;
  background: var(--gradient-blue);
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 0.8em;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    filter: brightness(1.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const ErrorText = styled.p`
  color: #ff6b6b;
  font-size: 0.9em;
  margin-top: 0.5em;
`

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------

export default function LoginForm({ onSuccess }) {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { isLoading, error }] = useLoginMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await login({ email, password }).unwrap()
      dispatch(setCredentials({ access: result.access }))
      setEmail('')
      setPassword('')
      onSuccess?.() 
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Email
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </Label>

      <Label>
        Password
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </Label>

      <SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Log In'}
      </SubmitButton>

           {error && (
        <ErrorText>
          {error?.data?.message || error?.data?.error || 'Login failed. Check your credentials.'}
        </ErrorText>
      )}
    </Form>
  )
}
