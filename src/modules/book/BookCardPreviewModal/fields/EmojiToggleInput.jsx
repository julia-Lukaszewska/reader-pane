import styled from 'styled-components'

export function EmojiToggleInput({ name, value, onChange, emoji, label }) {
  return (
    <Wrapper onClick={() => onChange({ target: { name, value: !value } })}>
      <span>{value ? emoji.on : emoji.off}</span>
      {label && <span>{label}</span>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  cursor: pointer;
`
