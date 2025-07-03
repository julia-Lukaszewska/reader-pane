// src/views/library/SettingsView.jsx

/**
 * @file SettingsView.jsx
 * @description Placeholder for the Settings view while under construction.
 *              Displays a message indicating the page is being built and more
 *              content is coming soon.
 */

import React from 'react'
import styled from 'styled-components'

// -----------------------------------------------------------------------------
// Styled Components for SettingsView Placeholder (white text + larger sizes)
// -----------------------------------------------------------------------------

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background: var(--gradient-blue-clear);
  text-align: center;
`

const Title = styled.h2`
  color: var(--text-color-01);
  font-size: 4rem;
  margin-bottom: 1.5rem;
`

const Subtitle = styled.p`
  color: var(--text-color-01);
  font-size: 2.5rem;
  margin-bottom: 1rem;
`

const Note = styled.p`
  color: var(--text-color-01);
  font-size: 2rem;
  opacity: 0.9;
`

// -----------------------------------------------------------------------------
// Component: SettingsView (Placeholder)
// -----------------------------------------------------------------------------

/**
 * Renders a placeholder message for the Settings view indicating that
 * the page is under construction and more content will be added soon.
 *
 * @component
 * @returns {JSX.Element}
 */
const SettingsView = () => (
  <SettingsContainer>
    <Title>Settings</Title>
    <Subtitle>Page Under Construction</Subtitle>
    <Note>More content coming soon.</Note>
  </SettingsContainer>
)

export default SettingsView
