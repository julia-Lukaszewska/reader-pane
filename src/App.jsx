import React from 'react'
import styled from 'styled-components'
import GlobalStyles from './style/GlobalStyles'

const StyledApp = styled.div`
  display: flex;
  min-height: 100vh;
`

const App = () => {
  return (
    <>
      <GlobalStyles />
      <StyledApp />
    </>
  )
}

export default App
