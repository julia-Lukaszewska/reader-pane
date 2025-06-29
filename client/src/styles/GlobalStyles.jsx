import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { useSelector } from 'react-redux'
import { selectTheme } from '@/store/selectors/uiSelectors'

import resetBaseStyles from './resetBaseStyles'
import lightVars from './themes/lightVariables'
import darkVars from './themes/darkVariables'

/* zmienne motywu – wstrzykujemy do :root */
const Variables = createGlobalStyle`
  :root {
    ${({ $mode }) => ($mode === 'dark' ? darkVars : lightVars)}
  }
`


const Base = createGlobalStyle`
  ${resetBaseStyles}
`

export default function GlobalStyles () {
  const mode = useSelector(selectTheme)
  return (
    <>
     
      <Variables $mode={mode} key={mode} />
      <Base />
    </>
  )
}
