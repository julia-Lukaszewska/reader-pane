//-----------------------------------------------------------------------------
//------BookField component view and edit book fields 
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

const Row = styled.div`
  margin-bottom: 0.75rem;
`
const Label = styled.label`
  display: block;
  font-weight: bold;
`
const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
`

const BookField = ({ field, value, config, editing, onChange }) => {
  const label = config.label || field

  
  const handleChange = (e) => {
    if (onChange) onChange({ target: { name: field, value: e.target.value } })
  }

  if (!editing || !config.editable) {
    return (
      <Row>
        <Label>{label}:</Label>
        <p>{value || '—'}</p>
      </Row>
    )
  }

  return (
    <Row>
      <Label htmlFor={field}>{label}:</Label>
      <Input
        id={field}
        name={field}
        value={value ?? config.default ?? ''}
        onChange={handleChange}
      />
    </Row>
  )
}

export default BookField
