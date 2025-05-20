import styled from 'styled-components'

export function BookField({ label, children, $editable, className }) {
  return (
    <Wrapper className={className} $editable={$editable}>
      {label && <Label>{label}</Label>}
      <Content>{children}</Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4em;
  background: ${({ $editable }) =>
    $editable ? "rgba(53,80,170,0.07)" : "transparent"};
  border-radius: 0.7em;
  padding: .1em .8em;
  transition: background .17s;
`

const Label = styled.div`
  font-size: var(--modal-md);
  color: var(--color-blue-200);
  text-transform: uppercase;
  letter-spacing: .03em;
  font-weight: 600;
`

const Content = styled.div`
  width: 100%;
  color: #ffffff;
  font-weight: 500;
`

