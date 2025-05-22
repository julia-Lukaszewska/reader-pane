/**
 * @file BookField.jsx
 * @description Labeled container for form field display in book metadata forms.
 * Can be used in editable and read-only modes.
 */

import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Component: BookField
//-----------------------------------------------------------------------------

/**
 * @component BookField
 * @param {string} label - Field label displayed above the content
 * @param {React.ReactNode} children - Field value or input
 * @param {boolean} $editable - Whether the field is editable (changes background)
 * @param {string} className - Optional className for styled extensions
 * @returns {JSX.Element}
 */
export function BookField({ label, children, $editable, className }) {
  return (
    <Wrapper className={className} $editable={$editable}>
      {label && <Label>{label}</Label>}
      <Content>{children}</Content>
    </Wrapper>
  )
}

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------

//--- Field wrapper
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4em;
  background: ${({ $editable }) =>
    $editable ? 'rgba(53, 80, 170, 0.07)' : 'transparent'};
  border-radius: 0.7em;
  padding: 0.1em 0.8em;
  transition: background 0.17s;
`

//--- Label text
const Label = styled.div`
  font-size: var(--modal-md);
  color: var(--color-blue-200);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-weight: 600;
`

//--- Field content
const Content = styled.div`
  width: 100%;
  color: #ffffff;
  font-weight: 500;
`
