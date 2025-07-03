/**
 * @file CheckboxInput.jsx
 * @description Reusable styled checkbox input component with label.
 */

import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component: CheckboxInput
//-----------------------------------------------------------------------------

/**
 * @component CheckboxInput
 * @param {string} name - Input field name
 * @param {string} label - Label displayed next to the checkbox
 * @param {boolean} checked - Whether the checkbox is checked
 * @param {function} onChange - Change handler (returns { target: { name, value } })
 * @returns {JSX.Element}
 */
export function CheckboxInput({ name, label, checked, onChange }) {
  const handleChange = (e) => {
    onChange({ target: { name, value: e.target.checked } })
  }

  return (
    <StyledLabel>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      {label}
    </StyledLabel>
  )
}

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

//--- Label wrapper
const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-size: var(--modal-xxl);
 color: var(--text-color-01);
`
