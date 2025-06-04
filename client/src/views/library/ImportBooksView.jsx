

/**
 * @file ImportBooksView.jsx
 * @description Placeholder for the Import Books view while under construction.
 *              Displays a message indicating the import interface is being built 
 *              and more content will be added soon.
 */

import React from 'react'
import styled from 'styled-components'

// -----------------------------------------------------------------------------
// Styled Components for ImportBooksView Placeholder (white text + larger sizes)
// -----------------------------------------------------------------------------

const Container = styled.div`
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
  color: #ffffff;
  font-size: 4rem;
  margin-bottom: 1.5rem;
`

const Subtitle = styled.p`
  color: #ffffff;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`

const Note = styled.p`
  color: #ffffff;
  font-size: 2rem;
  opacity: 0.9;
`

// -----------------------------------------------------------------------------
// Component: ImportBooksView (Placeholder)
// -----------------------------------------------------------------------------

/**
 * Renders a placeholder for the Import Books view indicating that
 * the interface is under construction and more content will be added soon.
 *
 * @component
 * @returns {JSX.Element}
 */
const ImportBooksView = () => (
  <Container>
    <Title>Import Books</Title>
    <Subtitle>Page Under Construction</Subtitle>
    <Note>More content coming soon.</Note>
  </Container>
)

export default ImportBooksView
