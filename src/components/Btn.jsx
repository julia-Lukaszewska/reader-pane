// -----------------------------------------------------------------------------
//------ Btn: Styled button component with variants  
// -----------------------------------------------------------------------------

import styled, { css } from 'styled-components' // Import styled-components and css helper  

// -----------------------------------------------------------------------------
//------ Button variants  
// -----------------------------------------------------------------------------

const $variants = {
  // Sidebar button  
  sidebar_btn: css`
    width: 14rem;  
    background: var(--gradient-main-v3, #a1f1ff82);
    color: white;  
    backdrop-filter: blur(6px);
    border: 2px solid rgba(194, 249, 255, 0.996);
    box-shadow: 0 0.4rem 1rem rgba(2, 12, 59, 0.513);  
    border-radius: 10px;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    font-weight: 400;
    transition: transform all 0.3s ease;

    &:hover {
      box-shadow: 0 0.4rem 1rem rgba(17, 46, 132, 0.513);
      background: var(--gradient-main);  
    }

    &:active {
      transform: scale(0.98);  
      box-shadow: none;
    }
  `,

  // Circle icon button  
  circle_icon_btn: css`
    width: 4.8rem;  
    height: 4.8rem;  
    padding: 0;  
    border-radius: 50%;  
    background: var(--bg-icon-default);  
    font-size: 2rem;  
    display: flex;
    color: white;
    align-items: center;  
    justify-content: center;  
    backdrop-filter: blur(6px);  
    -webkit-backdrop-filter: blur(6px);  
    background-blend-mode: overlay;
    border: 1px solid rgba(255, 255, 255, 0.2);  
    box-shadow: 0 0.2rem 1rem rgba(0, 64, 128, 0.3);  
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 0.4rem 1.2rem rgba(0, 80, 160, 0.45);
      background: var(--shadow-icon-hover);  
    }

    &:active {
      transform: scale(0.95);
      box-shadow: 0 0 0.5rem rgba(0, 80, 160, 0.3);
    }
  `,

  // Theme switch button  
  theme_switch_btn: css`
    width: 8rem;  
    height: 4rem;  
    padding: 0;
    border-radius: 999px;  
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    background: var(
      --bg-icon-default
    );  
    backdrop-filter: blur(6px);  
    -webkit-backdrop-filter: blur(6px);  
    background-blend-mode: overlay;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0.3rem 1rem rgba(0, 64, 128, 0.3);  
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 0.5rem 1.5rem rgba(0, 80, 160, 0.4);  
      background: var(--bg-icon-hover);
    }

    &:active {
      transform: scale(0.95);  
      box-shadow: 0 0 0.5rem rgba(0, 80, 160, 0.3);
    }
  `,

  // Close icon button  
  close_icon_btn: css`
    position: absolute;
    top: 0.6rem;
    right: 0.6rem;
    background: none;
    border: none;
    padding: 0;
    font-size: 1.6rem;
    color: white;
    cursor: pointer;
    z-index: 2;
    text-shadow: -1px 1px 3px #2a2a80;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      transform: scale(1.15);
    }

    &:active {
      transform: scale(0.95);
    }
  `,

  // Menu button  
  menu_btn: css`
    font-size: 1.5rem;
    padding: 1.2rem 2.4rem;
    border-radius: 2% 50%;
    min-width: 18rem;
    max-width: 18rem;
    background: var(--gradient-metal-violet-mystic);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    color: var(--color-dark-900);

    &:hover {
      transform: scale(1.05);
      background: var(--gradient-metal-violet-midnight);
    }

    &:active {
      transform: scale(0.97);
    }
  `,

  // Menu tile button  
  menu_tile_btn: css`
    padding: 1.2rem;
    font-size: clamp(1rem, 2.2vh, 1.6rem);  
    font-weight: 600;
    text-align: center;
    letter-spacing: 1px;
    text-transform: uppercase;
    background: var(--gradient-main-v4);
    color: white;
    border-radius: 0.6rem;
    border: 1px solid var(--see-akcent);
    backdrop-filter: blur(30px);
    box-shadow: 0 0.2rem 1rem rgba(0, 64, 128, 0.3);
    white-space: normal;
    word-break: break-word;

    &:hover {
      box-shadow: var(--shadow-icon-hover);
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
    cursor: not-allowed;  
    background-color: var(--color-light-200);  
    color: var(--color-blue-300);  
  }
`

// -----------------------------------------------------------------------------
//------ StyledButton  
// -----------------------------------------------------------------------------

const StyledButton = styled.button`
  ${baseStyles}  
  ${({ $variant }) =>
    $variants[$variant] || ''}  
`

// -----------------------------------------------------------------------------
//------ Btn Component  
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
