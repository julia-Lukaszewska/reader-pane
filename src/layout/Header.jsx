//-----------------------------------------------------------------------------
//------ Header: Top navigation bar component  
//-----------------------------------------------------------------------------

import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import styled from 'styled-components'
import Btn from '../components/Btn'
import { useNavigate, useLocation } from 'react-router-dom'
import Switch from '../components/Switch'
import { SlHome, SlMenu } from 'react-icons/sl'

//-----------------------------------------------------------------------------
//------ Header styles  
//-----------------------------------------------------------------------------

const HeaderStyled = styled.header`
  background:
    linear-gradient(
      37deg,
      #2f6eb23a 20%,
      #6fafe642 45%,
      #9bd4ff1c 70%,
      #417cbf2f 100%
    ),
    linear-gradient(
      125deg,
      rgba(64, 172, 255, 0.549) 0%,
      rgba(30, 32, 106, 0.47) 50%,
      rgba(61, 105, 171, 0.08) 100%
    ),
    repeating-linear-gradient(
      70deg,
      rgba(255, 255, 255, 0.04) 0px,
      rgba(8, 75, 88, 0.578) 2px,
      rgba(0, 0, 0, 0.03) 2px,
      rgba(222, 222, 222, 0.03) 4px
    ),
    repeating-linear-gradient(
      -45deg,
      rgba(255, 255, 255, 0.02) 0px,
      rgba(127, 196, 198, 0.441) 20%,
      rgba(0, 0, 0, 0.02) 1px,
      rgba(0, 0, 0, 0.02) 2px
    );

  grid-row: 1;
  grid-column: 1/3;
  height: 10vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 3rem;
  border-bottom: 0.2rem solid rgba(150, 232, 255, 0.315);
  z-index: 1;
`

//-----------------------------------------------------------------------------
//------ Title styles  
//-----------------------------------------------------------------------------

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  flex-grow: 1;
  text-align: center;
  margin-left: -4rem;
  font-family: 'Poppins', sans-serif;
  color: white;
  text-shadow: var(--color-);
  transition: color 0.3s ease;
`

//-----------------------------------------------------------------------------
//------ Button group styles  
//-----------------------------------------------------------------------------

const BtnGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`

//-----------------------------------------------------------------------------
//------ Header component definition  
//-----------------------------------------------------------------------------

const Header = ({ onToggleSidebar }) => {
  const { dispatch } = useContext(AppContext)
  const navigate = useNavigate()
  const location = useLocation()
  const isHomeView = location.pathname === '/'

  const goHome = () => navigate('/')
  const toggleTheme = () => dispatch({ type: 'TOGGLE_THEME' })

  return (
    <HeaderStyled>
      <BtnGroup>
        {!isHomeView && (
          <Btn
            $variant="circle_icon_btn"
            onClick={onToggleSidebar}
            ariaLabel="Open menu"
          >
            <SlMenu />
          </Btn>
        )}
        {!isHomeView && (
          <Btn
            $variant="circle_icon_btn"
            onClick={goHome}
            ariaLabel="Go to home"
          >
            <SlHome />
          </Btn>
        )}
      </BtnGroup>

      <Title>Pane</Title>

      <BtnGroup>
        <Switch variant="theme" onClick={toggleTheme} />
      </BtnGroup>
    </HeaderStyled>
  )
}

//-----------------------------------------------------------------------------
//------ Export Header component  
//-----------------------------------------------------------------------------

export default Header
