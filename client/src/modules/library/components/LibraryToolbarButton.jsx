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
  gap: var(--toolbar-button-gap);
  padding: var(--toolbar-button-padding);
  font-size: var(--toolbar-button-font-size);
  font-weight: var(--toolbar-button-font-weight);
  color: var(--toolbar-button-text);
  background: var(--toolbar-button-bg);
  border: var(--toolbar-button-border-width) solid var(--toolbar-button-border);
  border-radius: var(--toolbar-button-border-radius);
  backdrop-filter: var(--toolbar-button-blur);
  white-space: nowrap;
  transition: background 0.2s ease, border-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background: var(--toolbar-button-bg-hover);
  }

  &:focus {
    outline: none;
    border-color: var(--toolbar-button-focus-border);
    box-shadow: var(--toolbar-button-focus-shadow);
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

  ${({ $danger }) =>
    $danger &&
    css`
      background: var(--toolbar-button-danger);
      color: var(--toolbar-button-danger-text);
      border: none;

      &:hover {
        background: var(--toolbar-button-danger-hover);
      }
    `}

  ${({ $active }) =>
    $active &&
    css`
      background: var(--toolbar-button-accent);
      color: var(--toolbar-button-accent-text);
      border: var(--toolbar-button-border-width) solid var(--toolbar-button-accent);
    `}
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
  padding-right: var(--toolbar-select-padding-right);
  background-position: right 0.75em center;
  background-repeat: no-repeat;
  background-size: 1em;
  
  option {
    color: var(--color-dark-900);
    background: var(--color-light-100);
  }
  ${({ $active }) =>
    $active &&
    css`
      background: var(--toolbar-button-accent);
      color: var(--toolbar-button-accent-text);
      border: var(--toolbar-button-border-width) solid var(--toolbar-button-accent);
    `}
`

export const LibraryToolbarInput = styled.input`
  ${sharedStyles};
  width: 12em;
`
