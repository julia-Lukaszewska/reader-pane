/**
 * @file RegisterForm.jsx
 * @description Styled register form using RTK Query and Redux auth slice.
 */

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRegisterMutation } from '@/store/api/authApi'
import { setCredentials } from '@/store/slices/authSlice'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Styled components (shared with LoginForm)
//-----------------------------------------------------------------------------

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 0.95rem;
`

const Input = styled.input`
  padding: 0.6rem 1rem;
  border-radius: 0.6rem;
  border: 1px solid var(--color-dark-600);
  background: var(--glass-bg);
  color: var(--color-light-0);
  outline: none;
  margin-top: 0.4rem;
`

const SubmitButton = styled.button`
  padding: 0.8rem 1.2rem;
  background: var(--gradient-blue);
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 0.8rem;
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
  font-size: 0.9rem;
  margin-top: -0.5rem;
`

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------

export default function RegisterForm() {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [register, { isLoading, error }] = useRegisterMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await register({ name, email, password }).unwrap()
      dispatch(setCredentials({ access: result.access }))
      setName('')
      setEmail('')
      setPassword('')
    } catch (err) {
      console.error('Register failed:', err)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Label>

      <Label>
        Email
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Label>

      <Label>
        Password
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Label>

      <SubmitButton type="submit" disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </SubmitButton>

      {error && <ErrorText>Registration failed. Please try again.</ErrorText>}
    </Form>
  )
}
