/**
 * @file EmojiToggleInput.jsx
 * @description Simple inline toggle input rendered as emoji + label.
 */

//-----------------------------------------------------------------------------
// Styled components
//-----------------------------------------------------------------------------
import styled from 'styled-components'

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  cursor: pointer;
`

//-----------------------------------------------------------------------------
// Component: EmojiToggleInput
//-----------------------------------------------------------------------------
/**
 * @component EmojiToggleInput
 * @param {string} name - Field name
 * @param {boolean} value - Current boolean value
 * @param {function} onChange - Toggle callback
 * @param {{ on: string, off: string }} emoji - Emojis to display for on/off
 * @param {string} label - Optional label
 */
function EmojiToggleInput({ name, value, onChange, emoji, label }) {
  const handleToggle = () => {
    onChange({ target: { name, value: !value } })
  }

  return (
    <Wrapper onClick={handleToggle}>
      <span>{value ? emoji.on : emoji.off}</span>
      {label && <span>{label}</span>}
    </Wrapper>
  )
}

export default EmojiToggleInput
