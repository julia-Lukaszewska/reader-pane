/**
 * @file FallbackScreen.jsx
 * @description Simple screen displayed when there is no bookId.
 */
import React from 'react'
import styled from 'styled-components'

//-----------------------------------------------------
//------ Styled Components
//-----------------------------------------------------
const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 1.2rem;
  color: var(--text-secondary);
`

//-----------------------------------------------------
//------ FallbackScreen Component
//-----------------------------------------------------
/**
 * @component FallbackScreen
 * @description Displays a placeholder when no document is selected.
 * @returns {JSX.Element}
 */
export default function FallbackScreen() {
  return <Center>No document selected for reading</Center>
}
