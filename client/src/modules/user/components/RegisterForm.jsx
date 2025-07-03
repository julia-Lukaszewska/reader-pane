/**
 * @file RegisterForm.jsx
 * @description Styled register form using RTK Query. Switches to login tab after success.
 */

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRegisterMutation } from '@/store/api/authApi/authApi'
import styled from 'styled-components'
import { setAuthModalMode, setAuthModalMessage } from '@/store/slices/mainUiSlice'
//-----------------------------------------------------------------------------
// Styled components (shared with LoginForm)
//-----------------------------------------------------------------------------

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.7em;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 0.75em;
`

const Input = styled.input`
     width: 100%;
    height: 200%;
    font-size: 1.3em;
    padding:  0.8em 0.9em  ;
   
 
    margin: 0.3em 0 ;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    background-blend-mode: overlay;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0.3rem 1rem rgba(0, 64, 128, 0.3);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 0.5rem 1.5rem rgba(0, 80, 160, 0.4);
      background: var(--bg-icon-hover);
    }

    &:active {
      transform: scale(0.95);
      box-shadow: 0 0 0.5rem rgba(0, 80, 160, 0.3);
    }
  `

const SubmitButton = styled.button`
  padding: 0.8em 1.2em;
  background: var(--gradient-blue);
  color: var(--text-color-01);
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

const PasswordHint = styled.p`
  font-size: 0.95em;
  color: var(--text-color-03);
  margin: 0.8em;
  font-weight: 100;
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
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register({ name, email, password }).unwrap()
      setName('')
      setEmail('')
      setPassword('')
           dispatch(setAuthModalMessage('Registration successful. Please log in'))
      dispatch(setAuthModalMode('login'))
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
        <PasswordHint>
          Password must be at least 8 characters and include uppercase, lowercase, number and special character
        </PasswordHint>
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
