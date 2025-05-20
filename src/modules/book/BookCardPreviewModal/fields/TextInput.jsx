import styled from 'styled-components'
import { useEffect, useRef } from 'react'

export function Input({ name, value, onChange, ...rest }) {
  return (
    <StyledInput
      name={name}
      value={value}
      onChange={onChange}
      autoComplete="off"
      {...rest}
    />
  )
}

export function Textarea({ name, value, onChange }) {
  const ref = useRef()
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto'
      ref.current.style.height = `${ref.current.scrollHeight}px`
    }
  }, [value])
  return (
    <StyledTextarea ref={ref} name={name} value={value} onChange={onChange} rows={3} />
  )
}

const StyledInput = styled.input`
  
  padding: 0.45em 0.7em;
  border-radius: .5em;
  background: rgba(255,255,255,0.14);
  color: #f5f8ff;
  border: 1.5px solid var(--color-blue-500);
  box-shadow: 0 1px 8px 0 rgba(80,140,230,0.08);
  transition: box-shadow .16s, border-color .16s, background .15s;

  &::placeholder {
    color: var(--color-blue-200);
    opacity: .8;
  }
  &:focus {
    box-shadow: 0 0 0 2px var(--see-02), 0 2px 12px 0 rgba(60,170,255,0.09);
    border-color: var(--color-blue-400);
    background: rgba(68,110,240,0.11);
    outline: none;
  }
`
const StyledTextarea = styled.textarea`
  
  padding: 0.45em 0.7em;
  
  border-radius: 1.1em;
  background: rgba(255,255,255,0.10);
  color: #ffffff;
  width:100%;
  border: 1.5px solid var(--color-blue-500);
  transition: box-shadow .15s, border-color .15s, background .14s;
  resize: vertical;

  &::placeholder {
    color: var(--color-blue-200);
    opacity: .8;
  }
  &:focus {
    box-shadow: 0 0 0 2px var(--see-02), 0 2px 10px 0 rgba(60,170,255,0.12);
    border-color: var(--color-blue-400);
    background: rgba(38,66,140,0.15);
    outline: none;
  }
`
