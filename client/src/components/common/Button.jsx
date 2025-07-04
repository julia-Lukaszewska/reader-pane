/**
 * @file Button.jsx
 * @description Reusable styled button component with multiple visual variants.
 * Used throughout the app to ensure consistent design and interaction patterns.
 */

import styled, { css } from 'styled-components'

// -----------------------------------------------------------------------------
// Button variants
// -----------------------------------------------------------------------------

const $variants = {
  //-----------------------------------------------------------------------------
  // Sidebar button
  //-----------------------------------------------------------------------------
  sidebar_btn: css`
    width: 130%;
    background: var(--sidebar-button-gradient);
    font-size: var(--text-01);
    color: var(--text-color-02);
    backdrop-filter: var(--blur-md);
    border: var(--border-03);
    padding: var(--padding-01);
    box-shadow: var(--shadow-02);
    border-radius: var(--border-radius-lg);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-md);
   
    transition: var(--transition-medium);

    &:hover {
      box-shadow:var(--shadow-02-hover);
      background: var(--sidebar-button-gradient-hoover);
    }

    &:active {
      transform: var(--scale-active-01);
      box-shadow: none;
    }
  `,

  //-----------------------------------------------------------------------------
  // Circle icon button
  //-----------------------------------------------------------------------------
  circle_icon_btn: css`
    
  
    padding: var(--space-lg);
    border-radius: var(--border-radius-full);
    background: var(--bg-icon-default);
    font-size: var(--text-01);
    display: flex;
    color: var(--text-color-01);
    align-items: center;
    justify-content: center;
    backdrop-filter: var(--blur-md);
    -webkit-backdrop-filter: var(--blur-md);
    background-blend-mode: overlay;
    border: var(--border-02);
    box-shadow:var(--shadow-01);
    transition: var(--transition-medium);

    &:hover {
      transform: scale(var(--scale-hover-01));
      box-shadow: var(--shadow-01-hover);
      background: var(--shadow-icon-hover);
    }

    &:active {
      transform: scale(var(--scale-active-01));
       box-shadow: var(--shadow-01-hover);
    }
  `,



  //-----------------------------------------------------------------------------
  // Header button
  //-----------------------------------------------------------------------------
  header_btn: css`
    
    padding: var(--space-md) var(--space-lg);
    color: var(--text-color-01);
    font-size: var(--text-01);
    font-weight: 300;
    border-radius: var(--border-radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    background: var(--bg-icon-default);
     backdrop-filter: var(--blur-md);
    -webkit-backdrop-filter: var(--blur-md);
    background-blend-mode: overlay;
    border: var(--border-02);
     box-shadow:var(--shadow-01);
    transition: var(--transition-medium);

   &:hover {
      transform: scale(var(--scale-hover-01));
      box-shadow: var(--shadow-01-hover);
      background: var(--shadow-icon-hover);
    }

    &:active {
      transform: scale(var(--scale-active-01));
       box-shadow: var(--shadow-01-hover);
    }
  `,


}

// -----------------------------------------------------------------------------
// Styled component
// -----------------------------------------------------------------------------

const StyledButton = styled.button`
  ${({ $variant }) => $variants[$variant] || ''}
`

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

/**
 * Reusable button component with support for visual variants.
 *
 * @param {Object} props
 * @param {*} props.children - Button content (text, icon, etc.)
 * @param {Function} props.onClick - Click event handler
 * @param {string} [props.$variant] - Variant name for styling
 * @param {boolean} [props.disabled] - Whether the button is disabled
 * @param {string} [props.type='button'] - HTML button type
 * @param {string} [props.ariaLabel] - Accessibility label
 */
const Button = ({
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

export default Button
export { $variants }
