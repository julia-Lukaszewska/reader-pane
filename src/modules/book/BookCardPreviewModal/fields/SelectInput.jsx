import styled from 'styled-components'

export function SelectInput({ name, value, onChange, options = [] }) {
  return (
    <StyledSelect name={name} value={value} onChange={onChange}>
      <option value="">-- wybierz --</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </StyledSelect>
  )
}

const StyledSelect = styled.select`
 
  padding: 0.4em 1em;
  border-radius: 0.9em;
  background: rgba(255,255,255,0.14);
  color: #ffffff;
  border: 1.5px solid var(--color-blue-500);
  transition: border-color .15s, box-shadow .15s;

  &:focus {
    border-color: var(--color-blue-400);
    box-shadow: 0 0 0 2px var(--see-02);
    outline: none;
  }
`
