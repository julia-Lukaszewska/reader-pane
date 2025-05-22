/**
 * @file ManageModeButton.jsx
 * @description Toggle button for enabling/disabling managing mode in the library view.
 */

//-----------------------------------------------------------------------------
//------ ManageModeButton – Toggle managing mode button
//-----------------------------------------------------------------------------

import React from 'react'
import styled from 'styled-components'

//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------

const Button = styled.button`
  padding: 0.4rem 1rem;
  border-radius: 6px;
  background-color: ${({ $active }) =>
    $active ? 'var(--color-accent)' : 'transparent'};
  color: white;
  border: 1px solid white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-accent-hover);
  }
`

//-----------------------------------------------------------------------------
// Component: ManageModeButton
//-----------------------------------------------------------------------------

/**
 * Renders a button that toggles managing mode.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.isManaging - Whether managing mode is currently active
 * @param {Function} props.toggleManaging - Handler to toggle the mode
 * @returns {JSX.Element}
 */
const ManageModeButton = ({ isManaging, toggleManaging }) => {
  return (
    <Button onClick={toggleManaging} $active={isManaging}>
      {isManaging ? 'Done' : 'Manage'}
    </Button>
  )
}

export default ManageModeButton
