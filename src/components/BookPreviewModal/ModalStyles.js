//-----------------------------------------------------------------------------
//------ ModalStyles: Styled components for BookPreviewModal 
//-----------------------------------------------------------------------------

import styled, { keyframes } from 'styled-components'
import { IoCloseOutline } from 'react-icons/io5'

//-----------------------------------------------------------------------------
//------ Animations 
//-----------------------------------------------------------------------------

const fadeInScale = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`

//-----------------------------------------------------------------------------
//------ Layout components 
//-----------------------------------------------------------------------------

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export const ModalBox = styled.div`
  position: relative;
  background: var(--gradient-main);
  backdrop-filter: blur(6px);
  border-radius: var(--border-radius);
  box-shadow: var(--glass-shadow);
  width: 600px;
  max-width: 90vw;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--text-primary);
  animation: ${fadeInScale} 0.25s ease;
`

export const CloseIcon = styled(IoCloseOutline)`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  font-size: 1.4rem;
  color: var(--text-secondary);
  cursor: pointer;
  &:hover {
    color: var(--color-accent);
  }
`

//-----------------------------------------------------------------------------
//------ Header components (Cover, Title, Subtitle) 
//-----------------------------------------------------------------------------

export const Cover = styled.img`
  width: 100%;
  border-radius: var(--border-radius-sm);
  object-fit: cover;
`

export const Title = styled.h3`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;
`

export const Subtitle = styled.p`
  margin: 0;
  font-size: 1rem;
  text-align: center;
  color: var(--text-secondary);
`

//-----------------------------------------------------------------------------
//------ Info list and item 
//-----------------------------------------------------------------------------

export const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem 1rem;
`

export const InfoItem = styled.li`
  font-size: 0.9rem;
  color: var(--text-primary);
  & span {
    font-weight: 600;
  }
`

//-----------------------------------------------------------------------------
//------ Form fields (Field, Label, Input, TextArea) 
//-----------------------------------------------------------------------------

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const Label = styled.label`
  font-size: 0.85rem;
  color: var(--text-secondary);
`

export const Input = styled.input`
  padding: 0.5rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--glass-shadow-hover);
  font-size: 1rem;
  background: var(--glass-bg);
  color: var(--text-primary);
  &:focus {
    outline: 1px solid var(--color-accent);
  }
`

export const TextArea = styled.textarea`
  padding: 0.5rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--glass-shadow-hover);
  font-size: 1rem;
  resize: vertical;
  background: var(--glass-bg);
  color: var(--text-primary);
  &:focus {
    outline: 1px solid var(--color-accent);
  }
`

//-----------------------------------------------------------------------------
//------ Actions container (buttons wrapper) 
//-----------------------------------------------------------------------------

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`
