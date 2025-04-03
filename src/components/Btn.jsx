import styled, { css } from 'styled-components'

const $variants = {
  // -----------------------------------------------------------------------------
  //------ Sidebar Btn   
  // -----------------------------------------------------------------------------
  sidebar_btn: css`
    font-size: 1.2rem;  
    padding: 1.6rem 2rem;  
    border-radius: 1rem;  
    width: 14rem;  
    background: var(--gradient-metal-blue-light);  
    color: white;  
    border: none;  
    text-align: center;  
    letter-spacing: 0.5px;  
    transition:                                   
      background 0.3s ease,
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      background: var(
        --gradient-metal-blue-light-header
      );  
      box-shadow: 0 0.4rem 1rem rgba(4, 35, 48, 0.25);  
    }

    &:active {
      transform: scale(0.98);  
      box-shadow: none;  
    }
  `,
}

// -----------------------------------------------------------------------------
//------ Base styles   
// -----------------------------------------------------------------------------
const baseStyles = css`
  padding: 1rem 2rem;  
  font-size: 1.4rem;  
  font-weight: 600;  
  text-transform: uppercase;  
  border: none;  
  border-radius: 1rem;  
  cursor: pointer;  
  transition: all 0.3s;  

  background: var(--gradient-metal-midnight-glow);  
  color: var(--color-brand-50);  
  text-align: center;  
  letter-spacing: 0.5px;  
  backdrop-filter: blur(5px);  
  box-shadow: none;  
  text-shadow: -1px 1px 3px #2a2a80;  

  &:hover {
    box-shadow: none;  
    transform: none;  
  }

  &:active {
    transform: scale(0.97);  
  }

  &:disabled {
    background-color: var(
      --color-grey-200
    );  
    color: var(--color-grey-500);  
    cursor: not-allowed;  
  }
`

// -----------------------------------------------------------------------------
//------- StyledButton component   
// -----------------------------------------------------------------------------
const StyledButton = styled.button`
  ${baseStyles}
  ${({ $variant }) =>
    $variants[$variant] || ''}  
`
// -----------------------------------------------------------------------------
//------- Btn component   
// -----------------------------------------------------------------------------
const Btn = ({
  children,
  onClick,
  $variant = '',  
  disabled,
  type = 'button',  
  ariaLabel,  
}) => {
  return (
    // Button element   
    <StyledButton
      type={type}
      onClick={onClick}
      $variant={$variant}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </StyledButton>
  )
}

 
export default Btn
