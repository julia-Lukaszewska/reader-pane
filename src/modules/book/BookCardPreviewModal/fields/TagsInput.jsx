import styled from 'styled-components'
import { useState } from 'react'

export function TagsInput({ name, value = [], onChange }) {
  const [input, setInput] = useState('')

  const updateTags = (tags) => onChange({ target: { name, value: tags } })

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault()
      updateTags([...value, input.trim()])
      setInput('')
    }
    if (e.key === 'Backspace' && !input && value.length) {
      updateTags(value.slice(0, -1))
    }
  }

  return (
    <Wrapper>
      {value.map(tag => (
        <Tag key={tag}>{tag} <Remove onClick={() => updateTags(value.filter(t => t !== tag))}>×</Remove></Tag>
      ))}
      <Input value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="+" />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3em;
  border: 1px solid var(--glass-shadow-hover);
  border-radius: 0.4em;
  padding: 0.3em;
`

const Tag = styled.span`
  background: var(--color-blue-500);
  color: white;
  padding: 0.2em 0.6em;
  border-radius: 1em;
  display: flex;
  align-items: center;
 
`

const Remove = styled.button`
  margin-left: 0.4em;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
`

const Input = styled.input`
  flex: 1;
  min-width: 6em;
  border: none;
  background: transparent;
  color: white;

  &:focus {
    outline: none;
  }
`
