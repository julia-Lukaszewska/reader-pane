import styled from 'styled-components'

export function CheckboxInput({ name, label, checked, onChange }) {
  const handleChange = (e) => {
    onChange({ target: { name, value: e.target.checked } })
  }

  return (
    <Label>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      {label}
    </Label>
  )
}

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-size: var(--modal-xxl);
  color: var(--color-light-0);
`
