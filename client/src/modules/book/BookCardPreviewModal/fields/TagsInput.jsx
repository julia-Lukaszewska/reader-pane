/**
 * @file TagsInput.jsx
 * @description Input for managing a dynamic list of tags.
 * Allows adding tags on Enter and removing by clicking "×".
 */

import styled from 'styled-components'
import { useState } from 'react'

//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------

export function TagsInput({ name, value = [], onChange }) {
  const [input, setInput] = useState('')

  // Update external value via onChange
  const updateTags = (tags) => {
    onChange({ target: { name, value: tags } })
  }

  // Handle keyboard input
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
      {value.map((tag) => (
        <Tag key={tag}>
          {tag}
          <Remove onClick={() => updateTags(value.filter((t) => t !== tag))}>
            ×
          </Remove>
        </Tag>
      ))}
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="+"
      />
    </Wrapper>
  )
}

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

// Wrapper for the tag list + input
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3em;
  border: 1px solid var(--glass-shadow-hover);
  border-radius: 0.4em;
  padding: 0.3em;
`

// Individual tag element
const Tag = styled.span`
  background: var(--color-blue-500);
  color: var(--text-color-01);
  padding: 0.2em 0.6em;
  border-radius: 1em;
  display: flex;
  align-items: center;
`

// "×" remove button
const Remove = styled.button`
  margin-left: 0.4em;
  background: none;
  border: none;
  color: var(--text-color-01);
  cursor: pointer;
`

// Input field for new tag
const Input = styled.input`
  flex: 1;
  min-width: 6em;
  border: none;
  background: transparent;
  color: var(--text-color-01);

  &:focus {
    outline: none;
  }
`
