// -----------------------------------------------------------------------------
//------ Btn: Styled button component with variants  
// -----------------------------------------------------------------------------

import styled, { css } from 'styled-components' // Import styled-components and css helper  

// -----------------------------------------------------------------------------
//------ Button variants   
// -----------------------------------------------------------------------------

const $variants = {
  // ---------------------------------------------------------------------------
  //------ Sidebar Btn   
  // ---------------------------------------------------------------------------
  sidebar_btn: css`
    width: 14rem;  
    background-color: var(--color-mint-200);  
    color: var(--color-aqua-200);  
    text-shadow: 0 1px 2px rgba(18, 33, 148, 0.151);  
    backdrop-filter: blur(6px);
    border: 0px solid rgba(142, 150, 158, 0.739);  
    box-shadow: 0 0.4rem 1rem rgba(2, 12, 59, 0.513);  
    border-radius: 10px;

    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      background: var(--gradient-blue-clear);  
      box-shadow: 0 0.4rem 1rem rgba(11, 12, 15, 0.513);
    }

    &:active {
      transform: scale(0.98);  
      box-shadow: none;
    }
  `,

  // ---------------------------------------------------------------------------
  //------ Circle Icon Btn   
  // ---------------------------------------------------------------------------
  circle_icon_btn: css`
    width: 4.8rem;  
    height: 4.8rem;  
    padding: 0;  
    border-radius: 50%;  
    background: var(--bg-icon-default);  
    font-size: 2rem;  
    display: flex;  
    align-items: center;  
    justify-content: center;  
    box-shadow: var(--shadow-icon);  

    &:hover {
      background: var(--bg-icon-hover);  
      transform: scale(1.1);  
      box-shadow: var(--shadow-icon-hover);  
    }

    &:active {
      transform: scale(0.95);  
    }
  `,

  // ---------------------------------------------------------------------------
  //------ Theme Switch Btn   
  // ---------------------------------------------------------------------------
  theme_switch_btn: css`
    width: 6rem;  
    height: 2.8rem;  
    padding: 0;  
    border-radius: 999px;  
    border: 1px solid var(--theme-switch-border);  
    background: var(--theme-switch-bg);  
    display: flex;  
    align-items: center;  
    justify-content: space-between;  
    position: relative;  
    overflow: hidden;  
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);  
    transition: all 0.3s ease;  
  `,

  // ---------------------------------------------------------------------------
  //------ Menu Tile Btn   
  // ---------------------------------------------------------------------------
  menu_tile_btn: css`
    position: absolute;  
    bottom: 2rem;  
    left: 50%;  
    transform: translateX(-50%);  
    padding: 1rem 2rem;  
    font-size: 1rem;  
    background: var(
      --gradient-blue-light
    );  
    color: var(--color-dark-900);  
    border: none;  
    border-radius: 1.5rem;  
    text-transform: uppercase;  
    letter-spacing: 1px;  
    box-shadow: var(--shadow-icon);  
    white-space: nowrap;  

    &:hover {
      background: var(
        --gradient-blue-clear
      );  
      transform: translateX(-50%) scale(1.05);  
      box-shadow: var(
        --shadow-icon-hover
      );  
    }

    &:active {
      transform: scale(0.97);  
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
  border-radius: var(--border-radius);  
  cursor: pointer;  
  transition: all 0.3s ease;  

  background: var(--glass-bg);  
  backdrop-filter: var(--glass-blur);  
  box-shadow: var(--glass-shadow);  
  color: var(--color-dark-900);  
  text-align: center;  
  letter-spacing: 0.5px;  
  text-shadow: var(--glass-text-shadow);  

  svg {
    width: 1.6rem;
    height: 1.6rem;
    stroke-width: 1.5;
    flex-shrink: 0;
    stroke: currentColor;  
    fill: currentColor;  
  }

  &:hover {
    transform: scale(1.03);  
  }

  &:active {
    transform: scale(0.97);  
  }

  &:disabled {
    background-color: var(--color-light-200);  
    color: var(--color-blue-300);  
    cursor: not-allowed;  
  }
`

// -----------------------------------------------------------------------------
//------ StyledButton   
// -----------------------------------------------------------------------------

const StyledButton = styled.button`
  ${baseStyles} // Base styles applied last  
  ${({ $variant }) =>
    $variants[$variant] ||
    ''} // Variant styles if defined  
`

// -----------------------------------------------------------------------------
//------ Btn Component   
// -----------------------------------------------------------------------------

const Btn = ({
  children, // Button content  
  onClick, // Click handler  
  $variant = '', // Style variant name  
  disabled, // Disabled state  
  type = 'button', // Button type (default: "button")  
  ariaLabel, // Accessibility label  
}) => {
  return (
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

export default Btn // Export Btn component  
