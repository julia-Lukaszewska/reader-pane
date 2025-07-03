import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { useSelector } from 'react-redux'
import { selectTheme } from '@/store/selectors/uiSelectors'
import baseVariables from './themes/baseVariables'
import resetBaseStyles from './resetBaseStyles'



const Variables = createGlobalStyle`
  :root {
     ${({ $mode }) => baseVariables($mode)}
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
