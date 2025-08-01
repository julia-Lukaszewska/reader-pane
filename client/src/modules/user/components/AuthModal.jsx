/**
 * @file AuthModal.jsx
 * @description Modal for login/register with top tab switcher and close icon.
 */

import React, { useState, useEffect  } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setAuthModalMode } from '@/store/slices/mainUiSlice'
import { FiX } from 'react-icons/fi'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalBox = styled.div`
  position: relative;
  background: var(--gradient-main);
  backdrop-filter: blur(12px) saturate(120%);
  color: var(--text-color-01);
  padding: 2.5em 2em 1.2em;
  border-radius: 1.2rem;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 0 24px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-color-04);
  font-size: 1.4rem;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: var(--text-color-01)
  }
`

const Tabs = styled.div`
  display: flex;

  justify-content: center;
  gap: 1em;
  font-weight: bold;
`

const Tab = styled.button`
  background: none;
  border: none;
  font-size: 0.9em;
  color: ${({ $active }) => ($active ? 'white' : 'var(--color-light-600)')};
  border-bottom: ${({ $active }) =>
    $active ? '2px solid white' : '2px solid transparent'};
  cursor: pointer;
  padding: 0.4em 0;
  transition: all 0.2s ease;

  &:hover {
    color: white;
    filter: brightness(1.2);
  }
`

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------

/**
 * Renders auth modal with tab-like switcher and close button
 * @param {{ onClose: () => void }} props
 */
const AuthModal = ({ onClose, mode = 'login', message }) => {
  const [currentMode, setMode] = useState(mode)
  useEffect(() => {
    setMode(mode)
  }, [mode])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <Overlay role="dialog" aria-modal="true" aria-label="Authentication Modal" onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <FiX />
        </CloseButton>
               {message && (
            <p style={{ textAlign: 'center', marginBottom: '0.6rem' }}>{message}</p>
          )}

          <Tabs role="tablist">
               <Tab role="tab" aria-selected={currentMode === 'login'} $active={currentMode === 'login'} onClick={() => setMode('login')}>
              Log In
            </Tab>
            <Tab role="tab" aria-selected={currentMode === 'register'} $active={currentMode === 'register'} onClick={() => setMode('register')}>
              Register
            </Tab>
          </Tabs>


       {currentMode === 'login' ? (
          <LoginForm
            onSuccess={() => {
              dispatch(setAuthModalMode(null)) // close modal
              navigate('/library') // go to library
            }}
          />
        ) : (
          <RegisterForm onSuccess={() => setMode('login')} />
        )}
      </ModalBox>
    </Overlay>
  )
}

export default AuthModal
