/**
 * @file AuthModal.jsx
 * @description Modal for login/register with top tab switcher and close icon.
 */

import React, { useState } from 'react'
import styled from 'styled-components'
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
  color: var(--color-light-0);
  padding: 2.5rem 2rem 2rem;
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
  color: var(--color-light-500);
  font-size: 1.4rem;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: white;
  }
`

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  font-weight: bold;
`

const Tab = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  color: ${({ $active }) => ($active ? 'white' : 'var(--color-light-600)')};
  border-bottom: ${({ $active }) =>
    $active ? '2px solid white' : '2px solid transparent'};
  cursor: pointer;
  padding: 0.4rem 0;
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
const AuthModal = ({ onClose }) => {
  const [mode, setMode] = useState('login')

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <FiX />
        </CloseButton>

        <Tabs>
          <Tab $active={mode === 'login'} onClick={() => setMode('login')}>
            Log In
          </Tab>
          <Tab $active={mode === 'register'} onClick={() => setMode('register')}>
            Register
          </Tab>
        </Tabs>

        {mode === 'login' ? <LoginForm /> : <RegisterForm />}
      </ModalBox>
    </Overlay>
  )
}

export default AuthModal
