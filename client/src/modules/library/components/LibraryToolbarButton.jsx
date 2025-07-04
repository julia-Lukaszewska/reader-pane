/**
 * @file LibraryToolbarButton.js
 * @description
 * Styled components used for toolbar interactions in the library view.
 * Provides consistent styling for:
 * - Buttons with optional `active` or `danger` states.
 * - Select dropdown styled to match toolbar buttons.
 */

import styled, { css } from 'styled-components'

// -----------------------------------------------------------------------------
// Shared Styles: Base styles applied to both button and select
// -----------------------------------------------------------------------------

const sharedStyles = css`
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--text-01);
  padding: var(--padding-05);
  font-weight: var(--weight-01);
  color: var(--text-color-01);
  background: var(--button-bg-02);
  margin:var(--margin-01);
  border: var(--border-02);
  border-radius: var(--border-radius-lg);
  backdrop-filter: var(--blur-xs);
  white-space: nowrap;
  transition: background 0.2s ease, border-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background: var(--button-bg-02-hover);
  }

  &:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: var(--shadow-02);
  }
`

// -----------------------------------------------------------------------------
// Component: LibraryToolbarButton
// -----------------------------------------------------------------------------

/**
 * Styled button for toolbar usage with optional `danger` and `active` states.
 */
export const LibraryToolbarButton = styled.button`
  ${sharedStyles};

 

  ${({ $active }) =>
    $active &&
    css`
      background: var(--toolbar-button-accent);
      color: var(--text-color-01);
      border: var(--border-03);
    `}
`

// -----------------------------------------------------------------------------
// Component: LibraryIconButton
// -----------------------------------------------------------------------------
export const LibraryIconButton = styled(LibraryToolbarButton)`
  padding: var(--space-xs);
  margin: 0;
  background: transparent;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg { font-size: 1.35em; }

  &:hover        { background: var(--button-bg-02-hover); }
  &[disabled]    { opacity: 0.4; pointer-events: none;   }
  `
// -----------------------------------------------------------------------------
// Component: LibraryToolbarSelect
// -----------------------------------------------------------------------------

/**
 * Styled select dropdown for toolbar, styled similarly to buttons.
 */
export const LibraryToolbarSelect = styled.select`
  ${sharedStyles};
  appearance: none;
  padding-right: var(--space-sm);
  background-position: right 0.75em center;
  background-repeat: no-repeat;
  
  
  option {
    color: var(--text-color-02);
    background: var(--button-bg-02);
  }
  ${({ $active }) =>
    $active &&
    css`
      background: var(--button-bg-02);
      color: var(--text-color-02);
      border: var(--border-01);
    `}
`

export const LibraryToolbarInput = styled.input`
  ${sharedStyles};
  
`
