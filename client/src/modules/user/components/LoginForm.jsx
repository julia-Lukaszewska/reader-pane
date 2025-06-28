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
  gap: 0.4em;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 0.85em;
`

const Input = styled.input`
    width: 100%;
    height: 100%;
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
