/**
 * @file RegisterForm.jsx
 * @description Styled register form using RTK Query. Switches to login tab after success.
 */

import { useState } from 'react'
import { useRegisterMutation } from '@/store/api/authApi/authApi'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Styled components (shared with LoginForm)
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
  border: 1px solid var(--color-dark-600);
  background: var(--glass-bg);
  filter: brightness(1.35);
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
  margin-top: -0.5em;
`

//-----------------------------------------------------------------------------
// Component: RegisterForm
//-----------------------------------------------------------------------------

/**
 * Renders a styled registration form.
 * On success, switches modal tab to Log In without auto-login.
 *
 * @param {{ onSuccess: () => void }} props
 * @returns {JSX.Element}
 */
export default function RegisterForm({ onSuccess }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [register, { isLoading, error }] = useRegisterMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register({ name, email, password }).unwrap()
      setName('')
      setEmail('')
      setPassword('')
      onSuccess?.() // Switch to login tab
    } catch (err) {
      console.error('Register failed:', err)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </Label>

      <Label>
        Email
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </Label>

      <Label>
        Password
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </Label>

      <SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </SubmitButton>

      {error && (
        <ErrorText>
          {error?.data?.message || error?.data?.error || 'Registration failed. Please try again.'}
        </ErrorText>
      )}

    </Form>
  )
}
